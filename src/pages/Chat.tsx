/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { createMessage, getCFMess, getMessages, uploadImageCloudinary } from '~/apis/chat.api'
import { AppContext } from '~/contexts/app.context'
import { generateRandomOrderCode } from '~/utils/utils'
import sender from '~/assets/chat.jpg'

const SenderIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    className='w-6 h-6 text-blue-500'
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
  </svg>
)

const Chat = () => {
  const serverUrl = 'https://socket.ordersdropship.com'
  const [valueInput, setValueInput] = useState<string>('') // Input của người dùng
  const { profile, isAuthenticated } = useContext(AppContext)
  const [contentMessage, setContentMessage] = useState<any>([])
  const [contentMessageNew, setContentMessageNew] = useState<any>([]) // Danh sách tin nhắn
  const [selectedImage, setSelectedImage] = useState<string | null>(null) // State cho ảnh được phóng to
  const [isUploading, setIsUploading] = useState(false)
  const queryClient = useQueryClient()
  const messagesContainerRef = useRef<HTMLDivElement | null>(null)
  const socketRef = useRef<any>(null)

  const limit = 10 // Số lượng tin nhắn lấy mỗi lần
  const [skip, setSkip] = useState(0) // Bắt đầu từ tin nhắn mới nhất
  const [hasMoreMessages, setHasMoreMessages] = useState(true)
  // Tự động cuộn xuống khi có tin nhắn mới
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }
  useQuery({
    queryKey: ['getCFMess', profile?._id],
    queryFn: () => getCFMess(), // Giới hạn ban đầu
    onSuccess: (data) => {
      console.log(data.data[0].content)
      setContentMessageNew(data.data)

      // Cuộn xuống dưới khi load xong
    }
  })
  // Lấy tin nhắn ban đầu
  const { refetch } = useQuery({
    queryKey: ['message', profile?._id],
    queryFn: () => getMessages(100, 0, 'admin@admin.com'), // Giới hạn ban đầu
    onSuccess: (data) => {
      setContentMessage(data.data.getMessage.content)
      scrollToBottom() // Cuộn xuống dưới khi load xong
    }
  })

  // Thiết lập socket để nhận tin nhắn mới từ server
  useEffect(() => {
    socketRef.current = io(serverUrl)
    socketRef.current.on('receiveMessUser', (newMessage: any) => {
      refetch()
      queryClient.invalidateQueries({ queryKey: ['message', profile?._id] })
      setContentMessage((prevMessages: any) => [...prevMessages, newMessage])
      scrollToBottom()
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [queryClient, refetch, profile?._id])

  // Gửi tin nhắn
  const chatMutation = useMutation({
    mutationFn: (body: any) => createMessage(body),
    onSuccess: () => {
      queryClient.invalidateQueries(['message', profile?._id]) // Cập nhật tin nhắn
      scrollToBottom()
      socketRef.current.emit('sendMessUser')
    }
  })

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault()
    if (valueInput !== '') {
      const data = {
        message: valueInput,
        sender: profile?._id,
        receiver: 'admin@admin.com'
      }

      const newMessage = {
        _id: generateRandomOrderCode(10),
        userId: profile?._id,
        message: valueInput,
        createdAt: new Date()
      }
      setContentMessage((prevContent: any[]) => [...prevContent, newMessage])
      setValueInput('')
      chatMutation.mutate(data)
    }
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // const mutationChangeAvatar = useMutation((formData: FormData) => uploadImage(formData), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['message', profile?._id])
  //     socketRef.current.emit('sendMessUser')
  //   },
  //   onError: () => {
  //     toast.error('Up ảnh thất bại!')
  //   }
  // })
  const mutationChangeAvatarCloudinary = useMutation(
    (body: { sender: any; receiver: string; image: string }) => uploadImageCloudinary(body),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['message', profile?._id])
        socketRef.current.emit('sendMessUser')
      },
      onError: () => {
        toast.error('Up ảnh thất bại!')
      }
    }
  )

  // const handleAvatar = async (e: any) => {
  //   const file = e.target.files[0];
  //   const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  //   if (!validTypes.includes(file.type)) {
  //     toast.error('Chỉ chấp nhận file JPEG, PNG, hoặc WebP.');
  //     return;
  //   }
  //   if (file.size > 5 * 1024 * 1024) { // 5MB
  //     toast.error('Dung lượng file quá lớn, vui lòng chọn file nhỏ hơn 5MB.');
  //     return;
  //   }

  //   // Đổi tên file để đảm bảo tên ngắn gọn
  //   const renamedFile = new File([file], "mess." + file.type.split('/')[1], {
  //     type: file.type,
  //     lastModified: file.lastModified
  //   });
  //   setIsUploading(true);

  //   new Compressor(renamedFile, {
  //     quality: 0.7,
  //     maxWidth: 1920,
  //     success: async (compressedFile: any) => {
  //       const formData = new FormData();
  //       formData.append('url', compressedFile);
  //       formData.append('sender', profile?._id);
  //       formData.append('receiver', 'admin@admin.com');

  //       try {
  //         // Thử upload qua server trước
  //         await mutationChangeAvatar.mutateAsync(formData);
  //         toast.success('Upload ảnh thành công!');
  //       } catch (error) {
  //         // Nếu upload server thất bại, thử upload qua Cloudinary
  //         try {
  //           const cloudinaryFormData = new FormData();
  //           cloudinaryFormData.append('file', compressedFile);
  //           cloudinaryFormData.append('upload_preset', 'glory365');
  //           cloudinaryFormData.append('folder', 'api-glory365');

  //           const response = await fetch(
  //             `https://api.cloudinary.com/v1_1/dbsy0kyh5/image/upload`,
  //             {
  //               method: 'POST',
  //               body: cloudinaryFormData
  //             }
  //           );

  //           const data = await response.json();

  //           if (!response.ok) {
  //             throw new Error(data.message || 'Upload failed');
  //           }

  //           // Tạo message với URL ảnh từ Cloudinary

  //           //truyền dạng body
  //           const body = {
  //             sender: profile?._id,
  //             receiver: 'admin@admin.com',
  //             image: data.secure_url
  //           };

  //           await mutationChangeAvatarCloudinary.mutateAsync(body);
  //           const socket = io(serverUrl);
  //           await queryClient.invalidateQueries(['message', profile?._id]);
  //           socket.emit('sendMessImageUser');
  //           socket.emit('sendMessUser');
  //           toast.success('Upload ảnh thành công!');
  //         } catch (cloudinaryError) {
  //           toast.error('Upload ảnh thất bại!');
  //           console.error(cloudinaryError);
  //         }
  //       } finally {
  //         setIsUploading(false);
  //         e.target.value = '';
  //       }
  //     },
  //     error: () => {
  //       toast.error('Nén ảnh thất bại!');
  //       setIsUploading(false);
  //     }
  //   });
  // };

  const handleTestCloudinaryUpload = async (e: any) => {
    const file = e.target.files[0]
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      toast.error('Chỉ chấp nhận file JPEG, PNG, hoặc WebP.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Dung lượng file quá lớn, vui lòng chọn file nhỏ hơn 5MB.')
      return
    }

    setIsUploading(true)

    try {
      const cloudinaryFormData = new FormData()
      cloudinaryFormData.append('file', file)
      cloudinaryFormData.append('upload_preset', 'glory365')
      cloudinaryFormData.append('folder', 'api-glory365')

      const response = await fetch(`https://api.cloudinary.com/v1_1/dbsy0kyh5/image/upload`, {
        method: 'POST',
        body: cloudinaryFormData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed')
      }

      console.log('Upload thành công! URL:', data.secure_url)

      // Gửi URL lên server
      const body = {
        sender: profile?._id,
        receiver: 'admin@admin.com',
        image: data.secure_url
      }

      await mutationChangeAvatarCloudinary.mutateAsync(body)
      toast.success('Upload và lưu ảnh thành công!')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Upload ảnh thất bại!')
    } finally {
      setIsUploading(false)
      e.target.value = ''
    }
  }

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc) // Mở ảnh phóng to
  }

  const closeModal = () => {
    setSelectedImage(null) // Đóng ảnh phóng to
  }
  const navigate = useNavigate()
  if (!isAuthenticated) {
    navigate('/signin')
  }
  const fetchMoreMessages = async () => {
    const newSkip = skip + limit
    const response = await getMessages(limit, newSkip, 'admin@admin.com')
    if (response.data.getMessage.content.length > 0) {
      setContentMessage((prevMessages: any) => [...prevMessages, ...response.data.getMessage.content])
      setSkip(newSkip)
    } else {
      setHasMoreMessages(false)
    }
  }

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      if (messagesContainerRef.current.scrollTop === 0 && hasMoreMessages) {
        fetchMoreMessages()
      }
    }
  }

  const getImageUrl = (image: string) => {
    if (image.startsWith('https://res.cloudinary.com')) {
      return image
    }
    return `https://api.ordersdropship.com/${image}`
  }

  return (
    <div className='max-w-xl mx-auto h-screen transition rounded-2xl overflow-hidden duration-300 shadow-2xl  '>
      <div className='px-4 py-1.5 text-white fixed top-0 left-0 right-0 z-10 bg-black max-w-xl mx-auto '>
        <div className='flex justify-between items-center mb-2'>
          <div className='flex items-center gap-x-4 pt-1'>
            {/* <img src={logo} alt='logo' className='w-[80px] inline-block h-[30px] mx-auto rounded-md' /> */}
            <button
              onClick={() => navigate(-1)}
              className='p-2 rounded-lg hover:bg-white hover:text-primary transition-all duration-300'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
              </svg>
            </button>
            <div>
              <p className='inline-block translate-y-0.5 mx-2'>Hello,</p>
              <div className='inline-block translate-y-0.5 font-[700]'>{profile?.name}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        onScroll={handleScroll}
        ref={messagesContainerRef}
        className='w-auto h-screen bg-[#000000e6] p-3 overflow-y-scroll scrollbar-hidden flex flex-col-reverse pb-16 pt-20'
      >
        {contentMessage.map((item: any) => (
          <div
            key={item._id}
            className={`chat-message mb-3 flex ${item.userId === profile?._id ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className='w-6 h-6 mt-1'>
              {item.userId === profile?._id ? <SenderIcon /> : <img src={sender} alt='' />}
            </div>
            <div className={`flex flex-col space-y-2 text-xs mx-2 items-start`}>
              {item?.message !== '' ? (
                <span
                  className={`px-3 py-2 rounded-lg inline-block max-w-xs break-words flex ${item.userId === profile?._id
                    ? 'bg-blue-500 text-white justify-start'
                    : 'bg-gray-300 text-black self-start'
                    }`}
                >
                  {item.message}
                </span>
              ) : (
                <img
                  className={`px-1 py-1 rounded-lg inline-block ${item.userId === profile?._id ? 'self-end' : 'self-start'
                    }`}
                  src={item.image && item.image.length > 0 ? getImageUrl(item.image[0]) : ''}
                  alt='Message Image'
                  style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                  onClick={() =>
                    handleImageClick(item.image && item.image.length > 0 ? getImageUrl(item.image[0]) : '')
                  }
                />
              )}
            </div>
          </div>
        ))}
        {contentMessage.length < 1 &&
          contentMessageNew.map((item: any) => (
            <div
              key={item._id}
              className={`chat-message mb-3 flex ${item.userId === profile?._id ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className='w-10 h-10 mt-1'>
                {item.userId === profile?._id ? <SenderIcon /> : <img src={sender} alt='' />}
              </div>
              <div className={`flex flex-col space-y-2 text-xs mx-2 items-start`}>
                {item?.content !== '' ? (
                  <span
                    className={`px-3 py-2 rounded-lg inline-block max-w-xs break-words flex ${item.userId === profile?._id
                      ? 'bg-blue-500 text-white justify-start'
                      : 'bg-gray-300 text-black self-start'
                      }`}
                  >
                    {item.content.split('\n').map((line: any, index: any) => (
                      <React.Fragment key={index}>
                        {line} <br />
                      </React.Fragment>
                    ))}
                  </span>
                ) : (
                  <img
                    className={`px-1 py-1 rounded-lg inline-block ${item.userId === profile?._id ? 'self-end' : 'self-start'
                      }`}
                    src={item.image && item.image.length > 0 ? getImageUrl(item.image[0]) : ''}
                    alt='Message Image'
                    style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                    onClick={() =>
                      handleImageClick(item.image && item.image.length > 0 ? getImageUrl(item.image[0]) : '')
                    }
                  />
                )}
              </div>
            </div>
          ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-auto  py-1 h-[50px] bg-black shadow flex px-3 overflow-hidden fixed bottom-0 left-0 right-0 z-10 max-w-xl mx-auto'
      >
        <label
          htmlFor='dropzone-file'
          className='w-14 flex items-center justify-center cursor-pointer text-white hover:bg-gray-600 rounded-md transition-all duration-300'
        >
          <input
            id='dropzone-file'
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleTestCloudinaryUpload}
          />
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
            <path
              fillRule='evenodd'
              d='M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z'
              clipRule='evenodd'
            />
          </svg>
        </label>
        {/* <label htmlFor='test-cloudinary' className='w-14 flex items-center justify-center cursor-pointer'>
          <input 
            id='test-cloudinary' 
            type='file' 
            accept='image/*' 
            className='hidden' 
            onChange={handleTestCloudinaryUpload}
          />
          <span className="text-sm text-gray-500">Test Cloudinary</span>
        </label> */}
        <input
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className='w-full h-full p-2 text-sm overflow-auto rounded-md resize-none text-white'
          placeholder='Vui lòng nhập'
        />
        <button
          type='submit'
          disabled={valueInput.length === 0}
          className={`w-14 flex items-center justify-center  rounded-lg group  transition-all duration-300 ${valueInput.length > 0 ? 'text-primary hover:bg-primary group-hover:text-white' : ''
            }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className={`size-6 transition-all duration-300 ${valueInput.length > 0 ? 'text-primary group-hover:text-white' : 'text-gray-500 '
              }`}
          >
            <path d='M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z' />
          </svg>
        </button>
      </form>

      {/* Modal hiển thị ảnh lớn */}
      <div
        className={`fixed top-0  w-full h-full left-1/2 -translate-x-1/2 max-w-xl mx-auto bg-black bg-opacity-75 flex items-center justify-center z-50 transition-all duration-300 ${selectedImage ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        onClick={(e) => {
          e.stopPropagation()
          closeModal()
        }}
      >
        <div
          className='relative'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <button
            onClick={closeModal}
            className='absolute top-3 right-3 p-2 rounded-full text-white hover:bg-white hover:text-primary transition-all duration-300'
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
              <path
                fillRule='evenodd'
                d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <img src={selectedImage || ''} alt='Zoomed Image' className='w-full h-auto' />
        </div>
      </div>
      {isUploading && (
        <div className='fixed inset-0 max-w-xl mx-auto flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <svg
            aria-hidden='true'
            role='status'
            className='inline w-10 h-10 mr-3 text-white animate-spin'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='white'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentColor'
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default Chat
