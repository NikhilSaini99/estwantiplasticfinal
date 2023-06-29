import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, Typography, CircularProgress } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useFetch } from '@/constants/useFetch';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { existingData } from '@/features/RTRformslice';
import { useSession } from 'next-auth/react';
import Footer from '@/components/Footer';
import useLoginCheck from '@/hooks/useLoginCheck';
import { validateRTR } from '@/features/filledRtrCheckSlice';
const date = new Date();
const currentMont = date.getMonth() + 1;
const currentyear = date.getFullYear();

const ShopList = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const user_id = Number(router.query.user_id)
    const [rtrFilledList, setRTRFilledList] = useState([])
    const dispatch = useDispatch()
    const loginStatus = useSelector((state) => state.loginForm)
    const { data: check, fetchAPI } = useFetch('get', `/rtr/list/${loginStatus?.loginuserData?.user_id}`);
    const [adminLoginState, setAdminLoginState] = useState(false)
    const { loginCheck } = useLoginCheck();

    useEffect(() => {
        // userLoginCheck()
        loginCheck()
        fetchAPI();
    }, [fetchAPI, loginStatus])



    useEffect(() => {
        if (check !== null) {
            setRTRFilledList(check.result.list)
            // dispatch(existingData(check.result.list))
            if (rtrFilledList.length > 0) {
                if (rtrFilledList.find((element) => element.month_number === (currentMont - 1) && element.current_year === currentyear)) {
                    dispatch(validateRTR(false))
                }
                else {
                    dispatch(validateRTR(true))
                }
            }
            else {
                dispatch(validateRTR(true))
            }

            
        }
    }, [fetchAPI, check, dispatch])

   

    if (!check) {
        // Render a loading spinner or placeholder until the data is fetched
        return <CircularProgress sx={{ width: '100%', height: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'transparent' }} />;
    }



    return (
        <>

            <Navbar />
            <Paper elevation={20} sx={{ width: '98%', mx: 'auto', my: '5rem', overflowX: 'auto', minHeight: 'calc(100vh - 120px)' }}>
                <Stack spacing={4} direction='column'>
                    <Typography variant='h1' sx={{ width: '95%', margin: '2.55rem auto', fontSize: '3rem', color: '#2C306F', }}>
                        Previous Plastic Returns</Typography>
                    {rtrFilledList.length>0?
                        <TableContainer>
                        <Table sx={{ width: '95%', margin: '0 auto' }}>
                            <TableHead sx={{ ' & th': { px: '5px' } }}>
                                <TableRow sx={{ '&>*': { textAlign: 'center' } }}>
                                    <TableCell >Company Name</TableCell>
                                    <TableCell>TIN</TableCell>
                                    <TableCell>Designation</TableCell>
                                    <TableCell>Email ID</TableCell>
                                    <TableCell>Total Levy Payable</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Approvers Comment</TableCell>
                                    <TableCell>Action</TableCell>
                                    <TableCell>Form Detail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ ' & td': { px: '5px' } }}>
                                {rtrFilledList.map((item, index) => (
                                    <TableRow key={index} sx={{ '&>*': { textAlign: 'center' } }}>
                                        <TableCell>{item.company_name}</TableCell>
                                        <TableCell>{item.tin}</TableCell>
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
                                                onClick={() => { dispatch(existingData(item)); router.push(`/RTR/EditRtr/${item.rtr_id}`) }} disabled={item.approval_status === 1 || item.approval_status === 2}>Edit/Update</Button>
                                        </TableCell>
                                        <TableCell><Button variant='contained' sx={{ background: "#2e7d32 !important" }}
                                            onClick={() => { dispatch(existingData(item)); router.push(`/Admin/RTRDetails/${item.rtr_id}`) }}>View Details</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <Typography variant='h1' sx={{ width: '95%', margin: '2.55rem auto', fontSize: '3rem', color: '#2C306F', textAlign:'center'}}>
                        No plastic return filled as of now.</Typography>
                        } 
                    
                </Stack>
            </Paper>
            <Footer />
        </>
    )
}

export default ShopList


/*   useEffect(() => {
        async function checking() {
            try {
                // const response = await axios({
                //     method: 'get',
                //     url: `${process.env.NEXT_PUBLIC_API_URL}/rtr/list`
                // })
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rtr/list`);

                const data = await response.json();
                setUserList(data.result.list)
            } catch (err) {
                console.log(err)
            }
        }
        checking();

    }, [])
 */