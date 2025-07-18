import notice from '~/assets/menu-icon2.e7b95bd5.svg'
import { useNavigate } from 'react-router-dom'
const Team = () => {
  const navigate = useNavigate()
  return (
    <div>
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
          <p className='uppercase text-white text-xl font-bold'>Chế độ đại lý</p>
        </div>
      </div>
      <div className="px-3 mx-auto p-6 pt-3 bg-white sh rounded-lg text-gray-800 space-y-6">

        <p className="leading-relaxed">
          On the platform, users have the opportunity to invite others to become agents of the platform by sharing their invitation code and becoming their downline.
          As an upline, you can earn a certain percentage of commission from your downline's earnings.
          The commission earned by the upline will be directly credited to their platform account or reflected in the team report.
          Specifically, as an upline, you can receive <span className="">25% of the first level agent's commission</span>.
        </p>

        <p className="leading-relaxed">
          It’s important to note that all agents and their downlines are eligible to receive a certain percentage of earnings and bonuses from the platform.
          The earnings, which amount to <span className="">25% of the downline commissions</span>, do not have any negative impact on the earnings and bonuses of agents and downlines who are actively building their own teams.
        </p>

        <p className="leading-relaxed">
          The platform operates on a transparent and fair system that incentivizes both uplines and downlines to work together and maximize their earnings.
          By expanding their network and nurturing their downlines' success, agents can benefit from a sustainable and mutually beneficial business model.
        </p>
      </div>
      <div className='text-center py-2 text-sm text-gray-600 border-t fixed bottom-0 left-0 right-0  bg-white'>
        © 2019 - 2025 TIKTOK-GIG Global Inc.
      </div>
    </div>
  )
}

export default Team