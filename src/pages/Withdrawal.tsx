import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import notice from '~/assets/menu-icon12.68eba35f.svg'
import noOrder from '~/assets/noOrder.png'
const Withdrawal = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState('atm')
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
          <p className='uppercase text-white text-xl font-bold'>ATM</p>
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
              ATM
            </button>
          </div>
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-2.5 ${status === 'history' ? ' text-primary font-bold bg-[#fdfdfd] border-2 border-[#eee] ' : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('history')}
            >
              Lịch sử rút tiền
            </button>
          </div>
        </div>
      </div>
      <div className='p-3'>{status === 'atm' ? <WithdrawalATM /> : <WithdrawalHistory />}</div>
    </div>
  )
}

const WithdrawalHistory = () => {
  return (
    <div>
      <div className='w-max mx-auto mt-10'>
        <img src={noOrder} alt='noOrder' className='w-[182px]' />
        <p className='text-xl font-bold mt-4 text-center '>Không có hồ sơ</p>
      </div>
    </div>
  )
}

const WithdrawalATM = () => {
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank')
  const [waletAmount] = useState(23123123)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }
  return (
    <div className='mx-auto  bg-white rounded-lg  space-y-4'>
      <p className='text-sm '>Hệ thống sẽ xử lý yêu cầu sau khi liên kết ngân hàng của bạn</p>
      <div className='p-3 py-2.5 rounded-lg bg-white border text-[#a16600] font-bold leading-5'>
        <p>Số dư tài khoản</p>
        <p>{formatCurrency(waletAmount)}</p>
      </div>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>Phương thức rút tiền</label>
        <div className='grid grid-cols-2 gap-3'>
          <button
            type='button'
            onClick={() => setWithdrawalMethod('bank')}
            className={`    rounded-lg border py-3  text-sm transition ${withdrawalMethod === 'bank' ? 'bg-primary text-white' : 'text-black'
              }`}
          >
            Chuyển tới ngân hàng
          </button>
          <button
            type='button'
            onClick={() => setWithdrawalMethod('wallet')}
            className={`    rounded-lg border py-3  text-sm transition ${withdrawalMethod === 'wallet' ? 'bg-primary text-white' : 'text-black'
              }`}
          >
            Chuyển tới ví điện tử
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (amount === '' || address === '' || password === '') {
      alert('Vui lòng nhập đầy đủ thông tin!')
      return
    }
    // Gửi dữ liệu tới API ở đây
    alert('Tạo yêu cầu rút tiền thành công!')
  }
  return (
    <form onSubmit={handleSubmit} className='mx-auto  bg-white rounded-lg  space-y-4'>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>Địa chỉ ví</label>
        <input
          type='text'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Địa chỉ ví'
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>Số tiền rút</label>
        <div className='relative'>
          <input
            type='text'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Số tiền rút'
            className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={() => setAmount(String(waletAmount))}
            type='button'
            className='text-sm text-primary absolute right-4 top-1/2 -translate-y-1/2 uppercase font-bold'
          >
            Tất cả
          </button>
        </div>
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>Mật khẩu rút tiền</label>
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Mật khẩu rút tiền'
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <button
        type='submit'
        disabled={!amount || !address || !password}
        className='disabled:bg-[#bebebe] py-3 w-full bg-primary  text-white font-semibold  rounded-full hover:bg-primary/80 transition'
      >
        Xác nhận
      </button>
    </form>
  )
}
const WithdrawalBank = ({ waletAmount }: { waletAmount: number }) => {
  const [amount, setAmount] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (amount === '' || password === '') {
      alert('Vui lòng nhập đầy đủ thông tin!')
      return
    }
    // Gửi dữ liệu tới API ở đây
    alert('Tạo yêu cầu rút tiền thành công!')
  }
  return (
    <form onSubmit={handleSubmit} className='mx-auto  bg-white rounded-lg  space-y-4'>
      <p>
        <label className='block font-semibold mb-1 text-[#003857]'>Tài khoản ngân hàng</label>
      </p>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>Số tiền rút</label>
        <div className='relative'>
          <input
            type='text'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Số tiền rút'
            className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={() => setAmount(String(waletAmount))}
            type='button'
            className='text-sm text-primary absolute right-4 top-1/2 -translate-y-1/2 uppercase font-bold'
          >
            Tất cả
          </button>
        </div>
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>Mật khẩu rút tiền</label>
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Mật khẩu rút tiền'
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <button
        type='submit'
        disabled={!amount || !password}
        className='disabled:bg-[#bebebe] py-3 w-full bg-primary  text-white font-semibold  rounded-full hover:bg-primary/80 transition'
      >
        Xác nhận
      </button>
    </form>
  )
}

export default Withdrawal
