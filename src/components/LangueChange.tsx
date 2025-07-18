import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import image34 from '~/assets/34.png'
import imagept from '~/assets/pt.png'
import image67 from '~/assets/67.png'
import image66 from '~/assets/66.png'
import image964 from '~/assets/964.png'
import image39 from '~/assets/39.png'
import image81 from '~/assets/81.png'
import image82 from '~/assets/82.png'
import image43 from '~/assets/44.png'
import image86 from '~/assets/86.png'
import image60 from '~/assets/60.png'

export const languages = [
  {
    code: 'es',
    label: 'Español',
    icon: image34
  },
  {
    code: 'pt',
    label: 'Portugal',
    icon: imagept
  },
  {
    code: 'vi',
    label: 'Tiếng Việt',
    icon: image67
  },
  {
    code: 'th',
    label: 'ภาษาไทย',
    icon: image66
  },

  {
    code: 'ar',
    label: 'اللغة العربية',
    icon: image964
  },
  {
    code: 'it',
    label: 'Italiano',
    icon: image39
  },
  {
    code: 'ja',
    label: '日本語',
    icon: image81
  },
  {
    code: 'ko',
    label: '한국어',
    icon: image82
  },

  { code: 'en', label: 'English', icon: image43 },
  {
    code: 'zh',
    label: '中文',
    icon: image86
  },
  {
    code: 'ms',
    label: 'Bahasa Melayu',
    icon: image60
  }
]
export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [curent, setCurent] = useState(i18n.language)


  // const currentLang = languages.find((l) => l.code === i18n.language) || languages[0]

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
    setCurent(code)
  }

  return (
    <div className='px-10'>
      <div className=' mt-2  bg-white text-black rounded-md space-y-4 z-50 '>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className=' flex items-center shadow-md relative gap-x-3 w-full text-left px-4 py-6 hover:bg-gray-100 text-sm rounded-md  '
          >
            <img src={lang.icon} alt={lang.label} className='size-6' />
            {lang.label}

            {curent === lang.code && (
              <span className='absolute right-4 bg-primary text-white p-0.5 rounded-full text-xs'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 12.75 6 6 9-13.5' />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
