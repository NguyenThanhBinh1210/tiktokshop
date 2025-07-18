import { useContext, useState } from 'react'
import index_icon from '~/assets/index_icon2_1.png'
import image1 from '~/assets/9.jpg'
import image2 from '~/assets/10.jpg'
import image3 from '~/assets/11.jpg'
import image4 from '~/assets/12.jpg'
import image5 from '~/assets/download.png'
import image6 from '~/assets/lazada.png'
import image7 from '~/assets/1.png'
import image8 from '~/assets/4.png'
import image9 from '~/assets/77.png'
import image10 from '~/assets/78.png'
import image11 from '~/assets/bannerhomess.jpg'
import { useTranslation } from 'react-i18next'
import { AppContext } from '~/contexts/app.context'

const Home = () => {
  const { t } = useTranslation()
  const { profile } = useContext(AppContext)
  // const [messages] = useState([
  //   'bb***258 Quỹ 52870 Rút tiền thành công',
  //   'aa***123 Quỹ 12500 Nạp tiền thành công',
  //   'cc***789 Quỹ 30000 Rút tiền thành công',
  //   'dd***456 Quỹ 7000 Nạp tiền thành công',
  //   'ee***111 Quỹ 85000 Rút tiền thành công',
  //   'ff***222 Quỹ 45000 Rút tiền thành công'
  // ])

  const [images] = useState([image1, image2, image3, image4, image5, image6, image7, image8, image9, image10])
  // const loopedMessages = [...messages, ...messages]
  return (
    <div className='pt-14 px-4 text-sm pb-24'>
      <div className='bg-black text-white font-bold p-3 py-2 rounded-md'>{t('home.welcome_customer')}: {profile?.username}</div>
      <div className='bg-black text-white  p-3 py-2 rounded-md mt-5 '>
        <p className='text-center text-lg font-bold'>TIKTOK SHOP</p>
        <p className='text-center mt-2'>
          {t('home.tiktok_shop_description')}
        </p>
      </div>
      {/* <div className='bg-black text-white p-3 py-2 rounded-md mt-5 text-center h-[250px] overflow-hidden relative'>
        <div className='animate-scroll flex flex-col space-y-4'>
          {loopedMessages.map((message, index) => (
            <p key={index} className='py-4'>
              {message}
            </p>
          ))}
        </div>
      </div> */}
      <div className='mt-5 rounded-md overflow-hidden'>
        <img src={image11} alt='banner' className='w-full h-full object-cover' />
      </div>
      <div className='bg-black text-white  p-3 py-4 rounded-md mt-5'>
        <div className='bg-white text-gray-500 text-center font-bold p-3 py-3 text-base rounded-full flex items-center justify-center gap-2'>
          <img src={index_icon} alt='index_icon' className='size-5' />
          {t('home.partner')}
        </div>
        <div className='grid grid-cols-2 gap-10 mt-6 '>
          {images.map((image, index) => (
            <div
              style={{
                boxShadow: '1px 1px 6px #ddd'
              }}
              key={index}
              className=' rounded-md rounded-full overflow-hidden'
            >
              <img src={image} alt={`image-${index}`} className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
