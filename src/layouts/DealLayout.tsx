import Footer from '~/components/layouts/Footer'
import { LayoutPropsInterface } from '~/types/base.type'

const DealLayout = ({ children }: LayoutPropsInterface) => {
  return <div className='max-w-xl mx-auto  min-h-screen flex flex-col relative'>
    <div className=' min-h-screen'>
      {children}
    </div>
    <Footer />
  </div>

}

export default DealLayout
