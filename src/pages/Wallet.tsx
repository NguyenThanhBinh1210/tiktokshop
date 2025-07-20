/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import notice from '~/assets/menu-icon13.f9f15e6f.svg'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createPayment, getPayment } from '~/apis/payment.api'
import { AppContext } from '~/contexts/app.context'
import toast from 'react-hot-toast'
const Wallet = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<string>('bankinfo')
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
          <p className='uppercase text-white text-xl font-bold'>{t('wallet.title')}</p>
        </div>
      </div>

      <div className='bg-black text-white px-3 py-4'>
        <p>{t('wallet.note_1')}</p>
        <p>{t('wallet.note_2')}</p>
      </div>
      <div className='py-2 px-3 text-sm'>
        <div
          style={{ boxShadow: 'inset 5px 5px 4px rgba(174,174,192,.2),inset -5px -5px 4px hsla(0,0%,100%,.3)' }}
          className='grid grid-cols-2 rounded-full p-1 border border-[#ededed] bg-[#ebebeb]'
        >
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-2.5  ${status === 'bankinfo'
                ? ' text-primary font-bold bg-[#fdfdfd] border-2 border-[#eee] '
                : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('bankinfo')}
            >
              {t('wallet.bank_info')}
            </button>
          </div>
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-2.5 ${status === 'withdrawalinfo'
                ? ' text-primary font-bold bg-[#fdfdfd] border-2 border-[#eee] '
                : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('withdrawalinfo')}
            >
              {t('wallet.withdrawal_info')}
            </button>
          </div>
        </div>
      </div>
      <div className='p-3'>{status === 'bankinfo' ? <BankInfo /> : <WithdrawalInfo />}</div>
    </div>
  )
}

const BankInfo = () => {
  const [bankName, setBankName] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [bankNumber, setBankNumber] = useState('')
  const [isHaveBankInfo, setIsHaveBankInfo] = useState(false)
  const [isDataFromDB, setIsDataFromDB] = useState(false)

  const { t } = useTranslation()
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  // const [payment, setPayment] = useState<any>(null)
  useQuery({
    queryKey: ['payment', profile?._id],
    queryFn: () => {
      return getPayment({ userId: profile?._id })
    },
    onSuccess: (data) => {
      setBankName(data.data.nameUserBank)
      setBankAccount(data.data.bankName)
      setBankNumber(data.data.accountNumber)
      setIsHaveBankInfo(data.data.nameUserBank && data.data.bankName && data.data.accountNumber)
      setIsDataFromDB( data.data.nameUserBank && data.data.bankName && data.data.accountNumber ? true : false)
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newData = {
      bankName: bankAccount,
      accountNumber: bankNumber,
      name: bankName,
      userId: profile?._id
    }
    mutationPayment.mutate(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['payment', profile?._id] })
        // mutationProfile.mutate()
        toast.success(t('wallet.success_message'))
        // setShowThongTin(false)
      },
      onError: () => {
        toast.error(t('wallet.error_message'))
      }
    })
  }
  const mutationPayment = useMutation((body: any) => {
    return createPayment(body)
  })
  return (
    <form onSubmit={handleSubmit} className=' mx-auto mt-5 bg-white rounded-lg  space-y-4'>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('wallet.name')}</label>
        <input
          type='text'
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder={t('wallet.name')}
          className='disabled:bg-[#f3f3f3] w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={!!isDataFromDB}
        />
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('wallet.bank_name')}</label>
        <input
          type='text'
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
          placeholder={t('wallet.bank_name')}
          className='disabled:bg-[#f3f3f3] w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={!!isDataFromDB}
        />
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('wallet.bank_account')}</label>
        <input
          type='text'
          value={bankNumber}
          onChange={(e) => setBankNumber(e.target.value)}
          placeholder={t('wallet.bank_account')}
          className='disabled:bg-[#f3f3f3] w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={!!isDataFromDB}
        />
      </div>
      {!isHaveBankInfo && (
        <button
          type='submit'
          disabled={!bankName || !bankAccount || !bankNumber}
          className='disabled:bg-[#bebebe] py-3 w-full bg-primary  text-white font-semibold  rounded-full hover:bg-primary/80 transition'
        >
          {t('wallet.confirm')}
        </button>
      )}
    </form>
  )
}

const WithdrawalInfo = () => {
  const [mangluoi, setMangluoi] = useState('')
  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState('TRC20')
  const { t } = useTranslation()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Gửi dữ liệu tới API ở đây
    alert('OK')
  }
  return (
    <form onSubmit={handleSubmit} className=' mx-auto mt-5 bg-white rounded-lg  space-y-4'>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('wallet.network')}</label>
        <input
          type='text'
          value={mangluoi}
          onChange={(e) => setMangluoi(e.target.value)}
          placeholder={t('wallet.network')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('wallet.address')}</label>
        <input
          type='text'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder={t('wallet.address')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('wallet.network')}</label>
        <div className='grid grid-cols-2 gap-3'>
          <button
            type='button'
            onClick={() => setNetwork('TRC20')}
            className={`  font-semibold  rounded-lg border py-3  transition ${network === 'TRC20' ? 'bg-primary text-white' : 'text-black'
              }`}
          >
            TRC20
          </button>
          <button
            type='button'
            onClick={() => setNetwork('ERC20')}
            className={`  font-semibold  rounded-lg border py-3  transition ${network === 'ERC20' ? 'bg-primary text-white' : 'text-black'
              }`}
          >
            ERC20
          </button>
        </div>
      </div>

      <button
        type='submit'
        disabled={!mangluoi || !address}
        className='disabled:bg-[#bebebe] py-3 w-full bg-primary  text-white font-semibold  rounded-full hover:bg-primary/80 transition'
      >
        {t('wallet.confirm')}
      </button>
    </form>
  )
}
export default Wallet
