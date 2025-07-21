/* eslint-disable @typescript-eslint/no-explicit-any */
import opennow from '~/assets/opennow.c69eba2a.svg'
import tiksp from '~/assets/TIKSP.dd648419.svg'
import commission from '~/assets/commission.d610ca3c.svg'
import balance from '~/assets/balance.0d759c99.svg'
import help from '~/assets/help.67d36206.svg'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { io } from 'socket.io-client'
import { AppContext } from '~/contexts/app.context'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getNumberOrder, getWallet } from '~/apis/payment.api'
import { createRandom, getAllCountLenh, getOrderDay, updateLenh } from '~/apis/random.api'
import { convertToVietnamDateTime, formatCurrency, formatNumber, formatTime } from '~/utils/utils'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const serverUrl = 'https://socket.ordersdropship.com'
const Deal = () => {
  const [showCommission, setShowCommission] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  const [dataRamdom, setDataRandom] = useState<any>(null)
  const [sum, setSum] = useState<number>(0)
  const [numberOrder, setNumberOrder] = useState<any>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [countDay, setCountDay] = useState<any>()
  useQuery({
    queryKey: ['get-all-lenh-2'],
    queryFn: () => getOrderDay(),
    cacheTime: 1000,
    onSuccess: (data) => {
      console.log("s", data.data);
      setCountDay(data.data.numberOder)
    }
  })
  const queryClient = useQueryClient()
  const { profile } = useContext(AppContext)
  const { t } = useTranslation()
  const handleOpen = () => setOpen(!open)

  const [count, setCount] = useState<any>()

  useQuery({
    queryKey: ['get-count'],
    queryFn: () => getAllCountLenh(),
    cacheTime: 1000,
    onSuccess: (data) => {
      console.log("count", data.data);
      setCount(data.data)

    }
  })
  useQuery({
    queryKey: ['get-number-order'],
    queryFn: () => getNumberOrder(),
    cacheTime: 1000,
    onSuccess: (data) => {
      setNumberOrder(data.data.number)
    }
  })
  const [waletAmount, setWaletAmount] = useState(0)
  useQuery({
    queryKey: ['my-wallet', 'deal'],
    queryFn: () => {
      return getWallet()
    },
    onSuccess: (data) => {
      setWaletAmount(data.data.getWallet.totalAmount.toFixed(2))
    }
  })
  const mutationRandom = useMutation({
    mutationFn: () => createRandom(),
    onSuccess: async (data: any) => {
      handleOpen()
      const socket = io(serverUrl)
      socket.emit('randomByUser', profile?._id)
      queryClient.invalidateQueries({ queryKey: ['get-count'] })
      queryClient.invalidateQueries({ queryKey: ['get-all-lenh-2'] })
      setDataRandom(data.data.newOrder)
      setSum(data.data.newOrder.Sum)
    },
    onError: (data: any) => {
      if (data?.response.data.error) {
        toast.error(data?.response.data.error.message)
      } else if (data?.response.data.message) {
        toast.error(data?.response.data.message)
      } else {
        toast.error(t('deal.still_have_1_order_not_paid'))
        setTimeout(() => {
          navigate('/dealing_slip')
        }, 1000)
      }
    }
  })
  const [totalAmounts, setTotalAmount] = useState<number>(0)

  useQuery({
    queryKey: ['my-wallet', 'deal'],
    queryFn: () => getWallet(),
    cacheTime: 1000,
    onSuccess: (data) => {
      setTotalAmount(data.data.getWallet.totalAmount)
    }
  })
  const totalAmount = totalAmounts || 0
  const numberOder = numberOrder || 0
  const sumOrder = !countDay ? 0 : countDay > numberOder ? numberOder : countDay

  const handleCreateOrder = () => {
    if (profile?.isDongBang === true) {
      toast.error(t('deal.your_account_has_been_frozen'))
      return
    } else if (totalAmount <= 5.3) {
      toast.error(t('deal.you_do_not_have_enough_money_to_start_placing_an_order'))
      return
    } else if (sumOrder >= numberOder) {
      toast.error(t('deal.you_have_reached_the_order_limit_for_the_day_please_come_back_later'))
      return
    } else {
      mutationRandom.mutate()
    }
  }

  const navigate = useNavigate()
  const mutationUpdate = useMutation((body: any) => updateLenh(body))

  const handleUpdate = () => {
    mutationUpdate.mutate(
      { complete: 'done' },
      {
        onSuccess: (data: any) => {
          if (data.data.message === 'success') {
            queryClient.invalidateQueries({ queryKey: ['get-all-money'] })
            queryClient.invalidateQueries({ queryKey: ['get-count'] })
            queryClient.invalidateQueries({ queryKey: ['get-all-lenh-2'] })
            queryClient.invalidateQueries({ queryKey: ['my-wallet', profile?._id] })
            toast.success(t('deal.order_completed'))
          }
          handleOpen()
          queryClient.invalidateQueries({ queryKey: ['get-all-lenh'] })
          queryClient.invalidateQueries({ queryKey: ['get-all-money'] })
        },
        onError: (err: any) => {
          console.log(err.response.data.message)
          if (err.response.data.message === 'Bạn không đủ tiền thanh toán đơn này') {
            if (dataRamdom && dataRamdom.Sum !== undefined) {
              toast(
                <div>
                  <p className='text-center mb-2'>{t('dealing_slip.toastErrro1')}</p>
                  <p className='text-center mb-2'>{t('dealing_slip.toastErrro2')}</p>
                  <p className='text-center mb-1'>
                    {t('dealing_slip.receive')} <span className='text-[#4b5563] font-bold '>{formatCurrency(sum - totalAmount)}</span>
                  </p>
                  <br />
                  <button
                    className='bg-primary text-white px-4 py-2 rounded-md mx-auto block'
                    onClick={() => {
                      toast.dismiss()
                      navigate('/service')
                    }}
                  >
                    {t('dealing_slip.contactNow')}
                  </button>
                </div>
              ),
              {
                duration: 5000,
              }
            } else {
              toast.error(t('deal.you_do_not_have_enough_money_to_pay_for_this_order_please_contact_customer_service_to_add_money'))
              setTimeout(() => {
                navigate('/service/chat')
              }, 2000)
            }
          } else {
            setTimeout(() => {
              navigate('/dealing_slip')
            }, 1000)
            toast.error(t('deal.server_error_please_reload_the_page'))
          }
        }
      }
    )
  }

  const [timeDifference, setTimeDifference] = useState<number | null>(null)

  useEffect(() => {
    if (dataRamdom) {
      const targetTime = new Date(dataRamdom.expirationDate)
      const interval = setInterval(() => {
        const currentTime = new Date()
        const difference = targetTime.getTime() - currentTime.getTime()
        setTimeDifference(difference > 0 ? difference : 0)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [dataRamdom])
  return (
    <>
      <div className='pt-14 px-4 text-sm pb-24 text-white max-w-xl mx-auto'>
        <div className='flex items-center gap-3 py-2'>
          <img src={opennow} alt='opennow' className='size-9' />
          <span className='uppercase  font-bold text-2xl'>{t('deal.deal')}</span>
        </div>
        <div className='bg-black text-white  p-3 py-2 rounded-md mt-3 flex items-center justify-between'>
          <div>
            <p className='font-bold text-sm'>{t('deal.introduction')}</p>
            <p className='text-[8px] leading-3'>{t('deal.tiktok_shop_description')}</p>
          </div>
          <img src={tiksp} alt='tiksp' className='size-[96px] flex-shrink-0' />
        </div>
        <div className='bg-black text-white  p-3 py-2 rounded-md mt-3 flex flex-col gap-3'>
          <div className='flex justify-between items-start text-lg py-4 border-b border-white'>
            <div className='flex items-center gap-2 '>
              <img src={commission} alt='commission' className='size-10' />
              <div>
                <p className=' font-bold'>{t('deal.commission')}</p>
                <p>{formatCurrency(count?.commission)}</p>
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
                <p className=' font-bold'>{t('deal.balance')}</p>
                <p>{formatCurrency(waletAmount)}</p>
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
            <div className='bg-[#fff9] text-white text-lg rounded-full px-5 py-1'>{t('deal.balance_description')}</div>
          )}
        </div>
        <button
          onClick={handleCreateOrder}
          disabled={mutationRandom.isLoading}
          className='bg-primary disabled:opacity-50 w-full justify-center items-center text-white  p-3 py-4 rounded-full mt-3 flex  gap-2 text-xl font-bold'
        >
          {mutationRandom.isLoading ? (
            <svg
              aria-hidden='true'
              role='status'
              className='inline w-4 h-4 mr-3 text-white animate-spin'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='white'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentColor'
              />
            </svg>
          ) : (
            <>
              <span className='inline-block'>{t('deal.start_receiving_orders')}</span>
              <span className='inline-block'>{sumOrder + '/' + numberOder}</span>
            </>
          )}
        </button>
        <div className='bg-black text-white  p-3 py-2 rounded-md mt-3 flex flex-col gap-2 text-lg'>
          <p>{t('deal.order_description_1')}</p>
          <p>{t('deal.order_description_2')}</p>
          <p>{t('deal.order_description_3')}</p>
        </div>
      </div>
      <OrderModal isOpen={open} onClose={handleOpen} dataRamdom={dataRamdom} timeDifference={timeDifference} handleUpdate={handleUpdate} />
    </>
  )
}
export function OrderModal({
  isOpen,
  onClose,
  dataRamdom,
  timeDifference,
  handleUpdate
}: {
  isOpen: boolean
  onClose: () => void
  dataRamdom: any
  timeDifference: number | null
  handleUpdate: () => void
}) {
  const { t } = useTranslation()
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white rounded-lg p-6 max-w-lg w-full relative shadow-lg'>
        <button className='absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl' onClick={onClose}>
          &times;
        </button>

        <h2 className='text-lg font-semibold mb-4'>{t('deal.order_details')}</h2>

        <div className='flex items-center justify-center mb-4'>
          <img src={dataRamdom?.image} alt='Product' className='w-48' />
        </div>

        <p className='text-center font-medium mb-4 line-clamp-2'>{dataRamdom?.name}</p>

        <div className='space-y-2 text-sm text-gray-700'>
          <div className='flex justify-between'>
            <span>{t('deal.order_code')}:</span>
            <span className='font-semibold'>{dataRamdom?.code}</span>
          </div>
          <div className='flex justify-between'>
            <span>{t('deal.updated_at')}:</span>
            <span className='font-semibold'>{convertToVietnamDateTime(dataRamdom?.updatedAt)}</span>
          </div>
          <div className='flex justify-between'>
            <span>{t('deal.product_price')}:</span>
            <span className='font-semibold'>
              {dataRamdom?.money ? formatNumber(dataRamdom?.money) : formatNumber(0)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>{t('deal.quantity')}:</span>
            <span className='font-semibold'>{dataRamdom?.quantity}</span>
          </div>
          <div className='flex justify-between'>
            <span>{t('deal.total_price')}:</span>
            <span className='font-semibold'>{dataRamdom?.Sum ? formatNumber(dataRamdom?.Sum) : formatNumber(0)}</span>
          </div>
          <div className='flex justify-between'>
            <span>{t('deal.commission')}:</span>
            <span className='font-semibold'>
              {dataRamdom?.commission ? formatNumber(dataRamdom.commission) : formatNumber(0)}
            </span>
          </div>
          <div className='flex justify-between text-orange-600 font-semibold'>
            <span>{t('deal.countdown_payment')}:</span>
            <span>{timeDifference !== null ? formatTime(timeDifference) : '00:00:00'}</span>
          </div>
        </div>

        <div className='flex justify-end mt-6 gap-2'>
          <button className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600' onClick={onClose}>
            {t('deal.back')}
          </button>
          <button onClick={handleUpdate} className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600'>
            {t('deal.payment')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Deal
