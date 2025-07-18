import { useNavigate } from 'react-router-dom'
import menu_icon7 from '~/assets/menu-icon7.15b1b83f.svg'
import gust_logo from '~/assets/gust_logo.png'
const Service = () => {
  const navigate = useNavigate()
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
        <p className='text-2xl font-bold uppercase'>
          Dịch vụ hỗ trợ
        </p>
        <p className='text- '>
          Liên hệ với chúng tôi nếu bạn có bất kỳ vấn đề gì
        </p>
        <img src={gust_logo} alt='gust_logo' className='w-52' />
        <p className='text-xl uppercase font-bold text-center px-3'>
          Liên hệ với chúng tôi qua hệ thống dịch vụ khách hàng
        </p>
        <p>
          Thời gian hoạt động dịch vụ: 10:00 - 23:59
        </p>
        <button className='bg-primary text-white px-4 py-3 mt-20 rounded-full font-bold w-full '>
          Liên hệ dịch vụ khách hàng
        </button>
      </div>
    </div>
  )
}

export default Service