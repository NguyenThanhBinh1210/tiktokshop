/* eslint-disable @typescript-eslint/no-explicit-any */
import notice from '~/assets/notice.5b7a1636.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { getAllNoti } from '~/apis/chat.api'
import { useState } from 'react'
const Notification = () => {
  const navigate = useNavigate()
  const [noti, setNoti] = useState<any>([])
  const { t } = useTranslation()
  useQuery({
    queryKey: ['notif'],
    queryFn: () => {
      return getAllNoti()
    },
    onSuccess: (data) => {
      setNoti(data.data)
    },
    cacheTime: 60000
  })
  return (
    <div className='max-w-xl mx-auto bg-[#000000e6] min-h-screen text-white'>
      <div className='flex items-center justify-between bg-black relative '>
        <button className=' text-white px-4 py-3.5 rounded-full ' onClick={() => navigate('/')}>
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
        <div className='flex items-center gap-2 absolute left-1/2 -translate-x-1/2 w-max h-max'>
          <img src={notice} alt='notice' className='size-6' />
          <p className='uppercase text-white text-xl font-bold'>{t('notification.system_message')}</p>
        </div>
        <button></button>
      </div>
      <div className='flex flex-col gap-2 p-2 px-4'>
        {noti.map((item: any) => (
          <div key={item._id} className='flex items-start gap-2 border-b py-3'>
            <p>
              1.
            </p>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notification