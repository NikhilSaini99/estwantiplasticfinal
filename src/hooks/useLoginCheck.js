import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const useLoginCheck = () => {
    const router = useRouter()
    const loginStatus = useSelector((state) => state.loginForm)

    function loginCheck() {
    
        if (!loginStatus.adminLogin && !loginStatus.userLogin) {
            router.push('/Login/LoginForm');
          }
    }


    return { loginCheck }
}

export default useLoginCheck
