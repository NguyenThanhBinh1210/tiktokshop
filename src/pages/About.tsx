import notice from '~/assets/TKBG.fb331a14.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const About = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className='max-w-xl mx-auto'>
      <div className='flex items-center justify-between bg-black relative '>
        <button className=' text-white px-4 py-3.5 rounded-full absolute left-0 top-0' onClick={() => navigate('/')}>
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
        <div className='flex items-center gap-2  w-full py-2 h-max justify-center'>
          <img src={notice} alt='notice' className='w-[377px] mx-auto block' />
        </div>
      </div>
      <div className='px-4 py-2'>
        <p className='text-[#003857] font-bold text-xl mb-2'>
          {t('about.intro')}
        </p>
        <p className=' text-sm text-gray-600'>
          {t('about.description')}
          <br />
          {t('about.description_2')}
          <br />
          {t('about.description_3')}
          <br />
          {t('about.description_4')}
          <br />
          {t('about.description_5')}
          <br />
          {t('about.description_6')}
        </p>
      </div>
      <div className='text-center py-2 text-sm text-gray-600 border-t fixed bottom-0 left-0 right-0  bg-white max-w-xl mx-auto'>
        {t('about.copyright')}
      </div>
    </div>
  )
}

export default About