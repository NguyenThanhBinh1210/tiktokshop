import logo from '~/assets/TKBG.svg'
const Register = () => {
  return (
    <div className='flex flex-col items-center justify-center  bg-black px-5 text-sm'>
      <img src={logo} alt='logo' className='w-full' />
      <div className='bg-black py-8 rounded-lg w-full max-w-[400px] mx-auto'>
        <div className='mb-7 relative flex items-center bg-white rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-primary absolute left-3 top-1/2 transform -translate-y-1/2">
            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
          </svg>
          <div className='flex-shrink-0 pl-10'>Số điện thoại <span className='text-red-500'>*</span></div>
          <input
            type='text'
            placeholder='Số điện thoại'
            className=' pr-4 py-3 w-full   focus:outline-none rounded-full'
          />
        </div>
        <div className='mb-7 relative flex items-center bg-white rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-primary absolute left-3 top-1/2 transform -translate-y-1/2">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>

          <div className='flex-shrink-0 pl-10'>Tên đăng nhập <span className='text-red-500'>*</span></div>
          <input
            type='text'
            placeholder='Tên đăng nhập'
            className=' pr-4 py-3 w-full   focus:outline-none rounded-full  '
          />
        </div>
        <div className='mb-7 relative flex items-center bg-white rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-primary absolute left-3 top-1/2 transform -translate-y-1/2">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>

          <div className='flex-shrink-0 pl-10'>Mật khẩu đăng nhập <span className='text-red-500'>*</span></div>
          <input
            type='password'
            placeholder='Mật khẩu đăng nhập'
            className=' pr-4 py-3 w-full   focus:outline-none rounded-full'
          />
        </div>
        <div className='mb-7 relative flex items-center bg-white rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-primary absolute left-3 top-1/2 transform -translate-y-1/2">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>

          <div className='flex-shrink-0 pl-10'>Xác nhận mật khẩu <span className='text-red-500'>*</span></div>
          <input
            type='password'
            placeholder='Xác nhận mật khẩu'
            className=' pr-4 py-3 w-full   focus:outline-none rounded-full'
          />
        </div>
        <div className='mb-7 relative flex items-center bg-white rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-primary absolute left-3 top-1/2 transform -translate-y-1/2">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>

          <div className='flex-shrink-0 pl-10'>Mã giới thiệu <span className='text-red-500'>*</span></div>
          <input
            type='text'
            placeholder='Mã giới thiệu'
            className=' pr-4 py-3 w-full   focus:outline-none rounded-full'
          />
        </div>





        <button className='w-full bg-primary hover:bg-primary/80 text-white py-3 rounded-full text-lg font-semibold transition'>
          Đăng ký ngay
        </button>


      </div>
    </div>
  )
}

export default Register
