import { Link, useNavigate } from 'react-router-dom'
import menu_icon7 from '~/assets/menu-icon7.15b1b83f.svg'
import gust_logo from '~/assets/gust_logo.png'
import { useTranslation } from 'react-i18next'
import { useContext, useMemo } from 'react'
import { AppContext } from '~/contexts/app.context'

const Service = () => {
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Tạo URL chat với thông tin user
  const chatUrl = useMemo(() => {
    const baseUrl = 'https://chatlink.ichatlink.net/widget/standalone.html'
    const params = new URLSearchParams({
      eid: 'd0c7adde475fc4703ba8e4437602f119',
      language: 'en'
    })

    // Thêm thông tin user nếu có profile
    if (profile) {
      // Thêm tên user
      if (profile.name) {
        params.append('name', profile.name)
      }
      
      // Thêm email user
      if (profile.email) {
        params.append('email', profile.email)
      }
      
      // // Thêm số điện thoại nếu có
      // if (profile.phone) {
      //   params.append('phone', profile.phone)
      // }
      
      // // Thêm user ID nếu có
      // if (profile.id) {
      //   params.append('user_id', profile.id)
      // }

      // // Thêm các thông tin custom khác
      // if (profile.level) {
      //   params.append('user_level', profile.level)
      // }
    }

    return `${baseUrl}?${params.toString()}`
  }, [profile])

  return (
    <div className='bg-black text-white min-h-screen max-w-xl mx-auto'>
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
          <p className='uppercase text-white text-xl font-bold'></p>
        </div>
        <button></button>
      </div>
      <div className='flex flex-col items-center justify-center gap-4 px-5'>
        <img src={menu_icon7} alt='menu_icon7' className='size-24' />
        <p className='text-2xl font-bold uppercase'>{t('service.title')}</p>
        <p className='text- '>{t('service.description')}</p>
        <img src={gust_logo} alt='gust_logo' className='w-52' />
        <p className='text-xl uppercase font-bold text-center px-3'>{t('service.description_contact')}</p>
        <p>{t('service.description_time')}</p>
        <Link
          target='_blank'
          to={chatUrl}
          className='block bg-primary text-white px-4 py-3 mt-20 rounded-full font-bold w-full '
        >
          <button className='w-full'>{t('service.description_contact_service')}</button>
        </Link>
      </div>
    </div>
  )
}

export default Service