import notice from '~/assets/menu-icon6.4845e69c.svg'
import { useNavigate } from 'react-router-dom'
const RechargeHistory = () => {
  const navigate = useNavigate()
  return (
    <div className='max-w-xl mx-auto'>
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
          <p className='uppercase text-white text-xl font-bold'>Giao dịch</p>
        </div>
      </div>
      <div className='p-4'>
        <div className='flex justify-between items-center py-3 border-b'>
          <p>CZ2507172236073728</p>
          <div className='flex items-center gap-8'>
            <p className='text-white bg-[#aaa] rounded-full px-2 text-xs py-0.5'>Đang chờ xử lý</p>
            <p className='text-[#003857] font-bold'>$50000.00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RechargeHistory
