import React, { useState, useEffect } from 'react'
import { useForm, Controller, useController } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { rtrData } from '@/features/RTRformslice';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Box, Typography, } from '@mui/material';
import CustomButton from '@/components/Button';
import CustomTextField from '@/components/CustomTextField';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Navbar from '@/components/Navbar';
import { useFetch } from '@/constants/useFetch';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import useLoginCheck from '@/hooks/useLoginCheck';


const date = new Date();
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const eligibleMonthText = month[date.getMonth() - 1];
const eligibleMonthNumber = (date.getMonth() + 1) - 1
const currentyear = date.getFullYear()

const RTRform = () => {
  const { loginCheck } = useLoginCheck();
  const router = useRouter()
  const { data: rtrFormData, fetchAPI } = useFetch('post', '/rtr/create')
  const loggedInuserData = useSelector((state) => state.loginForm);
  const dispatch = useDispatch()
  const RTRformData = useSelector((state) => state.rtrForm);
  const [handleCheck, sethandleCheck] = useState(false)
  const [salesLessEqual, setSalesLessEqual] = useState('')
  const [totalLevyPayable, setTotalLevyPayable] = useState(0);
  const [selectedDates, setSelectedDates] = useState({
    from: null,
    to: null
  })

  useEffect(() => {
    loginCheck()
  }, [loggedInuserData])

  // console.log(loggedInuserData)

  const { handleSubmit, reset, setValue, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      user_id: loggedInuserData?.loginuserData?.user_id,
      from_date: dayjs('2023-06-13'),
      to_date: dayjs('2023-05-13'),
      company_name: loggedInuserData?.loginuserData?.name_of_business,
      address: '',
      tin: loggedInuserData?.loginuserData?.tin,
      first_name: loggedInuserData?.loginuserData?.first_name,
      last_name: '',
      designation: loggedInuserData?.loginuserData?.designation,
      telephone_number: '',
      cell_phone_number: loggedInuserData?.loginuserData?.cell_phone_number,
      email_id: loggedInuserData?.loginuserData?.email_id,
      pmp_opening_stock: 0,
      pmp_purchases: 0,
      pmp_sales: 0,
      pmp_rate: 0.35,
      pmp_levy: 0,
      pmp_closing_stock: 0,
      mmp_opening_stock: 0,
      mmp_purchases: 0,
      mmp_sales: 0,
      mmp_rate: 0.20,
      mmp_levy: 0,
      mmp_closing_stock: 0,
      refuse_bags_opening_stock: 0,
      refuse_bags_purchases: 0,
      refuse_bags_sales: 0,
      refuse_bags_rate: 0.35,
      refuse_bags_levy: 0,
      refuse_bags_closing_stock: 0,
      total_levy_payable: 0,
      approval_status: 1,
      created_at: date,
      month_text: eligibleMonthText,
      month_number: eligibleMonthNumber,
      current_year: currentyear

    }
  })
  const data = watch();

  const calculateLevyAndClosingStock = () => {
    setSalesLessEqual(false)
    // Get form data

    // Calculate Levy (E) and Closing Stock for each product
    const pmpLevy = (+data.pmp_sales * +data.pmp_rate).toFixed(2);
    const mmpLevy = (+data.mmp_sales * +data.mmp_rate).toFixed(2);
    const refuseBagsLevy = (+data.refuse_bags_sales * +data.refuse_bags_rate).toFixed(2);

    const pmpClosingStock = Number(+data.pmp_opening_stock + +data.pmp_purchases) - data.pmp_sales

    const mmpClosingStock = Number(+data.mmp_opening_stock + +data.mmp_purchases) - data.mmp_sales
    const refuseBagsClosingStock =
      Number(+data.refuse_bags_opening_stock + +data.refuse_bags_purchases) - data.refuse_bags_sales



    //checking if sum of OS+Purchases >= sales
    const pmp_os_plus_purchases = Number(+data.pmp_opening_stock + +data.pmp_purchases);
    const mmp_os_plus_purchases = Number(+data.mmp_opening_stock + +data.mmp_purchases);
    const levy_os_plus_purchases = Number(+data.refuse_bags_opening_stock + +data.refuse_bags_purchases);
    

    if (pmp_os_plus_purchases >= data.pmp_sales && mmp_os_plus_purchases >= data.mmp_sales && levy_os_plus_purchases >= data.refuse_bags_sales) {
      setSalesLessEqual(true)
    }

    else {
      setSalesLessEqual(false)
      if (!salesLessEqual) {
        alert("Your sales should not be greator than your Opening Stock plus Purchases");
        return;
      }
    }




    // Set the calculated values in the form
    setValue('pmp_levy', pmpLevy);
    setValue('pmp_closing_stock', pmpClosingStock);
    setValue('mmp_levy', mmpLevy);
    setValue('mmp_closing_stock', mmpClosingStock);
    setValue('refuse_bags_levy', refuseBagsLevy);
    setValue('refuse_bags_closing_stock', refuseBagsClosingStock);

    // Calculate and set the Total Levy Payable
    const totalLevyPayable = (+pmpLevy + +mmpLevy + +refuseBagsLevy).toFixed(2);
    setValue('total_levy_payable', totalLevyPayable)



  };


  const disabledTextFieldStyling = { style: { fontWeight: 'bold' } }

  const onsubmit = (data) => {
  
    const watchedData = watch();
    if (!(data.pmp_closing_stock>=0&&data.mmp_closing_stock>=0&&data.refuse_bags_closing_stock>=0)) {
      alert("Your sales should not be greator than your Opening Stock plus Purchases");
      reset();
      return;
    }

    // console.log('default values', data)
    const from = watchedData.from_date ? watchedData.from_date.toISOString() : null;
    const to = watchedData.to_date ? watchedData.to_date.toISOString() : null;

    setSelectedDates({
      from: from,
      to: to
    });

    dispatch(rtrData({
      ...data, from_date: from, to_date: to
    }));
    fetchAPI({
      ...data, from_date: from, to_date: to
    })
    reset();
    setTotalLevyPayable(0)
    alert("Plastic Return Submitted Successfully")
    router.push({
      pathname: '/RTR/UserRTRlist',
      query: { user_id: loggedInuserData?.loginuserData?.user_id }
    },
      undefined,
      { shallow: true })
    //hiding query parameters from the URL using above
  }

  // console.log(RTRformData)
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


  function handleCheckChange(e) {
    sethandleCheck(!handleCheck);
  }

  const headingStyling = {
    marginBottom: "2rem", fontSize: { xs: '1.5rem', md: '2rem', lg: '3rem' }, color: '#2C306F'
  }


  //checking if user logged in or not if not redirected to login page
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  // useEffect(() => {
  //     if (!isLoggedIn) {
  //         router.replace('/Login/LoginForm')
  //     }
  // }, [isLoggedIn, router])

  return (
    <>
      <Navbar />
      <Box sx={{ ...formParentStyling }}>
        <Box component='form' className='grid grid-cols-2 gap-4 bg-white shadow-2xl p-4 rounded-xl my-12'
          onSubmit={handleSubmit(onsubmit)}>
          <Typography className='col-span-full' variant='h1' sx={{ ...headingStyling }}>
            Plastic Return Filing - {month[date.getMonth() - 1]}{" "}{currentyear}
          </Typography>

          {/* <Typography className='col-span-full' variant='h1' sx={{ ...headingStyling, fontSize: { lg: '2rem' }, fontWeight: 'inherit' }}>
            You are eligible to fill plastic return filing for the month of <Typography variant='body1' sx={{ ...headingStyling, display: 'inline', color: '#268121', fontWeight: '600' }}></Typography>
          </Typography> */}

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              control={control}
              name="from_date"
              rules={{ required: 'Date is required' }}
              render={({ field }) => <DatePicker label="From" slotProps={{ textField: { variant: 'outlined'} }}
                // onChange={(date) => setfromDate(date.toISOString())}
                {...field} />}
            >
            </Controller>

            <Controller
              control={control}
              name="to_date"
              rules={{ required: 'Date is required' }}
              render={({ field }) => <DatePicker label="To" slotProps={{ textField: { variant: 'outlined', } }}
                // onChange={(date) => settoDate(date.toISOString())}
                {...field} />}
            >
            </Controller>
          </LocalizationProvider> */}

          <Controller
            control={control}
            name="company_name"

            rules={{ required: 'Name of the Company is required' }}
            render={({ field }) => <CustomTextField field={field} inputType='text'
              fieldLabel='Company Name' errorDetail='companyName' errors={errors} disabled={true} inputpropStyling={disabledTextFieldStyling}
            />}
          />



          <Controller
            control={control}
            name="tin"
            rules={{ required: 'TIN is required' }}
            render={({ field }) => <CustomTextField field={field} inputType='text' disabled={true} inputpropStyling={disabledTextFieldStyling}
              fieldLabel='TIN' errorDetail='tin' errors={errors}
            />}
          />



          <Controller
            control={control}
            name="email_id"
            rules={{ required: 'Email Address is required' }}
            render={({ field }) => <CustomTextField field={field} inputType='email' disabled={true} inputpropStyling={disabledTextFieldStyling}
              fieldLabel='Email ID' errorDetail='email' errors={errors}
            />}
          />



          <Controller
            control={control}
            name="cell_phone_number"
            rules={{ required: 'Cell Phone Number is required' }}
            render={({ field }) => <CustomTextField field={field} inputType='number' disabled={true} inputpropStyling={disabledTextFieldStyling}
              fieldLabel='Cell Phone Number' errorDetail='cellPhone' errors={errors}
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
                      <Controller
                        control={control}
                        // rules={{ validate: validateNonNegative }}
                        name="pmp_opening_stock"
                        render={({ field }) => (
                          <TextField type="number" {...field}
                            error={!!errors.pmp_opening_stock}
                            helperText={errors.pmp_opening_stock?.message} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}


                        name="pmp_purchases"
                        render={({ field }) => (
                          <TextField type="number" {...field}
                            error={!!errors.pmp_purchases}
                            helperText={errors.pmp_purchases?.message} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="pmp_sales"
                        render={({ field }) => (
                          <TextField type="number" {...field}
                            error={!!errors.pmp_sales}
                            helperText={errors.pmp_sales?.message} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField type="number" value='0.35' disabled inputProps={disabledTextFieldStyling} />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="pmp_levy"

                        render={({ field }) => (
                          <TextField type="number" {...field} disabled={true} inputProps={disabledTextFieldStyling} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="pmp_closing_stock"
                        render={({ field }) => (
                          <TextField type="number" {...field} disabled={true} inputProps={disabledTextFieldStyling} />
                        )}
                      />

                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>-30 microns plastics</TableCell>
                    <TableCell>
                      <Controller
                        control={control}

                        name="mmp_opening_stock"
                        render={({ field }) => (
                          <TextField type="number" {...field}
                            error={!!errors.mmp_opening_stock}
                            helperText={errors.mmp_opening_stock?.message} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="mmp_purchases"
                        render={({ field }) => (
                          <TextField type="number" {...field}
                            error={!!errors.mmp_purchases}
                            helperText={errors.mmp_purchases?.message} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}

                        name="mmp_sales"
                        render={({ field }) => (
                          <TextField type="number" {...field}
                            error={!!errors.mmp_sales}
                            helperText={errors.mmp_sales?.message} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField type="number" value='0.20' disabled inputProps={disabledTextFieldStyling} />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="mmp_levy"

                        render={({ field }) => (
                          <TextField type="number" {...field} disabled={true} inputProps={disabledTextFieldStyling} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="mmp_closing_stock"

                        render={({ field }) => (
                          <TextField type="number" {...field} disabled={true} inputProps={disabledTextFieldStyling} />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Refuse bags</TableCell>
                    <TableCell>
                      <Controller
                        control={control}

                        name="refuse_bags_opening_stock"
                        render={({ field }) => (
                          <TextField type="number" {...field}
                            error={!!errors.refuse_bags_opening_stock}
                            helperText={errors.refuse_bags_opening_stock?.message} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}

                        name="refuse_bags_purchases"
                        render={({ field }) => (
                          <TextField type="number" {...field}
                            error={!!errors.refuse_bags_purchases}
                            helperText={errors.refuse_bags_purchases?.message} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}

                        name="refuse_bags_sales"
                        render={({ field }) => (
                          <TextField type="number" {...field}
                            error={!!errors.refuse_bags_sales}
                            helperText={errors.refuse_bags_sales?.message} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField type="text" value='0.35' disabled inputProps={disabledTextFieldStyling} />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="refuse_bags_levy"

                        render={({ field }) => (
                          <TextField type="number" {...field} disabled={true} inputProps={disabledTextFieldStyling} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="refuse_bags_closing_stock"

                        render={({ field }) => (
                          <TextField type="number" {...field} disabled={true} inputProps={disabledTextFieldStyling} />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box className="col-span-full flex flex-col gap-4 justify-center items-center my-6">
              <Box className="flex justify-center items-center gap-4">
                <Typography variant="body1" sx={{ fontWeight: "bold" }} > TOTAL LEVY PAYABLE</Typography>
                <Controller
                  control={control}
                  name="total_levy_payable"
                  render={({ field }) => (
                    <TextField type="number" {...field} variant='outlined' disabled={true} sx={{ textAlign: 'center' }} inputProps={{ ...disabledTextFieldStyling }} />
                  )}
                />
              </Box>
              <CustomButton text="Calculate" bgColor='#1f892a' handleClick={calculateLevyAndClosingStock} />
            </Box>


          </Box>

          <Controller
            control={control}
            name="first_name"
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




          <FormGroup className="col-span-full flex justify-center">
            <FormControlLabel sx={{
              "& .MuiFormControlLabel-label": {
                color: 'black !important',
                fontWeight: 'bold'
              }
            }} required control={<Checkbox

              checked={handleCheck}
              onChange={handleCheckChange}
            />} label="Certified to the best of my knowledge as true, correct, and complete" />
          </FormGroup>

          <Box className="col-span-full flex justify-center">
            <CustomButton text='Submit' bgColor='#1f892a' type='submit'
              btnDisable={!handleCheck}
            />
          </Box>

        </Box>
      </Box>


      <Footer />

    </>
  )
}

export default RTRform
