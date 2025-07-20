import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import NotFound from '~/pages/NotFound'
import HomeLayout from '~/layouts/HomeLayout'
import Home from '~/pages/Home'
import LoginLayout from '~/layouts/LoginLayout'
import Login from '~/pages/Login'
import { useContext } from 'react'
import { AppContext } from '~/contexts/app.context'
import Register from '~/pages/Register'
import Deal from '~/pages/Deal'
import DealingSlip from '~/pages/DealingSlip'
import DealLayout from '~/layouts/DealLayout'
import Notification from '~/pages/Notification'
import Zhengshu from '~/pages/Zhengshu'
import About from '~/pages/About'
import FAQ from '~/pages/FAQ'
import Team from '~/pages/Team'
import Service from '~/pages/Service'
import Tnc from '~/pages/Tnc'
import Security from '~/pages/Security'
import Lang from '~/pages/Lang'
import Withdrawal from '~/pages/Withdrawal'
import Wallet from '~/pages/Wallet'
import Recharge from '~/pages/Recharge'
import RechargeHistory from '~/pages/RechargeHistory'
import Chat from '~/pages/Chat'

const useRouteElements = () => {
  function ProtecedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='login' />
  }
  function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <LoginLayout>
              <Login />
            </LoginLayout>
          )
        },
        {
          path: '/register',
          element: (
            <LoginLayout>
              <Register />
            </LoginLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtecedRoute />,
      children: [
        {
          path: '/',
          index: true,
          element: (
            <HomeLayout>
              <Home />
            </HomeLayout>
          )
        },
        {
          path: '/deal',
          element: (
            <HomeLayout>
              <Deal />
            </HomeLayout>
          )
        },
        {
          path: '/dealing_slip',
          element: (
            <DealLayout>
              <DealingSlip />
            </DealLayout>
          )
        },
        {
          path: '/notification',
          element: <Notification />
        },
        {
          path: '/zhengshu',
          element: <Zhengshu />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/faq',
          element: <FAQ />
        },
        {
          path: '/team',
          element: <Team />
        },
        {
          path: '/service',
          element: <Service />
        },
        {
          path: '/service/chat',
          element: <Chat />
        },
        {
          path: '/tnc',
          element: <Tnc />
        },
        {
          path: '/security',
          element: <Security />
        },

        {
          path: '/wallet',
          element: <Wallet />
        },
        {
          path: '/withdrawal',
          element: <Withdrawal />
        },
        {
          path: '/recharge',
          element: <Recharge />
        },
        {
          path: '/recharge-history',
          element: <RechargeHistory />
        }
      ]
    },
    {
      path: '/lang',
      element: (
        <Lang />
      )
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}
export default useRouteElements
