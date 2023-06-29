import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const useAuth = (redirectPath)=>{ 
    const router = useRouter()
    const useLoginStatus = useSelector((state)=>state.loginForm)

    // console.log('inside useAUth',useLoginStatus.userLogin)
    useEffect(()=>{
        if(useLoginStatus.userLogin){
            router.push(redirectPath)
        }
        else {
            router.push(redirectPath)
        }
    },[useLoginStatus.userLogin,router,redirectPath])
   
    return null;

}

export default useAuth