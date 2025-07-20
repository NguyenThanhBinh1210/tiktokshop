/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import notice from '~/assets/menu-icon6.4845e69c.svg'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { createWallet, getPayment, getWallet } from '~/apis/payment.api'
import { AppContext } from '~/contexts/app.context'
import { formatNumber, generateRandomOrderCode } from '~/utils/utils'
import toast from 'react-hot-toast'
const Recharge = () => {
  const navigate = useNavigate()
  const [amount, setAmount] = useState(0)
  const [waletAmount, setWaletAmount] = useState(0)
  useQuery({
    queryKey: ['my-wallet', 'recharge'],
    queryFn: () => {
      return getWallet()
    },
    onSuccess: (data) => {
      setWaletAmount(data.data.getWallet.totalAmount.toFixed(2))
    }
  })

  const { t } = useTranslation()
  const { profile } = useContext(AppContext)
  const amounts = [50, 100, 200, 1000, 3000, 5000, 10000, 30000, 50000]
  const [payment, setPayment] = useState<any>(null)
  useQuery({
    queryKey: ['payment', 'recharge'],
    queryFn: () => {
      return getPayment({ userId: profile?._id })
    },
    onSuccess: (data) => {
      setPayment(data.data)
    },
    cacheTime: 30000
  })
  const [code, setCode] = useState<any>()

  useEffect(() => {
    const code = generateRandomOrderCode(6)
    setCode(code)
  }, [])

  const mutationRecharge = useMutation((body: any) => {
    return createWallet(body)
  })
  const handleRecharge = () => {
    // if (Number(amount) < 200) {
    //   // toast.warn('nạp tối thiểu 200$. Vui lòng thử lại')
    //   toast.error(t('recharge.min_amount'))
    //   return
    // }
    if (payment !== null) {
      const newData = {
        bankName: payment.bankName,
        totalAmount: Number(amount),
        codeOder: code
      }
      mutationRecharge.mutate(newData, {
        onSuccess: () => {
          // toast.success(t('wallet.success_message'))
          toast.success(t('recharge.success_message'))
        },
        onError: (err: any) => {
          if (err?.response.status === 429) {
            toast.error(err?.response.data.error)
          } else {
            toast.error(t('recharge.error_message'))
          }
        }
      })
    } else {
      toast.error(t('recharge.select_payment_account'))
    }
  }
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
          <p className='uppercase text-white text-xl font-bold'>{t('recharge.title')}</p>
        </div>
      </div>
      <div className='p-3'>
        <div className='border  rounded-lg overflow-hidden'>
          <Link to={'/recharge-history'} className='bg-primary text-white block px-3 py-2 text-center '>
            {t('recharge.history')}
          </Link>
          <div
            style={{
              boxShadow: '5px 5px 10px rgba(174,174,192,.1),inset -2px -2px 4px rgba(0,0,0,.1)'
            }}
            className=' text-black  px-3 py-4'
          >
            {t('recharge.balance')}: <span className='text-[#003857] font-bold ml-1'>{formatNumber(waletAmount)}</span>
          </div>
        </div>
      </div>
      <div className=' mx-auto p-6 bg-white rounded-lg  space-y-4'>
        <div>
          <label className='text-sm font-semibold text-red-600'>{t('recharge.amount')}</label>
          <div className='flex items-center space-x-2 mt-2'>
            <span className='text-xl mr-3'>$</span>
            <input
              placeholder={t('recharge.amount')}
              type='text'
              className='text-xl '
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className='h-0.5 bg-red-400 mt-1 mb-4'></div>
        </div>

        <div className='grid grid-cols-3 gap-3'>
          {amounts.map((item) => (
            <button
              key={item}
              onClick={() => setAmount(item)}
              className={`border rounded-md py-2 font-semibold ${amount === item ? 'bg-primary text-white border-primary' : 'bg-white hover:bg-red-100'
                }`}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          type='submit'
          onClick={handleRecharge}
          disabled={!amount}
          className='disabled:bg-[#bebebe]  py-3 w-full bg-primary  text-white font-semibold  rounded-full hover:bg-primary/80 transition'
        >
          {t('recharge.confirm')}
        </button>
      </div>
    </div>
  )
}

export default Recharge
