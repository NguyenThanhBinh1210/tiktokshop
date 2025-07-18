import Footer from '~/components/layouts/Footer'
import Header from '~/components/layouts/Header'
import { LayoutPropsInterface } from '~/types/base.type'

const HomeLayout = ({ children }: LayoutPropsInterface) => {
  return <div className='max-w-xl mx-auto  min-h-screen flex flex-col relative'>
    <Header></Header>
    <div className='bg-[#000000e6] min-h-screen'>
      {children}
    </div>
    <Footer />
  </div>

}

export default HomeLayout
