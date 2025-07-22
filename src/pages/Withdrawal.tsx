/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { createWithdrawal, getPayment, getWallet, getWithdrawalHistory } from '~/apis/payment.api'
import notice from '~/assets/menu-icon12.68eba35f.svg'
import noOrder from '~/assets/noOrder.png'
import { AppContext } from '~/contexts/app.context'
import { formatNumber, generateRandomOrderCode } from '~/utils/utils'
const serverUrl = 'https://socket.ordersdropship.com'
const Withdrawal = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState('atm')
  const { t } = useTranslation()

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
          <p className='uppercase text-white text-xl font-bold'>{t('withdrawal.title')}</p>
        </div>
      </div>
      <div className='py-2 px-3 text-sm'>
        <div
          style={{ boxShadow: 'inset 5px 5px 4px rgba(174,174,192,.2),inset -5px -5px 4px hsla(0,0%,100%,.3)' }}
          className='grid grid-cols-2 rounded-full p-1 border border-[#ededed] bg-[#ebebeb]'
        >
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-2.5  ${status === 'atm' ? ' text-primary font-bold bg-[#fdfdfd] border-2 border-[#eee] ' : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('atm')}
            >
              {t('withdrawal.atm')}
            </button>
          </div>
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-2.5 ${status === 'history' ? ' text-primary font-bold bg-[#fdfdfd] border-2 border-[#eee] ' : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('history')}
            >
              {t('withdrawal.history')}
            </button>
          </div>
        </div>
      </div>
      <div className='p-3'>{status === 'atm' ? <WithdrawalATM /> : <WithdrawalHistory />}</div>
    </div>
  )
}

const WithdrawalHistory = () => {
  const { t } = useTranslation()
  const [withdrawalHistory, setWithdrawalHistory] = useState<any>([])
  console.log(withdrawalHistory.filter((item: any) => !item.infos))
  useQuery({
    queryKey: ['withdrawal-history'],
    queryFn: () => getWithdrawalHistory(),
    onSuccess: (response) => {
      setWithdrawalHistory(response.data.data)
    }
  })

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return t('withdrawal.pending')
      case 'done':
        return t('withdrawal.success')
      case 'failed':
        return t('withdrawal.deny')
      default:
        return t('withdrawal.pending')
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
    <div className='p-4'>
      {withdrawalHistory
        .filter((item: any) => !item.infos)
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
      {withdrawalHistory.filter((item: any) => !item.infos).length === 0 && (
        <div className='w-max mx-auto mt-10'>
          <img src={noOrder} alt='noOrder' className='w-[182px]' />
          <p className='text-xl font-bold mt-4 text-center '>{t('withdrawal.no_history')}</p>
        </div>
      )}
    </div>
  )
}

const WithdrawalATM = () => {
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank')
  const [waletAmount, setWaletAmount] = useState(0)
  useQuery({
    queryKey: ['my-wallet', 'withdrawal'],
    queryFn: () => {
      return getWallet()
    },
    onSuccess: (data) => {
      setWaletAmount(data.data.getWallet.totalAmount.toFixed(2))
    }
  })
  const { t } = useTranslation()
  // const formatCurrency = (amount: number) => {
  //   return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  // }

  return (
    <div className='mx-auto  bg-white rounded-lg  space-y-4'>
      <p className='text-sm '>{t('withdrawal.system_will_process_request_after_linking_bank')}</p>
      <div className='p-3 py-2.5 rounded-lg bg-white border text-[#a16600] font-bold leading-5'>
        <p>{t('withdrawal.account_balance')}</p>
        <p>{formatNumber(waletAmount)}</p>
      </div>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('withdrawal.withdrawal_method')}</label>
        <div className='grid grid-cols-2 gap-3'>
          <button
            type='button'
            onClick={() => setWithdrawalMethod('bank')}
            className={`    rounded-lg border py-3  text-sm transition ${withdrawalMethod === 'bank' ? 'bg-primary text-white' : 'text-black'
              }`}
          >
            {t('withdrawal.transfer_to_bank')}
          </button>
          <button
            type='button'
            onClick={() => setWithdrawalMethod('wallet')}
            className={`    rounded-lg border py-3  text-sm transition ${withdrawalMethod === 'wallet' ? 'bg-primary text-white' : 'text-black'
              }`}
          >
            {t('withdrawal.transfer_to_wallet')}
          </button>
        </div>
      </div>
      {withdrawalMethod === 'wallet' ? (
        <WithdrawalWallet waletAmount={waletAmount} />
      ) : (
        <WithdrawalBank waletAmount={waletAmount} />
      )}
    </div>
  )
}

