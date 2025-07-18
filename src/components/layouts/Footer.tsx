import home from '~/assets/home-gray.svg'
import home_on from '~/assets/home_on.svg'
import menu_icon5 from '~/assets/menu-icon5.svg'
import menu_icon5_on from '~/assets/menu-icon5_on.svg'
import home_9 from '~/assets/menu-icon9.svg'
import home_9_on from '~/assets/menu-icon9_on.svg'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isDeal = location.pathname === '/deal'
  const isDealingSlip = location.pathname === '/dealing_slip'
  return (
    <div className='bg-black text-white text-center py-4 text-[13px] mt-auto flex justify-between px-10 fixed bottom-0 w-full max-w-xl mx-auto'>
      <Link to='/'>
        {isHome ? (
          <img src={home_on} alt='home' className='size-8' />
        ) : (
          <img src={home} alt='home' className='size-8' />
        )}
      </Link>
      <Link to='/deal'>
        {isDeal ? (
          <img src={menu_icon5_on} alt='menu_icon5' className='size-8' />
        ) : (
          <img src={menu_icon5} alt='menu_icon5' className='size-8' />
        )}
      </Link>
      <Link to='/dealing_slip'>
        {isDealingSlip ? (
          <img src={home_9_on} alt='home_9' className='size-8' />
        ) : (
          <img src={home_9} alt='home_9' className='size-8' />
        )}
      </Link>
    </div>
  )
}

export default Footer
