import { useNavigate } from "react-router-dom"
import notice from '~/assets/language.2ba63ab6.svg'
import LanguageSwitcher from "~/components/LangueChange"
import { useTranslation } from 'react-i18next'
const Lang = () => {
  const navigate = useNavigate()
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
          <p className='uppercase text-white text-xl font-bold'>{t('lang.change_language')}</p>
        </div>
      </div>
      <div className="text-center py-10">
        <LanguageSwitcher />

      </div>
    </div>
  )
}

export default Lang