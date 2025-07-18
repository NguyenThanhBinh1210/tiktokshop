import { useNavigate } from 'react-router-dom'
import notice from '~/assets/menu-icon3.d998f7a8.svg'

const FAQ = () => {
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
          <p className='uppercase text-white text-xl font-bold'>Thông báo quan trọng</p>
        </div>
      </div>
      <div className='px-3 mx-auto p-6 pt-3 bg-white  text-sm rounded-md text-gray-800 space-y-3'>
        <section>
          <h2 className='text-lg font-semibold mb-2'>I. Caution</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>
              Members are strictly forbidden to register more than one account and repeatedly use the same wallet
              address for reservation deals.
            </li>
            <li>All malicious money laundering is strictly prohibited and will be penalized legally.</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>II. Deposit</h2>
          <ul className='list-decimal list-inside space-y-1'>
            <li>Transfer to customer service to assist with deposits.</li>
            <li>Provide a screenshot of the successful transfer.</li>
            <li>Ensure accurate information during deposits.</li>
            <li>Contact customer service if any issue occurs.</li>
            <li>Double-check account details before depositing.</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>III. Withdrawal</h2>
          <ul className='list-decimal list-inside space-y-1'>
            <li>Withdrawals only after bookings are completed.</li>
            <li>Credit rating of 100 required to withdraw.</li>
            <li>Withdrawals processed between 10am-10pm.</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>IV. Funds</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>Funds held securely and claimable after bookings.</li>
            <li>System allocates bookings to avoid fund loss.</li>
            <li>Platform responsible for unexpected losses.</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>V. Account Security</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>Do not disclose passwords to others.</li>
            <li>Contact support if you forget your password.</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>VI. General Rating</h2>
          <ul className='list-decimal list-inside space-y-1'>
            <li>Normal and special deals (0-6 special deals).</li>
            <li>Member users: 0.7% - 3.5% commission.</li>
            <li>Discoverist users: 1.1% - 6.6% commission.</li>
            <li>Explorist users: 1.5% - 10.5% commission.</li>
            <li>Globalist users: 2% - 16% commission.</li>
            <li>Special deals return earnings to user account.</li>
            <li>Bookings are automatic and non-cancellable.</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>VII. Platform Agent Mode</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>Earn commission by referring users.</li>
            <li>25% commission from downline earnings.</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>VIII. Operation Hour</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>Bookings can be made between 10am - 10pm.</li>
          </ul>
        </section>

        <p className='text-center text-red-600 font-semibold mt-4'>
          (Note: For any further assistance, please contact our customer service.)
        </p>
      </div>
      <div className='text-center py-2 text-sm text-gray-600 border-t fixed bottom-0 left-0 right-0  bg-white max-w-xl mx-auto'>
        © 2019 - 2025 TIKTOK-GIG Global Inc.
      </div>
    </div>
  )
}

export default FAQ
