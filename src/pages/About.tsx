import notice from '~/assets/TKBG.fb331a14.svg'
import { useNavigate } from 'react-router-dom'
const About = () => {
  const navigate = useNavigate()
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
          Intro
        </p>
        <p className=' text-sm text-gray-600'>
          TikTok-Booking is a global online travel agency and metasearch engine with a significant international presence. Founded in 2012, alongside its headquarters in Brno, Czech Republic, TikTok-Booking has established branches and offices in various locations worldwide, allowing it to cater to travelers across the globe.
          <br />
          The company operates in multiple continents, including Europe, North America, Asia, and Oceania. It has strategically positioned branches and offices in key cities such as London (United Kingdom), Barcelona (Spain), Miami (United States), Sydney (Australia), and Singapore. This global footprint enables TikTok-Booking to provide localized services, support, and expertise to customers in different regions.
          <br />
          In terms of marketing, TikTok-Booking employs various strategies to reach and engage its target audience. The company invests in digital marketing channels such as search engine advertising, social media campaigns, and email marketing to raise brand awareness and promote its services. Additionally, TikTok-Booking collaborates with influencers and travel bloggers to showcase its offerings and generate buzz among potential travelers.
          <br />
          TikTok-Booking also utilizes affiliate marketing programs, partnering with relevant websites and platforms to expand its reach and attract more customers. By offering attractive commissions and incentives, TikTok-Booking incentivizes affiliates to promote its services and drive bookings.
          <br />
          Furthermore, TikTok-Booking&nbsp;implements customer loyalty programs and referral schemes to encourage repeat business and word-of-mouth marketing. Through these initiatives, satisfied customers are rewarded for their loyalty and incentivized to refer their friends and family to use TikTok-Booking&nbsp;for their travel needs.
          <br />
          Overall, TikTok-Booking's international branches, combined with its diverse marketing strategies, allow the company to connect with customers worldwide, offer personalized services, and effectively promote its travel solutions in different markets.
        </p>
      </div>
      <div className='text-center py-2 text-sm text-gray-600 border-t fixed bottom-0 left-0 right-0  bg-white max-w-xl mx-auto'>
        © 2019 - 2025 TIKTOK-GIG Global Inc.
      </div>
    </div>
  )
}

export default About