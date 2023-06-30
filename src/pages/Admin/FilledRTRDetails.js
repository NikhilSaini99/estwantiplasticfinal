


import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Stack, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useFetch } from '@/constants/useFetch';
import Navbar from '@/components/Navbar';
import{ useRouter } from 'next/router';
import { useDispatch,useSelector } from 'react-redux';
import { existingData } from '@/features/RTRformslice';
import { useSession} from 'next-auth/react';
import Footer from '@/components/Footer';
import useLoginCheck from '@/hooks/useLoginCheck';




const FilledRTRDetails = () => {

    const {data:session,status} = useSession()
       
    const router = useRouter()
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [userList, setUserList] = useState([])
    const dispatch = useDispatch()
    const loginStatus = useSelector((state)=>state.loginForm)
    const { data: check,loading, fetchAPI } = useFetch('get', '/rtr/list');
    const [adminLoginState,setAdminLoginState] = useState(false)
    const { loginCheck } = useLoginCheck()
    
    useEffect(() => {
        loginCheck();
        fetchAPI();
    }, [fetchAPI])

    useEffect(() => {
        if (check !== null) {
            setUserList(check.result.list)
        }
    }, [check,dispatch])

    useFetch(()=>{
        setAdminLoginState(true)
    },[loginStatus])
    
 

 
         return (
        <>
      
            <Navbar />           
            <Paper elevation={20} sx={{ width: '98%', mx:'auto', my:'5rem', overflowX: 'auto' }}>
                <Stack spacing={4} direction='column'>
                <Box sx={{ display: 'flex', alignItems:'center'}} >
                        <Typography variant='h1' sx={{ margin: '2.55rem auto', fontSize: '3rem', color: '#2C306F', }}>All User RTR List</Typography>
                    </Box>
                    <TableContainer>
                        <Table sx={{ width: '95%', margin: '0 auto' }}>
                            <TableHead sx={{ ' & th': { px: '5px' } }}>
                                <TableRow sx={{ '&>*': { textAlign: 'center' } }}>
                                    <TableCell >Submitetd on</TableCell>
                                    <TableCell >Business Name</TableCell>
                                    <TableCell>TIN</TableCell>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>Designation</TableCell>
                                    <TableCell>Email ID</TableCell>
                                    <TableCell>Total Levy Payable</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Approvers Comment</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ ' & td': { px: '5px' } }}>
                                {userList.map((item, index) => (
                                    <TableRow key={index} sx={{ '&>*': { textAlign: 'center' } }}>
                                        <TableCell>{item.created_at.split('T')[0]}</TableCell>
                                        <TableCell>{item.company_name}</TableCell>
                                        <TableCell>{item.tin}</TableCell>
                                        <TableCell>{item.first_name}</TableCell>
                                        <TableCell>{item.designation}</TableCell>
                                        <TableCell>{item.email_id}</TableCell>
                                        <TableCell>{item.total_levy_payable.toFixed(2)}</TableCell>
                                        <TableCell> {item.approval_status === 1
                                            ? "Pending"
                                            : item.approval_status === 2
                                                ? "Approved"
                                                : item.approval_status === 3
                                                    ? "Rejected"
                                                    : ""}</TableCell>
                                                    <TableCell>{item.admin_comments}</TableCell>
                                        <TableCell>

                                            {/* <CustomButton text="Details" bgColor="#2e7d32" handleClick={() => { console.log(item) }} /> */}
                                            {/* <Button variant='contained' sx={{ background: "#2e7d32 !important" }} component='a' onClick={()=>sendProps(item)}>Details</Button> */}
                                            {/* <Button variant='contained' sx={{ background: "#2e7d32 !important" }} component='a' onClick={()=>router.push('/Admin/RTRDetails/Rtr')}>Details</Button> */}
                                            <Button variant='contained' sx={{ background: "#2e7d32 !important" }}
                                                onClick={() => {dispatch(existingData(item)); router.push(`/Admin/RTRDetails/${item.user_id}`) }}>Details</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Paper>
            {/* <Footer/> */}
        </>
    )
}

export default FilledRTRDetails





