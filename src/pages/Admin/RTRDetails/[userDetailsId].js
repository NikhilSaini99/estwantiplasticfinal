import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm, Controller, useWatch } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Box, Table, TableBody, Dialog, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Slide, Button, Stack, InputLabel } from '@mui/material';
import Navbar from '@/components/Navbar';
import CustomTextField from '@/components/CustomTextField';
import CustomButton from '@/components/Button';
import dayjs from 'dayjs';
import { useFetch } from '@/constants/useFetch';
import Footer from '@/components/Footer';
import useLoginCheck from '@/hooks/useLoginCheck';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserDetails = () => {

    const RTRformData = useSelector((state) => state.rtrForm);
    const loggedinState = useSelector((state) => state.loginForm)
    const { data: formdata, fetchAPI } = useFetch('put', `/rtr/update_rtr_status/${RTRformData.rtr_id}`)
    const [openAccept, setOpenAccept] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const router = useRouter()
    const userDetails = router.query;
    const formRef = useRef(null);
    const { loginCheck } = useLoginCheck()

    useEffect(() => {
        loginCheck()
    }, [])
    const { handleSubmit, control, watch, formState: { errors } } = useForm({

        defaultValues: {
            dateFrom: dayjs(RTRformData.from_date),
            dateTo: dayjs(RTRformData.to),
            companyName: RTRformData.company_name,
            tin: RTRformData.tin,
            email: RTRformData.email_id,
            cellPhone: RTRformData.cell_phone_number,
            designation: RTRformData.designation,
            fullName: RTRformData.first_name,
            admin_comments: "",
            approval_status: RTRformData.approval_status,
            total_levy_payable: RTRformData.total_levy_payable
        }
    })


    const onsubmit = async (data) => {
        fetchAPI({
            email_id: RTRformData.email_id, admin_comments: data.admin_comments,
            approval_status: 2
        })

        setOpenAccept(false);
        setOpenReject(false);
        router.push('/Admin/FilledRTRDetails')
    }

    const onsubmit2 = async (data) => {
     
        fetchAPI({
            email_id: RTRformData.email_id, admin_comments: data.admin_comments,
            approval_status: 3
        })
        setOpenAccept(false);
        setOpenReject(false);
        router.push('/Admin/FilledRTRDetails')
    }


    const formParentStyling = {
        width: { xs: '98%', md: '98%', lg: '98%' },
        margin: '0 auto',
        p: { xs: '0.5rem', lg: '2rem' },
        borderRadius: '20px',
        position: 'relative',
        top: '0',
        minHeight: {
            xs: '100vh',
            mt: '15rem'
        }
    }

    const btnsStyling = {
        width: '10rem', p: '1rem',
        background: '#1F892A'
    }

    //Comment Opener
    const handleClickOpenAccept = () => {
        setOpenAccept(true);
    };
    const handleClickOpenReject = () => {
        setOpenReject(true);
    };

    const sendCommentandClose = () => {
        setOpenAccept(false);
    };
    const sendCommentandClose2 = () => {
        setOpenReject(false);
    };


    const disabledTextFieldStyling = { style: { fontWeight: 'bold' } }

    return (
        <>
            <Navbar />
            <Box sx={{ ...formParentStyling }}>
                <Box component='form' className='grid grid-cols-2 gap-4 bg-white shadow-2xl p-4 rounded-xl mt-24'
                // onSubmit={handleSubmit(onsubmit)}
                >
                    <Typography className='col-span-full' variant='h1' sx={{ marginBottom: "2rem", fontSize: { xs: '1.5rem', md: '2rem', lg: '3rem' }, color: '#2C306F' }}>
                        Plastic Return Filing - {RTRformData.month_text}{" "}{RTRformData.current_year}
                    </Typography>



                    <Controller
                        control={control}
                        name="companyName"
                        rules={{ required: 'Name of the Company is required' }}
                        render={({ field }) => <CustomTextField field={field} inputType='text'
                            fieldLabel='Company Name' errorDetail='companyName' errors={errors}
                            disabled={true} inputpropStyling={disabledTextFieldStyling}
                        />}
                    />

                    <Controller
                        control={control}
                        name="tin"
                        rules={{ required: 'TIN is required' }}
                        render={({ field }) => <CustomTextField field={field} inputType='text'
                            fieldLabel='TIN' errorDetail='tin' errors={errors} disabled={true}
                            inputpropStyling={disabledTextFieldStyling}
                        />}
                    />

                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: 'Email Address is required' }}
                        render={({ field }) => <CustomTextField field={field} inputType='email'
                            fieldLabel='Email ID' errorDetail='email' errors={errors} disabled={true}
                            inputpropStyling={disabledTextFieldStyling}
                        />}
                    />

                    <Controller
                        control={control}
                        name="cellPhone"
                        rules={{ required: 'Cell Phone Number is required' }}
                        render={({ field }) => <CustomTextField field={field} inputType='number'
                            fieldLabel='Cell Phone Number' errorDetail='cellPhone' errors={errors} disabled={true}
                            inputpropStyling={disabledTextFieldStyling}
                        />}
                    />
                    <Box className='col-span-full'>
                        <TableContainer >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Opening Stock (Qty)</TableCell>
                                        <TableCell>Purchases(+) (Qty)</TableCell>
                                        <TableCell>Sales(-) (Qty)</TableCell>
                                        <TableCell>Rate</TableCell>
                                        <TableCell>Levy(E)</TableCell>
                                        <TableCell>Closing Stock
                                            <br></br>(OP + P – S) (Qty)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>+30 microns plastics</TableCell>
                                        <TableCell>
                                            <TextField type="number" sx={{ fontWeight: 'bold' }} value={RTRformData.pmp_opening_stock} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.pmp_purchases} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.pmp_sales} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.pmp_rate} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.pmp_levy} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.pmp_closing_stock} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>-30 microns plastics</TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.mmp_opening_stock} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.mmp_purchases
                                            } disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.mmp_sales} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.mmp_rate} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.mmp_levy} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.mmp_closing_stock} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Refuse bags</TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.refuse_bags_opening_stock
                                            } disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.refuse_bags_purchases} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.refuse_bags_sales} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.refuse_bags_rate
                                            } disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.refuse_bags_levy} disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField type="number" value={RTRformData.refuse_bags_closing_stock
                                            } disabled inputProps={disabledTextFieldStyling} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box className="col-span-full flex flex-col gap-4 justify-center items-center my-6">
                            <Box className="flex justify-center items-center gap-4">

                                <Typography variant="body1" sx={{ fontWeight: "bold" }} >TOTAL LEVY PAYABLE</Typography>
                                <Controller
                                    control={control}
                                    name="total_levy_payable"
                                    render={({ field }) => (
                                        <TextField type="number" {...field} variant='outlined' disabled={true} size='small' sx={{ width: '20%', textAlign: 'center' }} inputProps={{ ...disabledTextFieldStyling }} />
                                    )}
                                />
                            </Box>

                        </Box>
                    </Box>

                    <Controller
                        control={control}
                        name="fullName"
                        rules={{ required: 'FullName is required' }}
                        render={({ field }) => <CustomTextField field={field} inputType='text'
                            fieldLabel='Full Name' errorDetail='fullName' errors={errors} disabled={true} inputpropStyling={disabledTextFieldStyling}
                        />}
                    />
                    <Controller
                        control={control}
                        name="designation"
                        rules={{ required: 'Desgination is required' }}
                        render={({ field }) => <CustomTextField field={field} inputType='text'
                            fieldLabel='Desgination' errorDetail='designation' errors={errors} disabled={true} inputpropStyling={disabledTextFieldStyling}
                        />}
                    />

                    <Box className="flex col-span-full w-full justify-center flex-col">
                        <Typography variant='body1' sx={{ fontSize: { xs: '1rem', md: '1.2rem', lg: '1.5rem' } }}>Admin Comments</Typography>
                        <TextField multiline={true} rows={4} defaultValue={RTRformData.admin_comments} inputProps={disabledTextFieldStyling} disabled />
                    </Box>



                    {loggedinState.adminLogin ? RTRformData.approval_status === 1 ? <Box className="col-span-full gap-4 flex justify-center"  >
                        <CustomButton text='Accept' bgColor='green' handleClick={handleClickOpenAccept}
                        />
                        <CustomButton text='Reject' bgColor='red' handleClick={handleClickOpenReject}
                        />
                    </Box> : null : null}

                    <Dialog
                        open={openAccept}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={sendCommentandClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <Typography variant='h4' sx={{ fontSize: '1.2rem', background: '#1F892A', p: '2rem', color: 'white', textAlign: 'center' }}>Are you sure you want to accept this return?</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '550px', p: '2rem', gap: '2rem', alignItems: 'center' }}>

                            <Controller control={control}
                                name="admin_comments"
                                render={({ field }) => <TextField multiline={true} fullWidth inputProps={{ style: { height: '150px' } }} {...field} placeholder='Add comments' />}>
                            </Controller>

                            <Stack spacing={2} direction='row' justifyContent='flex-end'>
                                <Button onClick={sendCommentandClose} type="submit" variant='contained' sx={btnsStyling}>Cancel</Button>
                                <Button onClick={handleSubmit(onsubmit)} type="submit" variant='contained' sx={btnsStyling}>Approve</Button>
                            </Stack>
                        </Box>

                    </Dialog>
                    <Dialog
                        open={openReject}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={sendCommentandClose2}
                        aria-describedby="alert-dialog-slide-description"

                    >
                        <Typography variant='h4' sx={{ fontSize: '1.2rem', background: '#ff0000', p: '2rem', color: 'white', textAlign: 'center' }}>Are you sure you want to reject this return?</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '550px', p: '2rem', gap: '2rem', alignItems: 'center' }}>
                            <Controller control={control}
                                name="admin_comments"
                                render={({ field }) => <TextField multiline={true} fullWidth inputProps={{ style: { height: '150px' } }} {...field} placeholder='Add comments' />}>
                            </Controller>
                            <Stack spacing={2} direction='row' justifyContent='flex-end'>
                                <Button onClick={sendCommentandClose2} type="submit" variant='contained' sx={{ ...btnsStyling, background: '#ff0000' }}>Cancel</Button>
                                <Button onClick={handleSubmit(onsubmit2)} type="submit" variant='contained' sx={{ ...btnsStyling, background: '#ff0000' }}>Reject</Button>
                            </Stack>
                        </Box>

                    </Dialog>
                </Box>
            </Box>

            <Footer />

        </>
    )
}

export default UserDetails
