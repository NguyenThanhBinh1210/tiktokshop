import { useState } from 'react'
import { Link } from 'react-router-dom'
import nav from '~/assets/nav.c9e17765.svg'
import user_header from '~/assets/user_header.svg'
import notice from '~/assets/notice.5b7a1636.svg'
import menu_icon5_on from '~/assets/menu-icon5_on.c69eba2a.svg'
import menu_icon9_on from '~/assets/menu-icon9_on.bf7c633e.svg'
import menu_icon6 from '~/assets/menu-icon6.4845e69c.svg'
import menu_icon12 from '~/assets/menu-icon12.68eba35f.svg'
import menu_icon13 from '~/assets/menu-icon13.f9f15e6f.svg'
import language from '~/assets/language.2ba63ab6.svg'
import menu_icon7 from '~/assets/menu-icon7.15b1b83f.svg'
import menu_icon10 from '~/assets/menu-icon10.6c9faabc.svg'
import menu_icon11 from '~/assets/menu-icon11.90d56ac5.svg'
import menu_icon1 from '~/assets/menu-icon1.20ae2868.svg'
import menu_icon2 from '~/assets/menu-icon2.e7b95bd5.svg'
import menu_icon3 from '~/assets/menu-icon3.d998f7a8.svg'
import menu_icon4 from '~/assets/menu-icon4.20b532cb.svg'
import zhengshu from '~/assets/zhengshu.bdc5976b.svg'
import vip1 from '~/assets/vip1.png'
import { useTranslation } from 'react-i18next'
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src={nav} alt='nav' className='size-8' />
      </button>
      <div
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(false)
        }}
        className={`inset-0 bg-black/30 max-w-xl mx-auto fixed top-0 left-0 z-[51] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          } transition-all duration-300`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className={`w-[370px] h-full bg-black absolute top-0 left-0 z-[100] ${isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-all duration-300 px-4`}
        >
          <div className='text-white text-xl font-bold p-4 uppercase relative'>
            TikTok Shop
            <button onClick={() => setIsOpen(false)} className='absolute top-4 right-0 bg-primary rounded-full p-0.5'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                <path
                  fillRule='evenodd'
                  d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          <div className='bg-white  w-full rounded-xl p-2.5'>
            <div className='flex items-center gap-5'>
              <div className='rounded-full overflow-hidden border border-primary w-max'>
                <img src={user_header} alt='user_header' className='size-[80px]' />
              </div>
              <div className='text-gray-500 space-y-2'>
                <p className='text-lg font-medium text-start flex item-center gap-2'>
                  vn6688
                  <img src={vip1} alt='' className='size-6' />
                </p>
                <div className='text-lg font-medium flex items-center '>
                  {t('menu.trust_level')}: <div className='bg-primary h-0.5 w-6 rounded-full ml-4'> </div>
                  <div className='text-white bg-primary rounded-full  py-1 text-xs px-3'>100%</div>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 mt-3 mb-3'>
              <div className='border-r-2'>
                <p className='text-[#003857] font-bold text-2xl'>$0.00</p>
                <p className='text-gray-500 text-lg '>{t('menu.account_balance')}</p>
              </div>
              <div className=''>
                <p className='text-[#003857] font-bold text-2xl'>$0.00</p>
                <p className='text-gray-500 text-lg '>{t('menu.commission')}</p>
              </div>
            </div>
          </div>
          <div className='h-[442px] w-full overflow-y-auto pr-4 mt-3'>
            <Link to={'/notification'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={notice} alt='notice' className='size-10' />
              <p>{t('menu.system_message')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/deal'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon5_on} alt='notice' className='size-10' />
              <p>{t('menu.start')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/dealing_slip'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon9_on} alt='notice' className='size-10' />
              <p>{t('menu.order_slip')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/recharge'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon6} alt='notice' className='size-10' />
              <p>{t('menu.transaction')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/withdrawal'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon12} alt='notice' className='size-10' />
              <p>{t('menu.atm')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/wallet'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon13} alt='notice' className='size-10' />
              <p>{t('menu.wallet_information')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/lang'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={language} alt='notice' className='size-10' />
              <p>{t('menu.change_language')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/service'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon7} alt='notice' className='size-10' />
              <p>{t('menu.customer_service')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon10} alt='notice' className='size-10' />
              <p>{t('menu.group_report')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/security'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon11} alt='notice' className='size-10' />
              <p>{t('menu.password_setting')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/tnc'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon1} alt='notice' className='size-10' />
              <p>{t('menu.terms_and_conditions')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/team'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon2} alt='notice' className='size-10' />
              <p>{t('menu.group_rules')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/faq'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon3} alt='notice' className='size-10' />
              <p>{t('menu.faq')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/about'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={menu_icon4} alt='notice' className='size-10' />
              <p>{t('menu.company_profile')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
            <Link to={'/zhengshu'} className='flex items-center gap-2 text-lg py-3 border-b border-white'>
              <img src={zhengshu} alt='notice' className='size-10' />
              <p>{t('menu.certificate')}</p>
              <button className='ml-auto'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </Link>
          </div>
          <div className='absolute bottom-0 left-0 text-center text-sm w-full py-2 bg-black/30 z-[51]'>
            {t('menu.copyright')}
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
