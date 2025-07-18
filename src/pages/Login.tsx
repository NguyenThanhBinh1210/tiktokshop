import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import banner from '~/assets/downloadbg.svg'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  return (
    <div style={{ backgroundImage: `url(${banner})` }} className='flex flex-col items-center justify-center  bg-black px-5 text-sm'>
      <div className='pt-20'>
        <p className='text-white text-3xl max-w-[400px] mx-auto font-semibold '>
          Phát triển kinh doanh với <span className='text-primary'>TikTok Việt Nam </span> ngay hôm nay!
        </p>
        <p className='text-white text-sm max-w-[400px] mx-auto mt-2'>Nếu là bán lẻ, thương hiệu hay doanh nghiệp, bạn luôn có thể bán hàng trên TikTok với số lượng người theo dõi bất kỳ. Tiktok góp phần mang cho bạn lượng truy cập khổng lồ thông qua video ngắn và LIVE.</p>
      </div>
      <div className=' py-8 rounded-lg w-full max-w-[400px] mx-auto'>

        <div className='mb-7 relative'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='text-primary size-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          >
            <path
              fillRule='evenodd'
              d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
              clipRule='evenodd'
            />
          </svg>

          <input
            type='text'
            placeholder='16888888888'
            className='pl-10 pr-4 py-3 w-full rounded-full bg-white focus:outline-none '
          />
        </div>
        <div className='mb-7 relative'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='text-primary size-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          >
            <path
              fillRule='evenodd'
              d='M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z'
              clipRule='evenodd'
            />
          </svg>

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Mật khẩu đăng nhập'
            className='pl-10 pr-10 py-3 w-full rounded-full bg-white focus:outline-none '
          />
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <div className='flex items-center mb-6'>
          <input type='checkbox' id='remember' className='mr-2' defaultChecked />
          <label htmlFor='remember' className='text-white text-sm'>
            Ghi nhớ tôi
          </label>
        </div>

        <button className='w-full bg-primary hover:bg-primary/80 text-white py-3 rounded-full text-lg font-semibold transition'>
          ĐĂNG NHẬP
        </button>

        <div className='text-center mt-4'>
          <span className='text-white text-sm'>Không có tài khoản? </span>
          <button className='text-primary font-bold text-sm hover:underline '>
            <Link to='/register'>Đăng ký</Link>
          </button>
        </div>
        <div className='text-white text-xs mt-4'>
          Tiếp tục nghĩa là bạn đồng ý với Điều khoản dịch vụ thương gia dành cho TikTok Shop, Điều khoản dịch vụ thương
          mại TikTok, đồng thời công nhận oạn đã đọc Chính sách quyền riêng tư của TIkTok dành cho đối tác để tìm hiểu
          cách chúng tôi thu thập, sử dụng và chia sẻ dỡ liệu của bạn. Bạn có thể sử dụng cùng thông tin đăng nhập này
          để truy cập Trung tâm doanh nghiệp và Trinh quản tý quảng cáo, Bên cạnh đó, bạn sẽ có thể sử dụng thu nhập của
          cửa hàng mình để thanh toán chỉ tiêu quảng cáo.
          <br />
          <br />
          Bạn cũng dòng ý ràng các sản phẩm của bạn sẽ được tự động thêm vào Cộng
          tác mở trong chương trình liên kết, với tỷ lệ hoa hồng xác định theo hạng mục
          sản phẩm

        </div>
      </div>
    </div>
  )
}

export default Login
