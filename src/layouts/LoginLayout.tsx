import { LayoutPropsInterface } from '~/types/base.type'
import lang from '~/assets/language.svg'
import { Link, useLocation } from 'react-router-dom'
const LoginLayout = ({ children }: LayoutPropsInterface) => {
  const location = useLocation()
  const isRegister = location.pathname === '/register'
  return (
    <div className='bg-black max-w-xl mx-auto min-h-screen flex flex-col relative'>

      {children}

      <div className='bg-[#212121bf] text-white text-center py-4 text-[13px] mt-auto'>
        © 2019 - 2025 TIKTOK-GIG Global Inc.
      </div>
      {isRegister && (
        <Link to='/login'>
          <button className='absolute top-0 left-0 w-10 h-10 flex items-center justify-center text-white'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              strokeWidth={2}
              viewBox='0 0 24 24'
              fill='currentColor'
              className='size-6'
            >
              <path
                fillRule='evenodd'
                d='M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </Link>
      )}
      {/* <button className='absolute top-0 right-0 p-2 w-max h-max flex items-center justify-center text-white'>
        <img src={lang} alt='lang' className='size-8' />
      </button> */}
      <p className='absolute top-0 right-0 p-2 w-max h-max flex items-center justify-center text-white'>
        Người bán Việt Nam <Link to='/lang' className='ml-2 text-primary flex items-center gap-2'>Đổi quốc gia <img src={lang} alt='lang' className='size-8' /></Link>
      </p>
    </div>
  )
}

export default LoginLayout
