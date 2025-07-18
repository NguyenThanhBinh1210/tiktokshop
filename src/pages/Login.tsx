import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import banner from '~/assets/downloadbg.svg'
import { languages } from '~/components/LangueChange'
const Login = () => {
  const { t, i18n } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0]
  return (
    <div
      style={{ backgroundImage: `url(${banner})` }}
      className='flex flex-col items-center justify-center  bg-black px-5 text-sm'
    >
      <div className='pt-20'>
        <p className='text-white text-3xl max-w-[400px] mx-auto font-semibold '>
          {t('login.grow_your_business_with')} <span className='text-primary'>TikTok {currentLang.label} </span>{' '}
          {t('login.now_day')}!
        </p>
        <p className='text-white text-sm max-w-[400px] mx-auto mt-2'>
          {t('login.if_you_are_retail_brand_or_business')}
        </p>
      </div>
      <div className=' py-8 rounded-lg w-full max-w-[400px] mx-auto'>
        <div className='mb-7 relative'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='text-primary size-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          >
            <path
              fillRule='evenodd'
              d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
              clipRule='evenodd'
            />
          </svg>

          <input
            type='text'
            placeholder='16888888888'
            className='pl-10 pr-4 py-3 w-full rounded-full bg-white focus:outline-none '
          />
        </div>
        <div className='mb-7 relative'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='text-primary size-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          >
            <path
              fillRule='evenodd'
              d='M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z'
              clipRule='evenodd'
            />
          </svg>

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('login.password')}
            className='pl-10 pr-10 py-3 w-full rounded-full bg-white focus:outline-none '
          />
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <div className='flex items-center mb-6'>
          <input type='checkbox' id='remember' className='mr-2' defaultChecked />
          <label htmlFor='remember' className='text-white text-sm'>
            {t('login.remember_me')}
          </label>
        </div>

        <button className='w-full bg-primary hover:bg-primary/80 text-white py-3 uppercase rounded-full text-lg font-semibold transition'>
          {t('login.login')}
        </button>

        <div className='text-center mt-4'>
          <span className='text-white text-sm'>{t('login.no_account')} </span>
          <button className='text-primary font-bold text-sm hover:underline '>
            <Link to='/register'>{t('login.register')}</Link>
          </button>
        </div>
        <div className='text-white text-xs mt-4'>

          {t('login.continue_login')}
          <br />
          <br />
          {t('login.continue_login_2')}

        </div>
      </div>
    </div>
  )
}

export default Login
