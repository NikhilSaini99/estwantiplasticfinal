import React, { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, InputLabel, Select, FormControl, Button, Stack, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useFetch } from '@/constants/useFetch';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { existingData } from '@/features/RTRformslice';
import { useSession } from 'next-auth/react';
import useLoginCheck from '@/hooks/useLoginCheck';
import Footer from '@/components/Footer';


const date = new Date();
date.setMonth(date.getMonth() - 1);
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const Years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
const eligibleMonthText = month[date.getMonth()];
const eligibleMonthNumber = (date.getMonth() + 1)
const currentyear = date.getFullYear()

const FilledRTRDetails = () => {

    const { data: session, status } = useSession()

    const router = useRouter()
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [userList, setUserList] = useState([])
    const [adminLoginState, setAdminLoginState] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const dispatch = useDispatch()
    const loginStatus = useSelector((state) => state.loginForm)
    const { data: check, loading, fetchAPI } = useFetch('post', '/rtr/list');
    const { loginCheck } = useLoginCheck()

    useEffect(() => {
        loginCheck();
        fetchAPI({ month_text: eligibleMonthText, month_number: eligibleMonthNumber, current_year: currentyear });
    }, [fetchAPI])

    useEffect(() => {
        if (check !== null) {
            setUserList(check.result.list)
        }
    }, [check, dispatch])

    useFetch(() => {
        setAdminLoginState(true)
    }, [loginStatus])


    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value)
    }
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value)
    }

    const handleDateSubmit = (event) => {
        event.preventDefault()
        fetchAPI({ month_text: selectedMonth, month_number: month.indexOf(selectedMonth) + 1, current_year: selectedYear })
    }

    return (
        <>

            <Navbar />
            <Paper elevation={20} sx={{ width: '98%', mx: 'auto', my: '5rem', overflowX: 'auto' }}>
                <Stack spacing={4} direction='column'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }} >
                        <Typography variant='h1' sx={{ margin: '2.55rem auto', fontSize: '3rem', color: '#2C306F', width: '50%', }}>All User Plastic Levy Return List</Typography>
                        <form onSubmit={handleDateSubmit}>
                            <Box sx={{ display: 'flex', width: '50%', gap: '2rem', mx: '2rem' }}>
                                <FormControl sx={{ minWidth: 150 }} variant="standard">
                                    <InputLabel id="selectedMonth">Select Month</InputLabel>
                                    <Select labelId='selectedMonth'
                                        id="month"
                                        value={selectedMonth}
                                        onChange={handleMonthChange}
                                    >
                                        {month.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ minWidth: 150 }} variant="standard">
                                    <InputLabel id="selectedYear">Select Year</InputLabel>
                                    <Select labelId='selectedYear'
                                        id="year"
                                        value={selectedYear}
                                        onChange={handleYearChange}
                                    >
                                        {Years.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button type="submit" variant='contained' sx={{ background: '#2e7d32!important' }}>Find</Button>
                            </Box>

                        </form>


                    </Box>

                    <TableContainer>
                        <Table sx={{ width: '95%', margin: '0 auto' }}>
                            <TableHead sx={{ ' & th': { px: '5px' } }}>
                                <TableRow sx={{ '&>*': { textAlign: 'center' } }}>
                                    <TableCell >Submitted on</TableCell>
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
                                                onClick={() => { dispatch(existingData(item)); router.push(`/Admin/RTRDetails/${item.user_id}`) }}>Details</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Paper>
            <Footer/>
        </>
    )
}

export default FilledRTRDetails





