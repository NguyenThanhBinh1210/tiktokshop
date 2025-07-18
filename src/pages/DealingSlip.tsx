import home_9_on from '~/assets/menu-icon9_on.svg'
import { useState } from 'react'
import noOrder from '~/assets/noOrder.png'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const DealingSlip = () => {
  const [status, setStatus] = useState<string>('all')
  const { t } = useTranslation()
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
          <img src={home_9_on} alt='' className='size-6' />
          <p className='uppercase text-white text-xl font-bold'>{t('dealing_slip.deal')}</p>
        </div>
        <button></button>
      </div>
      <div className='py-2 px-3 text-sm'>
        <div
          style={{ boxShadow: 'inset 5px 5px 4px rgba(174,174,192,.2),inset -5px -5px 4px hsla(0,0%,100%,.3)' }}
          className='grid grid-cols-4 rounded-full p-1.5 border border-[#ededed] bg-[#ebebeb]'
        >
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-1.5  ${status === 'all' ? ' text-primary font-bold bg-black' : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('all')}
            >
              {t('dealing_slip.all')}
            </button>
          </div>
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-1.5 ${status === 'pending' ? ' text-primary font-bold bg-black' : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('pending')}
            >
              {t('dealing_slip.pending')}
            </button>
          </div>
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-1.5 ${status === 'completed' ? ' text-primary font-bold bg-black' : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('completed')}
            >
              {t('dealing_slip.completed')}
            </button>
          </div>
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-1.5 ${status === 'frozen' ? ' text-primary font-bold bg-black' : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('frozen')}
            >
              {t('dealing_slip.frozen')}
            </button>
          </div>
        </div>
      </div>
      <div className='text-primary text-end text-sm py-2 px-3 border-t font-bold mb-4'>0 {t('dealing_slip.profile')}</div>
      <div className='flex flex-col items-center justify-center'>
        <img src={noOrder} alt='' className='w-[174px]' />
        <p className='text-xl font-bold mt-2 text-black '>{t('dealing_slip.no_order')}</p>
      </div>
    </div>
  )
}

export default DealingSlip
