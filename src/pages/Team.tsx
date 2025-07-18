import notice from '~/assets/menu-icon2.e7b95bd5.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const Team = () => {
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
          <p className='uppercase text-white text-xl font-bold'>{t('team.title')}</p>
        </div>
      </div>
      <div className="px-3 mx-auto p-6 pt-3 bg-white sh rounded-lg text-gray-800 space-y-6">

        <p className="leading-relaxed">
          {t('team.description')}
          {t('team.commission')} <span className=""> {t('team.commission_2')}</span>.
        </p>

        <p className="leading-relaxed">
          {t('team.description_2')}
          {t('team.description_3')} <span className="">{t('team.description_4')}</span>, {t('team.description_5')}
        </p>


      </div>
      <div className='text-center py-2 text-sm text-gray-600 border-t fixed bottom-0 left-0 right-0  bg-white max-w-xl mx-auto'>
        {t('team.copyright')}
      </div>
    </div>
  )
}

export default Team