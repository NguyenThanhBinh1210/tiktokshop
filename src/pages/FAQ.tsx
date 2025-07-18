import { useNavigate } from 'react-router-dom'
import notice from '~/assets/menu-icon3.d998f7a8.svg'
import { useTranslation } from 'react-i18next'
const FAQ = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className='max-w-xl mx-auto pb-10'>
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
          <p className='uppercase text-white text-xl font-bold'>{t('faq.system_message')}</p>
        </div>
      </div>
      <div className='px-3 mx-auto p-6 pt-3 bg-white  text-sm rounded-md text-gray-800 space-y-3'>
        <section>
          <h2 className='text-lg font-semibold mb-2'>{t('faq.caution')}</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>
              {t('faq.members_are_strictly_forbidden_to_register_more_than_one_account_and_repeatedly_use_the_same_wallet_address_for_reservation_deals')}
            </li>
            <li>
              {t('faq.all_malicious_money_laundering_is_strictly_prohibited_and_will_be_penalized_legally')}
            </li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>{t('faq.deposit')}</h2>
          <ul className='list-decimal list-inside space-y-1'>
            <li>{t('faq.transfer_to_customer_service')}</li>
            <li>{t('faq.provide_screenshot')}</li>
            <li>{t('faq.ensure_accurate_information')}</li>
            <li>{t('faq.contact_customer_service')}</li>
            <li>{t('faq.double_check_account_details')}</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>{t('faq.withdrawal')}</h2>
          <ul className='list-decimal list-inside space-y-1'>
            <li>{t('faq.withdrawals_only_after_bookings_are_completed')}</li>
            <li>{t('faq.credit_rating_of_100_required_to_withdraw')}</li>
            <li>{t('faq.withdrawals_processed_between_10am-10pm')}</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>{t('faq.funds')}</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>{t('faq.funds_held_securely_and_claimable_after_bookings')}</li>
            <li>{t('faq.system_allocates_bookings_to_avoid_fund_loss')}</li>
            <li>{t('faq.platform_responsible_for_unexpected_losses')}</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>{t('faq.account_security')}</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>{t('faq.do_not_disclose_passwords_to_others')}</li>
            <li>{t('faq.contact_support_if_you_forget_your_password')}</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>{t('faq.general_rating')}</h2>
          <ul className='list-decimal list-inside space-y-1'>
            <li>{t('faq.normal_and_special_deals')}</li>
            <li>{t('faq.member_users')}</li>
            <li>{t('faq.discoverist_users')}</li>
            <li>{t('faq.explorist_users')}</li>
            <li>{t('faq.globalist_users')}</li>
            <li>{t('faq.special_deals_return_earnings_to_user_account')}</li>
            <li>{t('faq.bookings_are_automatic_and_non_cancellable')}</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>{t('faq.platform_agent_mode')}</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>{t('faq.earn_commission_by_referring_users')}</li>
            <li>{t('faq.25_commission_from_downline_earnings')}</li>
          </ul>
        </section>

        <section>
          <h2 className='text-lg font-semibold mb-2'>{t('faq.operation_hour')}</h2>
          <ul className='list-disc list-inside space-y-1'>
            <li>{t('faq.bookings_can_be_made_between_10am_10pm')}</li>
          </ul>
        </section>

        <p className='text-center text-red-600 font-semibold mt-4'>
          {t('faq.note_for_any_further_assistance_please_contact_our_customer_service')}
        </p>
      </div>
      <div className='text-center py-2 text-sm text-gray-600 border-t  fixed bottom-0 left-0 right-0  bg-white max-w-xl mx-auto'>
        {t('faq.copyright')}
      </div>
    </div>
  )
}

export default FAQ
