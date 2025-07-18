import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import notice from '~/assets/menu-icon13.f9f15e6f.svg'
const Wallet = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<string>('bankinfo')
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
          <p className='uppercase text-white text-xl font-bold'>Thông tin ví</p>
        </div>
      </div>

      <div className='bg-black text-white px-3 py-4'>
        <p>*Lưu ý liên kết chính xác thông tin tài khoản ngân hàng trước khi tạo lệnh rút tiền</p>
        <p>*Do sự chậm trễ của mạng ERC20, khuyến nghị sử dụng mạng TRC20</p>
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
              Thông tin ngân hàng
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
              Thông tin ví
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (bankName === '' || bankAccount === '' || bankNumber === '') {
      alert('Vui lòng nhập đầy đủ thông tin!')
      return
    }
    // Gửi dữ liệu tới API ở đây
    alert('Thông tin tài khoản ngân hàng đã được cập nhật!')
  }
  return (
    <form onSubmit={handleSubmit} className=' mx-auto mt-5 bg-white rounded-lg  space-y-4'>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>Họ và tên</label>
        <input
          type='text'
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder='Họ và tên'
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>Tên ngân hàng</label>
        <input
          type='text'
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
          placeholder='Tên ngân hàng'
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>Số tài khoản</label>
        <input
          type='text'
          value={bankNumber}
          onChange={(e) => setBankNumber(e.target.value)}
          placeholder='Số tài khoản'
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <button
        type='submit'
        disabled={!bankName || !bankAccount || !bankNumber}
        className='disabled:bg-[#bebebe] py-3 w-full bg-primary  text-white font-semibold  rounded-full hover:bg-primary/80 transition'
      >
        Xác nhận
      </button>
    </form>
  )
}

const WithdrawalInfo = () => {
  const [mangluoi, setMangluoi] = useState('')
  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState('TRC20')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Gửi dữ liệu tới API ở đây
    alert('OK')
  }
  return (
    <form onSubmit={handleSubmit} className=' mx-auto mt-5 bg-white rounded-lg  space-y-4'>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>Mạng lưới</label>
        <input
          type='text'
          value={mangluoi}
          onChange={(e) => setMangluoi(e.target.value)}
          placeholder='Mạng lưới'
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

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
        <label className='block font-semibold mb-1 text-[#003857]'>Mạng lưới</label>
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
        Xác nhận
      </button>
    </form>
  )
}
export default Wallet
