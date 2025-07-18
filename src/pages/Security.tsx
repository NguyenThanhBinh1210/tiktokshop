import notice from '~/assets/menu-icon11.90d56ac5.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
const Security = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [status, setStatus] = useState<string>('password')
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
          <p className='uppercase text-white text-xl font-bold'>{t('security.title')}</p>
        </div>
      </div>
      <div className='py-2 px-3 text-sm'>
        <div
          style={{ boxShadow: 'inset 5px 5px 4px rgba(174,174,192,.2),inset -5px -5px 4px hsla(0,0%,100%,.3)' }}
          className='grid grid-cols-2 rounded-full p-1 border border-[#ededed] bg-[#ebebeb]'
        >
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-2.5  ${status === 'password' ? ' text-primary font-bold bg-[#fdfdfd] border-2 border-[#eee] ' : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('password')}
            >
              {t('security.login_password')}
            </button>
          </div>
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-2.5 ${status === 'withdrawal' ? ' text-primary font-bold bg-[#fdfdfd] border-2 border-[#eee] ' : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('withdrawal')}
            >
              {t('security.withdrawal_password')}
            </button>
          </div>
        </div>
      </div>
      <div className='p-3'>{status === 'password' ? <Password /> : <WithdrawalPassword />}</div>
    </div>
  )
}

const Password = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { t } = useTranslation()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert(t('security.password_confirmation_does_not_match'))
      return
    }
    // Gửi dữ liệu tới API ở đây
    alert(t('security.password_changed_successfully'))
  }
  return (
    <form onSubmit={handleSubmit} className=' mx-auto mt-5 bg-white rounded-lg  space-y-4'>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('security.old_password')}</label>
        <input
          type='password'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder={t('security.old_password')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('security.new_login_password')}</label>
        <input
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder={t('security.new_login_password')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('security.confirm_password')}</label>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t('security.confirm_password')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <button
        type='submit'
        disabled={!oldPassword || !newPassword || !confirmPassword}
        className='disabled:bg-[#bebebe] py-3 w-full bg-primary  text-white font-semibold  rounded-full hover:bg-primary/80 transition'
      >
        {t('security.confirm')}
      </button>
    </form>
  )
}

const WithdrawalPassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { t } = useTranslation()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert(t('security.password_confirmation_does_not_match'))
      return
    }
    // Gửi dữ liệu tới API ở đây
    alert(t('security.password_changed_successfully'))
  }
  return (
    <form onSubmit={handleSubmit} className=' mx-auto mt-5 bg-white rounded-lg  space-y-4'>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('security.old_password')}</label>
        <input
          type='password'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder={t('security.old_password')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('security.new_withdrawal_password')}</label>
        <input
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder={t('security.new_withdrawal_password')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('security.confirm_withdrawal_password')}</label>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t('security.confirm_withdrawal_password')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <button
        type='submit'
        disabled={!oldPassword || !newPassword || !confirmPassword}
        className='disabled:bg-[#bebebe] py-3 w-full bg-primary  text-white font-semibold  rounded-full hover:bg-primary/80 transition'
      >
        {t('security.confirm')}
      </button>
    </form>
  )
}

export default Security
