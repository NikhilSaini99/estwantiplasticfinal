import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutState } from '@/features/authSlice'
import { useRouter } from 'next/router'


const LogoutBtn = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    function handleLogout() {
        dispatch(logoutState(false));
        router.replace('/Login/LoginForm');
    }
    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}

export default LogoutBtn
