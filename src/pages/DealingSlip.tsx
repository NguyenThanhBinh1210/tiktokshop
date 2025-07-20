/* eslint-disable @typescript-eslint/no-explicit-any */
import home_9_on from '~/assets/menu-icon9_on.svg'
import { useState } from 'react'
import noOrder from '~/assets/noOrder.png'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAllLenh, updateLenh } from '~/apis/random.api'
import { convertToVietnamDateTime, formatCurrency } from '~/utils/utils'
import { getWallet } from '~/apis/payment.api'
import toast from 'react-hot-toast'
const DealingSlip = () => {
  const [status, setStatus] = useState<string>('all')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [listLenh, setListLenh] = useState<any[]>([])
  console.log(listLenh)
  useQuery({
    queryKey: ['getDealingSlip'],
    queryFn: () => getAllLenh({ type: status }),
    onSuccess: (data) => {
      setListLenh(data.data.orders)
    },
    onError: () => {
      window.location.reload()
    },
    enabled: status === 'all' || status === 'pending' || status === 'done' || status === 'deny'
  })

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return t('dealing_slip.pending_payment')
      case 'done':
        return t('dealing_slip.completed')
      case 'deny':
        return t('dealing_slip.frozen')
      default:
        return t('dealing_slip.pending_payment')
    }
  }
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-[#aaa]'
      case 'done':
        return 'bg-[#003857]'
      case 'deny':
        return 'bg-red-500'
      default:
        return 'bg-[#aaa]'
    }
  }
  const mutationUpdate = useMutation((body: any) => updateLenh(body))
  const queryClient = useQueryClient()
  const [totalAmount, setTotalAmount] = useState<number>(0)
  useQuery({
    queryKey: ['get-all-money'],
    queryFn: () => getWallet(),
    onSuccess: (data) => {
      setTotalAmount(data.data.getWallet.totalAmount)
    }
  })
  const handleUpdate = ({ sum }: { sum: number }) => {
    mutationUpdate.mutate(
      { complete: 'done' },
      {
        onSuccess: () => {
          toast.success(`${t('dealing_slip.updateSuccess')}`)
          queryClient.invalidateQueries(['getDealingSlip'])
          queryClient.invalidateQueries(['get-all-money'])
        },
        onError: () => {
          toast.error(
            `${t('dealing_slip.notEnoughMoney')} ${formatCurrency(sum - totalAmount)}, ${t('dealing_slip.pleaseContactCustomerServiceToAddMoney')}`
          )
          setTimeout(() => {
            navigate('/service/chat')
          }, 2000)
        }
      }
    )
  }
  return (
    <div className='max-w-xl mx-auto pb-20'>
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
              onClick={() => {
                setStatus('all')
                queryClient.invalidateQueries(['getDealingSlip'])
              }
              }
            >
              {t('dealing_slip.all')}
            </button>
          </div>
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-1.5 ${status === 'pending' ? ' text-primary font-bold bg-black' : 'text-[#7f7f7f]'
                }`}
              onClick={() => {
                setStatus('pending')
                queryClient.invalidateQueries(['getDealingSlip'])
              }
              }
            >
              {t('dealing_slip.pending')}
            </button>
          </div>
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-1.5 ${status === 'done' ? ' text-primary font-bold bg-black' : 'text-[#7f7f7f]'
                }`}
              onClick={() => {
                setStatus('done')
                queryClient.invalidateQueries(['getDealingSlip'])
              }
              }
            >
              {t('dealing_slip.completed')}
            </button>
          </div>
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-1.5 ${status === 'deny' ? ' text-primary font-bold bg-black' : 'text-[#7f7f7f]'
                }`}
              onClick={() => {
                setStatus('deny')
                queryClient.invalidateQueries(['getDealingSlip'])
              }
              }
            >
              {t('dealing_slip.frozen')}
            </button>
          </div>
        </div>
      </div>
      <div className='text-primary text-end text-sm py-2 px-3 border-t font-bold mb-4'>
        {listLenh.filter((item: any) => status === 'all' || item.complete === status).length} {t('dealing_slip.profile')}
      </div>
      <div className='p-4'>
        {listLenh.filter((item: any) => status === 'all' || item.complete === status).map((item: any) => (
          <div key={item._id} className='grid grid-cols-3 py-3 border-b gap-4'>
            <img src={item.image} alt={item.name} className=' rounded-lg flex-shrink-0' />
            <div className='col-span-2'>
              <p className='text-sm font-medium'>{item.name}</p>
              <div>{convertToVietnamDateTime(item.updatedAt)}</div>
              <div className='mt-2 space-y-1 text-sm text-gray-600 w-full'>
                <p>
                  {t('dealing_slip.originalPrice')}: <span className='font-bold'>{formatCurrency(item.money)}</span>
                </p>
                <p>
                  {t('dealing_slip.quantity')}: <span className='font-bold'>{item.quantity}</span>
                </p>
                <p>
                  {t('dealing_slip.totalPrice')}: <span className='font-bold'>{formatCurrency(item.Sum)}</span>
                </p>
                <p>
                  {t('dealing_slip.commission')}: <span className='font-bold text-orange-600'>{formatCurrency(item.commission)}</span>
                </p>
                <p className='flex items-center gap-2'>
                  <div>
                    {t('dealing_slip.status')}:{' '}
                    <span className={`text-white rounded-full px-2 text-xs py-0.5 ${getStatusColor(item.complete)}`}>
                      {getStatusText(item.complete)}
                    </span>
                  </div>
                  {item.complete === 'pending' && (
                    <button
                      className='bg-green-500 hover:bg-green-600 transition-all duration-300 text-sm text-white px-4 py-1 rounded-lg ml-auto'
                      onClick={() => handleUpdate({ sum: item.Sum })}
                    >
                      {t('dealing_slip.payment')}
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
        {listLenh.filter((item: any) => status === 'all' || item.complete === status).length === 0 && (
          <div className='w-max mx-auto mt-10'>
            <img src={noOrder} alt='noOrder' className='w-[182px]' />
            <p className='text-xl font-bold mt-4 text-center '>{t('withdrawal.no_history')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DealingSlip
