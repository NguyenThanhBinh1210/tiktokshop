/* eslint-disable @typescript-eslint/no-explicit-any */
import notice from '~/assets/menu-icon11.90d56ac5.svg'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppContext } from '~/contexts/app.context'
import { useMutation } from 'react-query'
import { updatePassword } from '~/apis/auth.api'
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
              className={` rounded-full w-full  py-2.5  ${status === 'password'
                  ? ' text-primary font-bold bg-[#fdfdfd] border-2 border-[#eee] '
                  : 'text-[#7f7f7f]'
                }`}
              onClick={() => setStatus('password')}
            >
              {t('security.login_password')}
            </button>
          </div>
          <div className=' rounded-xl  text-center'>
            <button
              className={` rounded-full w-full  py-2.5 ${status === 'withdrawal'
                  ? ' text-primary font-bold bg-[#fdfdfd] border-2 border-[#eee] '
                  : 'text-[#7f7f7f]'
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
  const { t } = useTranslation()

  const { profile, setProfile, setIsAuthenticated, reset } = useContext(AppContext)
  const initialFromState = {
    username: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  }
  const [errors, setErrors] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  })
  const validateForm = () => {
    // Tạo bản copy của errors
    const newErrors: any = { ...errors }

      // Reset lỗi: dùng Type Assertion thay vì @ts-ignore
      ; (Object.keys(newErrors) as (keyof any)[]).forEach((key) => {
        newErrors[key] = ''
      })

    if (formState.newPassword !== formState.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp'
    }
    if (formState.password === formState.newPassword) {
      newErrors.newPassword = 'Mật khẩu mới không được trùng với mật khẩu cũ'
    }

    // Mật khẩu (ít nhất 6 ký tự)
    if (!formState.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu'
    } else if (formState.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    if (!formState.newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu'
    } else if (formState.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    if (!formState.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng nhập mật khẩu'
    } else if (formState.confirmPassword.length < 6) {
      newErrors.confirmPassword = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    setErrors(newErrors)

    // Kiểm tra xem có error nào không
    const hasError = Object.values(newErrors).some((err) => err !== '')
    return !hasError
  }

  const [formState, setFormState] = useState(initialFromState)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (name: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [name]: event.target.value }))
  }
  const mutationPassword = useMutation((body: any) => {
    return updatePassword(body)
  })
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newData = {
      username: profile?.username,
      password: formState.password,
      newPassword: formState.newPassword
    }
    if (validateForm()) {
      mutationPassword.mutate(newData, {
        onSuccess: () => {
          setIsAuthenticated(false)
          setProfile(null)
          reset()
          alert('Đổi mật khẩu thành công, hãy đăng nhập lại!')
          navigate('/login')
        },
        onError: () => {
          alert('Lỗi không thể thay đổi mật khẩu!')
        }
      })
    }
  }
  return (
    <form onSubmit={handleSubmit} className=' mx-auto mt-5 bg-white rounded-lg  space-y-4'>
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('security.old_password')}</label>
        <input
          type='password'
          value={formState.password}
          onChange={handleChange('password')}
          placeholder={t('security.old_password')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('security.new_login_password')}</label>
        <input
          type='password'
          value={formState.newPassword}
          onChange={handleChange('newPassword')}
          placeholder={t('security.new_login_password')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      {errors.newPassword && <p className='text-red-500 text-sm'>{errors.newPassword}</p>}
      <div>
        <label className='block font-semibold mb-1 text-[#003857]'>{t('security.confirm_password')}</label>
        <input
          type='password'
          value={formState.confirmPassword}
          onChange={handleChange('confirmPassword')}
          placeholder={t('security.confirm_password')}
          className='w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}
      <button
        type='submit'
        disabled={!formState.password || !formState.newPassword || !formState.confirmPassword}
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
