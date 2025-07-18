import opennow from '~/assets/opennow.c69eba2a.svg'
import tiksp from '~/assets/TIKSP.dd648419.svg'
import commission from '~/assets/commission.d610ca3c.svg'
import balance from '~/assets/balance.0d759c99.svg'
import help from '~/assets/help.67d36206.svg'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
const Deal = () => {
  const [showCommission, setShowCommission] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  const { t } = useTranslation()
  return (
    <div className='pt-14 px-4 text-sm pb-24 text-white max-w-xl mx-auto'>
      <div className='flex items-center gap-3 py-2'>
        <img src={opennow} alt='opennow' className='size-9' />
        <span className='uppercase  font-bold text-2xl'>
          {t('deal.deal')}
        </span>
      </div>
      <div className="bg-black text-white  p-3 py-2 rounded-md mt-3 flex items-center justify-between">
        <div>
          <p className='font-bold text-sm'>
            {t('deal.introduction')}
          </p>
          <p className='text-[8px] leading-3'>
            {t('deal.tiktok_shop_description')}
          </p>
        </div>
        <img src={tiksp} alt='tiksp' className='size-[96px] flex-shrink-0' />
      </div>
      <div className='bg-black text-white  p-3 py-2 rounded-md mt-3 flex flex-col gap-3'>

        <div className='flex justify-between items-start text-lg py-4 border-b border-white'>
          <div className='flex items-center gap-2 '>
            <img src={commission} alt='commission' className='size-10' />
            <div>
              <p className=' font-bold'>
                {t('deal.commission')}
              </p>
              <p>
                $0
              </p>
            </div>
          </div>
          <button onClick={() => setShowCommission(!showCommission)} className='flex  gap-2 cursor-pointer'>
            <img src={help} alt='help' className='size-5' />

          </button>


        </div>
        <div className='flex justify-between items-start text-lg py-4 '>
          <div className='flex items-center gap-2 '>
            <img src={balance} alt='balance' className='size-10' />
            <div>
              <p className=' font-bold'>
                {t('deal.balance')}
              </p>
              <p>
                $0
              </p>
            </div>
          </div>
          <button onClick={() => setShowBalance(!showBalance)} className='flex  gap-2 cursor-pointer'>
            <img src={help} alt='help' className='size-5' />

          </button>


        </div>
        {showCommission && (
          <div className='bg-[#fff9] text-white text-lg rounded-full px-5 py-1  leading-6'>
            {t('deal.commission_description')}
          </div>
        )}
        {showBalance && (
          <div className='bg-[#fff9] text-white text-lg rounded-full px-5 py-1'>
            {t('deal.balance_description')}
          </div>
        )}
      </div>
      <button className='bg-primary w-full text-white  p-3 py-4 rounded-full mt-3 flex flex-col gap-2 text-xl font-bold'>
        {t('deal.start_receiving_orders')} (0/0)
      </button>
      <div className='bg-black text-white  p-3 py-2 rounded-md mt-3 flex flex-col gap-2 text-lg'>
        <p>
          {t('deal.order_description_1')}
        </p>
        <p>
          {t('deal.order_description_2')}
        </p>
        <p>
          {t('deal.order_description_3')}
        </p>
      </div>

    </div>
  )
}

export default Deal