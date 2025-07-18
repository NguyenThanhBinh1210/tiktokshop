import { useNavigate } from 'react-router-dom'
import notice from '~/assets/menu-icon3.d998f7a8.svg'
const Tnc = () => {
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
          <p className='uppercase text-white text-xl font-bold'>Mô tả quy tắc</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 px-3 pt-3 bg-white  rounded-lg text-gray-800 space-y-3">

        <ol className="list-decimal list-inside space-y-2 text-justify">
          <li>All reservation deals must be completed prior to withdrawing or resetting your account.</li>
          <li>Only one account can be registered per phone number.</li>
          <li>Please refrain from associating the same wallet address with multiple accounts for hotel reservations. If such activity is detected, the following accounts will be frozen.</li>
          <li>Kindly refrain from disclosing your account password and withdrawal password to others. Our platform shall not be held responsible for any damages incurred as a result.</li>
          <li>All reservation deals are randomly assigned by the system. Once a reservation deal has been accepted and allocated by the system, any changes, cancellations, or abandonment of the reservation are strictly prohibited.</li>
          <li>Legal action will be taken in case of inappropriate account usage.</li>
          <li>Please verify the deposit address with customer service before transferring funds.</li>
          <li>The platform will not assume any responsibility if a deposit is made to an incorrect deposit address.</li>
          <li>A balance of less than USDT 50 is insufficient to initiate a reservation deal. Members should ensure that they have a balance of at least USDT 50 before initiating a reservation deal.</li>
          <li>Once a member has initiated a reservation deal, it must be completed within one day. If completion within one day is not feasible, please promptly inform customer service.</li>
          <li>Bank withdrawals are only available for Exploirst members or above.</li>
        </ol>

        <p className="text-red-600  text-justify">
          Please note: The above rules and guidelines are designed to ensure smooth transactions and platform usage. It is important to adhere to these rules for a seamless experience. If you have any questions or require assistance, please contact our customer service team.
        </p>
      </div>
      <div className='text-center py-2 text-sm text-gray-600 border-t fixed bottom-0 left-0 right-0  bg-white'>
        © 2019 - 2025 TIKTOK-GIG Global Inc.
      </div>
    </div>
  )
}

export default Tnc