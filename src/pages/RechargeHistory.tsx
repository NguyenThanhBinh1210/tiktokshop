/* eslint-disable @typescript-eslint/no-explicit-any */
import notice from '~/assets/menu-icon6.4845e69c.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import noOrder from '~/assets/noOrder.png'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { getRechargeHistory } from '~/apis/payment.api'
import { formatNumber } from '~/utils/utils'
const RechargeHistory = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [rechargeHistory, setRechargeHistory] = useState<any>([])
  useQuery({
    queryKey: ['recharge-history'],
    queryFn: () => getRechargeHistory(),
    onSuccess: (response) => {
      setRechargeHistory(response.data.data)
    }
  })

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'Đang chờ xử lý'
      case 'done':
        return 'Đã nạp thành công'
      case 'failed':
        return 'Đã bị từ chối'
      default:
        return 'Đang chờ xử lý'
    }
  }
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-[#aaa]'
      case 'done':
        return 'bg-[#003857]'
      case 'failed':
        return 'bg-[#aaa]'
      default:
        return 'bg-[#aaa]'
    }
  }
  return (
    <div className='max-w-xl mx-auto'>
      <div className='flex items-center justify-between bg-black relative '>
        <button className=' text-white px-4 py-3.5 rounded-full ' onClick={() => navigate(-1)}>
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
          <p className='uppercase text-white text-xl font-bold'>{t('recharge.title_history')}</p>
        </div>
      </div>
      <div className='p-4'>
        {rechargeHistory
          .filter((item: any) => item.infos === 'recharge money')
          .map((item: any) => (
            <div key={item._id} className='flex justify-between items-center py-3 border-b'>
              <p>{item.codeOder}</p>
              <div className='flex items-center gap-8'>
                <p className={`text-white rounded-full px-2 text-xs py-0.5 ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </p>
                <p className='text-[#003857] font-bold'> {formatNumber(item.totalAmount)}</p>
              </div>
            </div>
          ))}
        {rechargeHistory.filter((item: any) => item.infos === 'recharge money').length === 0 && (
          <div className='w-max mx-auto mt-10'>
            <img src={noOrder} alt='noOrder' className='w-[182px]' />
            <p className='text-xl font-bold mt-4 text-center '>{t('withdrawal.no_history')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RechargeHistory
