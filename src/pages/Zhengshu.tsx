import notice from '~/assets/7b9d199f50737887.jpg'
import { useNavigate } from 'react-router-dom'
const Zhengshu = () => {
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
          {/* <img src={notice} alt='notice' className='size-6' /> */}
          <p className='uppercase text-white text-xl font-bold'></p>
        </div>
        <button></button>
      </div>
      <img src={notice} alt='notice' className='size-full mt-10' />
      <div className='text-center py-2 text-sm text-gray-600 border-t fixed bottom-0 left-0 right-0  bg-white max-w-xl mx-auto'>
        © 2019 - 2025 TIKTOK-GIG Global Inc.
      </div>
    </div>
  )
}

export default Zhengshu