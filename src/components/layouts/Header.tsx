import menu from '~/assets/menu-icon14.5afed8ea.svg'
import menu_7 from '~/assets/menu-icon7.15b1b83f.svg'
import Menu from '../Menu'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AppContext } from '~/contexts/app.context'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
const Header = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { reset } = useContext(AppContext)
  const handleLogout = () => {
    reset()
    toast.success(t('logout.success'))
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className='z-50 bg-[#000000bf] max-w-xl mx-auto text-white text-center py-2 text-[13px] mt-auto flex justify-between px-4 fixed top-0 w-full'>
        <div className='flex items-center gap-5'>
          <Menu />
          <Link to={'/service'} className=' flex items-center gap-2'>
            <button>
              <img src={menu_7} alt='menu_7' className='size-6' />
            </button>
          </Link>
        </div>
        <span className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-medium text-xl'>
          TIKTOK Shop
        </span>
        <button
          className='flex items-center gap-2 bg-[#000000bf] hover:bg-[#1f1f1fbf] transition-all duration-300 px-2 py-1 rounded'
          onClick={() => setIsOpen(true)}
        >
          Thoát <img src={menu} alt='menu' className='size-6' />
        </button>
      </div>
      <div
        className={`inset-0 bg-black/50 fixed z-50 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
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
          <p className='text-center text-black font-bold text-lg mb-2'>{t('logout.confirm')}</p>
          <p className='text-sm text-gray-500 mb-4 text-center'>{t('logout.confirm_message')}</p>
          <div className='flex items-center justify-center gap-4'>
            <button
              onClick={() => setIsOpen(false)}
              className=' text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300'
            >
              {t('logout.back')}
            </button>
            <button
              onClick={handleLogout}
              className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all duration-300'
            >
              {t('logout.logout')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
