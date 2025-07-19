import menu from '~/assets/menu-icon14.5afed8ea.svg'
import menu_7 from '~/assets/menu-icon7.15b1b83f.svg'
import Menu from '../Menu'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import { toast } from 'react-hot-toast'
const Header = () => {
  const navigate = useNavigate()
  const { reset } = useContext(AppContext)
  const handleLogout = () => {
    reset()
    toast.success('Đăng xuất thành công!')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }
  return (
    <div className='z-50 bg-[#000000bf] max-w-xl mx-auto text-white text-center py-2 text-[13px] mt-auto flex justify-between px-4 fixed top-0 w-full'>
      <div className='flex items-center gap-5'>
        <Menu />
        <Link to={'/service'}>
          <button>
            <img src={menu_7} alt='menu_7' className='size-6' />
          </button>
        </Link>
      </div>
      <span className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-medium text-xl'>
        TIKTOK Shop
      </span>
      <button onClick={handleLogout}>
        <img src={menu} alt='menu' className='size-7' />
      </button>
    </div>
  )
}

export default Header
