import { useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '@/components/Footer'

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  const loginStatus = useSelector((state) => state.loginForm)

 
  useEffect(()=>{
    if(!loginStatus.adminLogin || !loginStatus.useruserLogin){
      router.replace('/Login/LoginForm')
    }
  },[loginStatus,router])

  //using this session i can display the userName or email
  const { data: session, status } = useSession()
  const LoginForm = dynamic(() => import('@/pages/Login/LoginForm'), { ssr: true })
  return (
    <>
      {/* {session ? <ShopList /> : <LoginForm session={session} status={status} />} */}
      <LoginForm />
     
    </>
  ) 
}


//for Protected Route
export async function getServerSideProps({ request }) {
  const session = await getSession({ request })  //this request object is going to return us cookies

  if (!session) {
    return {
      redirect: {
        destination: '/Login/LoginForm',
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}