const WithdrawalWallet = ({ waletAmount }: { waletAmount: number }) => {
  const [amount, setAmount] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (amount === '' || address === '' || password === '') {
      toast.error(t('withdrawal.please_enter_all_information'))
      return
    }
    // Gửi dữ liệu tới API ở đây
    toast.success(t('withdrawal.withdrawal_request_created_successfully'))
  }
  return (
    <form onSubmit={handleSubmit} className='mx-auto  bg-white rounded-lg  space-y-4'>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('withdrawal.wallet_address')}</label>
        <input
          type='text'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t('withdrawal.wallet_address')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('withdrawal.withdrawal_amount')}</label>
        <div className='relative'>
          <input
            type='text'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t('withdrawal.withdrawal_amount')}
            className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={() => setAmount(String(waletAmount))}
            type='button'
            className='text-sm text-primary absolute right-4 top-1/2 -translate-y-1/2 uppercase font-bold'
          >
            {t('withdrawal.all')}
          </button>
        </div>
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('withdrawal.withdrawal_password')}</label>
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('withdrawal.withdrawal_password')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <button
        type='submit'
        disabled={!amount || !address || !password}
        className='disabled:bg-[#bebebe] py-3 w-full bg-primary  text-white font-semibold  rounded-full hover:bg-primary/80 transition'
      >
        {t('withdrawal.confirm')}
      </button>
    </form>
  )
}
const WithdrawalBank = ({ waletAmount }: { waletAmount: number }) => {
  const { t } = useTranslation()

  const { profile } = useContext(AppContext)
  const initialFromState = {
    totalAmount: '',
    password: ''
  }
  const [formState, setFormState] = useState(initialFromState)
  const [payment, setPayment] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)

  console.log(payment)
  useQuery({
    queryKey: ['payment', 'withdrawal'],
    queryFn: () => {
      return getPayment({ userId: profile?._id })
    },
    onSuccess: (data) => {
      if (data.data === null) {
        setIsOpen(true)
      }
      setPayment(data.data)
    },
    cacheTime: 30000
  })
  const handleChange = (name: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [name]: event.target.value }))
  }
  const [showFreezeAlert, setShowFreezeAlert] = useState(false)
  console.log(showFreezeAlert)
  const queryClient = useQueryClient()
  const mutationWithdrawal = useMutation((body: any) => {
    return createWithdrawal(body)
  })
  const handleWithdrawal = (e: any) => {
    e.preventDefault()
    // Kiểm tra tài khoản đóng băng trước khi thực hiện rút tiền

    if (payment === null) {
      setIsOpen(true)
      return
    }
    if (profile?.isDongBang) {
      setShowFreezeAlert(true)
      return
    }

    if (Number(formState?.totalAmount) < 20) {
      toast.error(t('withdrawal.min_amount'))
      return
    }
    if (payment !== null) {
      const newData = {
        totalAmount: Number(formState?.totalAmount),
        password: formState?.password,
        codeOder: generateRandomOrderCode(6)
      }
      mutationWithdrawal.mutate(newData, {
        onSuccess: () => {
          toast.success(t('withdrawal.success_message'))
          queryClient.invalidateQueries({ queryKey: ['my-wallet', 'withdrawal'] })
          queryClient.invalidateQueries(['my-wallet', 'deal'])
          queryClient.invalidateQueries({ queryKey: ['getCount-menu'] })
          queryClient.invalidateQueries({ queryKey: ['my-wallet', 'menu'] })
          const socket = io(serverUrl)
          socket.emit('sendRequest', profile?._id)
        },
        onError: (err: any) => {
          console.log(err)
          if (err?.response.status === 429 || err?.response.status === 400) {
            toast.error(err?.response.data.error)
          } else {
            toast.error(t('withdrawal.error_message'))
          }
        }
      })
    } else {
      toast.error(t('withdrawal.please_update_payment_account_before_withdrawing'))
    }
  }
  const navigate = useNavigate()
  return (
    <>
      <form onSubmit={handleWithdrawal} className='mx-auto  bg-white rounded-lg  space-y-4'>
        <p>
          <label className='block font-semibold mb-1 text-[#003857]'>{t('withdrawal.bank_account')}</label>
        </p>
        <div>
          <label className='block font-semibold mb-1 text-[#003857]'>{t('withdrawal.withdrawal_amount')}</label>
          <div className='relative'>
            <input
              type='text'
              value={formState.totalAmount}
              onChange={handleChange('totalAmount')}
              placeholder={t('withdrawal.withdrawal_amount')}
              className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              onClick={() => setFormState({ ...formState, totalAmount: String(waletAmount) })}
              type='button'
              className='text-sm text-primary absolute right-4 top-1/2 -translate-y-1/2 uppercase font-bold'
            >
              {t('withdrawal.all')}
            </button>
          </div>
        </div>

        <div>
          <label className='block font-semibold mb-1 text-[#003857]'>{t('withdrawal.withdrawal_password')}</label>
          <input
            type='password'
            value={formState.password}
            onChange={handleChange('password')}
            placeholder={t('withdrawal.withdrawal_password')}
            className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <button
          type='submit'
          disabled={!formState.totalAmount || !formState.password}
          className='disabled:bg-[#bebebe] py-3 w-full bg-primary  text-white font-semibold  rounded-full hover:bg-primary/80 transition'
        >
          {t('withdrawal.confirm')}
        </button>
      </form>
      <div
        className={`w-full max-w-xl h-screen -top-4 left-1/2 -translate-x-1/2 bg-black/50 fixed z-50 flex items-center mt-0  justify-center transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(false)
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className='max-w-xs mx-auto w-full bg-white rounded-lg p-4'
        >
          <p className='text-center text-black font-bold text-lg mb-2'>Bạn chưa liên kết ngân hàng</p>
          <p className='text-sm text-gray-500 mb-4 text-center'>
            Vui lòng cập nhật tài khoản ngân hàng trước khi rút tiền!
          </p>
          <div className='flex items-center justify-center gap-4'>
            <button
              onClick={() => setIsOpen(false)}
              className=' text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300'
            >
              Đóng
            </button>
            <button
              onClick={() => navigate('/wallet')}
              className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all duration-300'
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Withdrawal
