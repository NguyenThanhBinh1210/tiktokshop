import opennow from '~/assets/opennow.c69eba2a.svg'
import tiksp from '~/assets/TIKSP.dd648419.svg'
import commission from '~/assets/commission.d610ca3c.svg'
import balance from '~/assets/balance.0d759c99.svg'
import help from '~/assets/help.67d36206.svg'
import { useState } from 'react'

const Deal = () => {
  const [showCommission, setShowCommission] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  return (
    <div className='pt-14 px-4 text-sm pb-24 text-white'>
      <div className='flex items-center gap-3 py-2'>
        <img src={opennow} alt='opennow' className='size-9' />
        <span className='uppercase  font-bold text-2xl'>
          Săn đơn
        </span>
      </div>
      <div className="bg-black text-white  p-3 py-2 rounded-md mt-3 flex items-center justify-between">
        <div>
          <p className='font-bold text-sm'>
            Introduction
          </p>
          <p className='text-[8px] leading-3'>
            TikTok Shop là tính năng thương mại điện tử của dịch vụ lưu trữ video TikTok. Ra mắt chính thức vào tháng 9 năm 2023, tính năng này cho phép người dùng quan tâm đến việc khởi nghiệp và tạo thu nhập tải các sản phẩm được tuyển chọn của họ lên TikTok để những người khác khám phá và mua.
          </p>
        </div>
        <img src={tiksp} alt='tiksp' className='size-[96px] flex-shrink-0' />
      </div>
      <div className='bg-black text-white  p-3 py-2 rounded-md mt-3 flex flex-col gap-3'>

        <div className='flex justify-between items-start text-lg py-4 border-b border-white'>
          <div className='flex items-center gap-2 '>
            <img src={commission} alt='commission' className='size-10' />
            <div>
              <p className=' font-bold'>
                Hoa hồng hôm nay
              </p>
              <p>
                $0
              </p>
            </div>
          </div>
          <button onClick={() => setShowCommission(!showCommission)} className='flex  gap-2 cursor-pointer'>
            <img src={help} alt='help' className='size-5' />

          </button>


        </div>
        <div className='flex justify-between items-start text-lg py-4 '>
          <div className='flex items-center gap-2 '>
            <img src={balance} alt='balance' className='size-10' />
            <div>
              <p className=' font-bold'>
                Số dư tài khoản
              </p>
              <p>
                $0
              </p>
            </div>
          </div>
          <button onClick={() => setShowBalance(!showBalance)} className='flex  gap-2 cursor-pointer'>
            <img src={help} alt='help' className='size-5' />

          </button>


        </div>
        {showCommission && (
          <div className='bg-[#fff9] text-white text-lg rounded-full px-5 py-1  leading-6'>
            Thu nhập từ mỗi đơn đặt hàng sẽ được cộng vào tổng số dư
          </div>
        )}
        {showBalance && (
          <div className='bg-[#fff9] text-white text-lg rounded-full px-5 py-1'>
            Hệ thống sẽ tự động cập nhật thu nhập hôm nay
          </div>
        )}
      </div>
      <button className='bg-primary w-full text-white  p-3 py-4 rounded-full mt-3 flex flex-col gap-2 text-xl font-bold'>
        Bắt đầu săn đơn (0/0)
      </button>
      <div className='bg-black text-white  p-3 py-2 rounded-md mt-3 flex flex-col gap-2 text-lg'>
        <p>
          1. Về việc gửi đơn hàng , nhấn bắt đầu gửi đơn để tìm kiếm những đơn hàng Sale,và chờ hệ thống lựa chọn ngẫu nhiên.
        </p>
        <p>
          2. Tất cả những đơn hàng ngẫu nhiên không thể thay đổi hoặc hủy bỏ, hoặc bỏ qua.
        </p>
        <p>
          3. Mỗi đơn hàng cần được thanh toán trong vòng 10 phút, bạn cần liên hệ chăm sóc khách hàng trực tuyến để lấy thông tin thẻ ngân hàng.
        </p>
      </div>

    </div>
  )
}

export default Deal