import { useNavigate } from 'react-router-dom'
import notice from '~/assets/menu-icon3.d998f7a8.svg'
import { useTranslation } from 'react-i18next'
const Tnc = () => {
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
          <p className='uppercase text-white text-xl font-bold'>{t('tnc.description')}</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 px-3 pt-3 bg-white  rounded-lg text-gray-800 space-y-3">

        <ol className="list-decimal list-inside space-y-2 text-justify">
          <li>{t('tnc.all_reservation_deals_must_be_completed_prior_to_withdrawing_or_resetting_your_account')}</li>
          <li>{t('tnc.only_one_account_can_be_registered_per_phone_number')}</li>
          <li>{t('tnc.please_refrain_from_associating_the_same_wallet_address_with_multiple_accounts_for_hotel_reservations')}</li>
          <li>{t('tnc.kindly_refrain_from_disclosing_your_account_password_and_withdrawal_password_to_others')}</li>
          <li>{t('tnc.all_reservation_deals_are_randomly_assigned_by_the_system')}</li>
          <li>{t('tnc.once_a_reservation_deal_has_been_accepted_and_allocated_by_the_system_any_changes_cancellations_or_abandonment_of_the_reservation_are_strictly_prohibited')}</li>
          <li>{t('tnc.legal_action_will_be_taken_in_case_of_inappropriate_account_usage')}</li>
          <li>{t('tnc.please_verify_the_deposit_address_with_customer_service_before_transferring_funds')}</li>
          <li>{t('tnc.the_platform_will_not_assume_any_responsibility_if_a_deposit_is_made_to_an_incorrect_deposit_address')}</li>
          <li>{t('tnc.a_balance_of_less_than_usdt_50_is_insufficient_to_initiate_a_reservation_deal_members_should_ensure_that_they_have_a_balance_of_at_least_usdt_50_before_initiating_a_reservation_deal')}</li>
          <li>{t('tnc.once_a_member_has_initiated_a_reservation_deal_it_must_be_completed_within_one_day_if_completion_within_one_day_is_not_feasible_please_promptly_inform_customer_service')}</li>
          <li>{t('tnc.bank_withdrawals_are_only_available_for_exploirst_members_or_above')}</li>
        </ol>

        <p className="text-red-600  text-justify">
          {t('tnc.please_note_the_above_rules_and_guidelines_are_designed_to_ensure_smooth_transactions_and_platform_usage_it_is_important_to_adhere_to_these_rules_for_a_seamless_experience_if_you_have_any_questions_or_require_assistance_please_contact_our_customer_service_team')}
        </p>
      </div>
      <div className='text-center py-2 text-sm text-gray-600 border-t fixed bottom-0 left-0 right-0  bg-white max-w-xl mx-auto'>
        {t('tnc.copyright')}
      </div>
    </div>
  )
}

export default Tnc