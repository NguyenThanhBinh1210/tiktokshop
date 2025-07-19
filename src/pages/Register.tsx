/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from '~/assets/TKBG.svg'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { registerAccount } from '~/apis/auth.api'
interface IFormState {
  firstName?: string
  lastName?: string
  username: string
  password: string
  idRef: string
  phone: string
  confirmPassword: string
}


const Register = () => {
  const { t } = useTranslation()
  const initialFromState: IFormState = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    idRef: '',
    phone: '',
    confirmPassword: ''
  }

  const [errors, setErrors] = useState<IFormState>({
    username: '',
    password: '',
    idRef: '',
    phone: '',
    confirmPassword: ''
  })
  const [formState, setFormState] = useState<IFormState>(initialFromState)
  const navigate = useNavigate()

  const validateForm = () => {
    // Tạo bản copy của errors
    const newErrors: IFormState = { ...errors }

      // Reset lỗi: dùng Type Assertion thay vì @ts-ignore
      ; (Object.keys(newErrors) as (keyof IFormState)[]).forEach((key) => {
        newErrors[key] = ''
      })

    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp'
    }

    // Username (ít nhất 4 ký tự)
    if (!formState.username.trim()) {
      newErrors.username = 'Vui lòng nhập username'
    } else if (formState.username.trim().length < 4) {
      newErrors.username = 'Username phải có ít nhất 4 ký tự'
    }

    // Số điện thoại (ví dụ: kiểm tra chiều dài 9-10 ký tự, toàn số)
    const phoneRegex = /^[0-9]{9,10}$/
    if (!formState.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!phoneRegex.test(formState.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (9-10 chữ số)'
    }

    // Mật khẩu (ít nhất 6 ký tự)
    if (!formState.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu'
    } else if (formState.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    setErrors(newErrors)

    // Kiểm tra xem có error nào không
    const hasError = Object.values(newErrors).some((err) => err !== '')
    return !hasError
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      const newData = {
        name: formState.lastName + ' ' + formState.firstName,
        username: formState.username,
        password: formState.password,
        idRef: formState.idRef,
        phone: formState.phone,
        // isIdRef: true
      }
      mutationRegister.mutate(newData, {
        onSuccess: () => {
          // toast.success('Đăng ký thành công, hãy đăng nhập!')
          alert('Đăng ký thành công, hãy đăng nhập!')
          navigate('/login')
        },
        onError: (error: any) => {
          // toast.warn(error?.response.data.errMessage)
          alert(error?.response.data.errMessage)
        }
      })
    }
  }

  const mutationRegister = useMutation((body: any) => {
    return registerAccount(body)
  })
  return (
    <div className='flex flex-col items-center justify-center  bg-black px-5 text-sm'>
      <img src={logo} alt='logo' className='w-full' />
      <form onSubmit={handleSubmit} className='bg-black py-8 rounded-lg w-full max-w-[400px] mx-auto'>
        <div className=' mb-2 mt-4 relative flex items-center bg-white rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-4 text-primary absolute left-3 top-1/2 transform -translate-y-1/2'
          >
            <path
              fillRule='evenodd'
              d='M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z'
              clipRule='evenodd'
            />
          </svg>
          <div className='flex-shrink-0 pl-10'>
            {t('register.phone_number')} <span className='text-red-500'>*</span>
          </div>
          <input
            type='text'
            placeholder={t('register.phone_number')}
            value={formState.phone}
            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
            className=' pr-4 py-3 w-full   focus:outline-none rounded-full'
          />
        </div>
        {errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}
        <div className=' mb-2 mt-4 relative flex items-center bg-white rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-5 text-primary absolute left-3 top-1/2 transform -translate-y-1/2'
          >
            <path
              fillRule='evenodd'
              d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
              clipRule='evenodd'
            />
          </svg>

          <div className='flex-shrink-0 pl-10'>
            {t('register.username')} <span className='text-red-500'>*</span>
          </div>
          <input
            type='text'
            placeholder={t('register.username')}
            value={formState.username}
            onChange={(e) => setFormState({ ...formState, username: e.target.value })}
            className=' pr-4 py-3 w-full   focus:outline-none rounded-full  '
          />
        </div>
        {errors.username && <p className='text-red-500 text-sm'>{errors.username}</p>}
        <div className=' mb-2 mt-4 relative flex items-center bg-white rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-5 text-primary absolute left-3 top-1/2 transform -translate-y-1/2'
          >
            <path
              fillRule='evenodd'
              d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
              clipRule='evenodd'
            />
          </svg>

          <div className='flex-shrink-0 pl-10'>
            {t('register.password')} <span className='text-red-500'>*</span>
          </div>
          <input
            type='password'
            placeholder={t('register.password')}
            value={formState.password}
            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
            className=' pr-4 py-3 w-full   focus:outline-none rounded-full'
          />
        </div>
        {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
        <div className=' mb-2 mt-4 relative flex items-center bg-white rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-5 text-primary absolute left-3 top-1/2 transform -translate-y-1/2'
          >
            <path
              fillRule='evenodd'
              d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
              clipRule='evenodd'
            />
          </svg>

          <div className='flex-shrink-0 pl-10'>
            {t('register.confirm_password')} <span className='text-red-500'>*</span>
          </div>
          <input
            type='password'
            placeholder={t('register.confirm_password')}
            value={formState.confirmPassword}
            onChange={(e) => setFormState({ ...formState, confirmPassword: e.target.value })}
            className=' pr-4 py-3 w-full   focus:outline-none rounded-full'
          />
        </div>
        {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}
        <div className=' mb-2 mt-4 relative flex items-center bg-white rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-5 text-primary absolute left-3 top-1/2 transform -translate-y-1/2'
          >
            <path
              fillRule='evenodd'
              d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
              clipRule='evenodd'
            />
          </svg>

          <div className='flex-shrink-0 pl-10'>
            {t('register.referral_code')} <span className='text-red-500'>*</span>
          </div>
          <input
            type='text'
            placeholder={t('register.referral_code')}
            value={formState.idRef}
            onChange={(e) => setFormState({ ...formState, idRef: e.target.value })}
            className=' pr-4 py-3 w-full   focus:outline-none rounded-full'
          />
        </div>
        {errors.idRef && <p className='text-red-500 text-sm'>{errors.idRef}</p>}

        <button type='submit' className='w-full mt-7 bg-primary hover:bg-primary/80 text-white py-3 rounded-full text-lg font-semibold transition'>
          {t('register.register_now')}
        </button>
      </form>
    </div>
  )
}

export default Register
