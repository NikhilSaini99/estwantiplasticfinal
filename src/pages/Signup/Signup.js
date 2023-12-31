import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { signupData } from "@/features/SignupSlice";
import {
  Alert,
  Box,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import CustomTextField from "@/components/CustomTextField";
import CustomButton from "@/components/Button";
import Navbar from "@/components/Navbar";
import { useFetch } from "@/constants/useFetch";
import omit from "lodash/omit";
import { useRouter } from "next/router";
import MathCaptcha from "@/components/MatchCaptcha";
import CloseIcon from "@mui/icons-material/Close";

const Signup = () => {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const {
    data: registerData,
    error,
    errorMessage,
    fetchAPI,
  } = useFetch("post", "/user/ragister");

  const [errorSet, setError] = useState(false);
  const dispatch = useDispatch();
  const signUpFormValue = useSelector((state) => state.SignupForm);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name_of_business: "",
      address: "",
      tin: "",
      first_name: "",
      last_name: "Test",
      designation: "",
      telephone_number: "",
      cell_phone_number: "",
      email_id: "",
      password: "",
      rePassword: "",
      user_type: 2,
    },
  });

  function handleAlertClose(e, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  }

  const password = watch("password");
  const rePassword = watch("rePassword");

  function enableSubmitaftercaptcha() {
    setIsFormSubmitted(true);
  }
  const onsubmit = async (data) => {
    try {
      if (password !== rePassword) {
        setPasswordError(true);
        return;
      }
      setPasswordError(false);

      //removing repassword field in my obj while sending data to redux state and making a new copy without it usingLodash lib
      const newData = omit(data, "rePassword");

      dispatch(signupData({ ...newData, approval_status: 1 })); //Dispatching data to store

      await fetchAPI({ ...newData, approval_status: 1 });

      if (error) {
      const unsuccessful= new Error(
          `${error}: Your Registration is unsuccessful. Please try again later.`
        );
        alert(unsuccessful);
      }

      alert(
        `${errorMessage}: Your Registration request has been submitted. You will receive an email notification once your request is approved by the system admin`
      );
      router.push("/Login/LoginForm");
      reset();
    } catch (error) {
      const err = new Error("User e-mail already Exist");
      alert(err);
    }
  };
  useEffect(() => {
    if (error) {
      alert(errorMessage);
      return;
    }
  }, [errorMessage, error]);

  const formParentStyling = {
    width: { xs: "98%", lg: "80%" },
    margin: "0 auto",
    p: { xs: "0.5rem", lg: "2rem" },
    borderRadius: "20px",
    position: "relative",
    top: "10px",
  };
  return (
    <>
      <Head>
        <title>Eswatini Environment Authority</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      <Box sx={formParentStyling}>
        <Box
          className="grid grid-cols-2 gap-4 bg-white shadow-2xl p-4 rounded-xl absolute  w-full sm:w-3/4 lg:w-full md:p-32 lg:p-12"
          component="form"
          onSubmit={handleSubmit(onsubmit)}
        >
          <Typography
            className="col-span-full"
            variant="h1"
            sx={{
              marginBottom: "2rem",
              fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" },
              color: "#2C306F",
            }}
          >
            Sign Up Now!!
          </Typography>
          <Controller
            control={control}
            name="name_of_business"
            rules={{ required: "BusinessName is required" }}
            render={({ field }) => (
              <CustomTextField
                inputType="text"
                fieldLabel="Enter Business Name"
                field={field}
                errorDetail="name_of_business"
                errors={errors}
              />
            )}
          ></Controller>
          <Controller
            control={control}
            name="address"
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <CustomTextField
                inputType="text"
                fieldLabel="Enter Address"
                field={field}
                errorDetail="address"
                errors={errors}
              />
            )}
          ></Controller>
          <Controller
            control={control}
            name="tin"
            rules={{
              required: "TIN is required",
              minLength: {
                value: 9,
                message: "TIN must be at least 9 digits/characters long",
              },
              maxLength: {
                value: 9,
                message: "TIN must be at most 9 digits/characters long",
              },
            }}
            render={({ field }) => (
              <CustomTextField
                inputType="number"
                fieldLabel="Enter TIN"
                field={field}
                errorDetail="tin"
                errors={errors}
              />
            )}
          ></Controller>
          <Controller
            control={control}
            name="first_name"
            rules={{ required: "PrimaryContact is required" }}
            render={({ field }) => (
              <CustomTextField
                inputType="text"
                fieldLabel="Name of Primary Contact Person"
                field={field}
                errorDetail="first_name"
                errors={errors}
              />
            )}
          ></Controller>
          <Controller
            control={control}
            name="designation"
            rules={{ required: "Designation is required" }}
            render={({ field }) => (
              <CustomTextField
                inputType="text"
                fieldLabel="Enter Designation"
                field={field}
                errorDetail="designation"
                errors={errors}
              />
            )}
          ></Controller>
          <Controller
            control={control}
            name="telephone_number"
            rules={{ required: "TeleNo is required" }}
            render={({ field }) => (
              <CustomTextField
                inputType="number"
                fieldLabel="Enter Telephone Number"
                field={field}
                errorDetail="telephone_number"
                errors={errors}
              />
            )}
          ></Controller>
          <Controller
            control={control}
            name="cell_phone_number"
            rules={{ required: "CellNo is required" }}
            render={({ field }) => (
              <CustomTextField
                inputType="number"
                fieldLabel="Enter Cellphone Number"
                field={field}
                errorDetail="cell_phone_number"
                errors={errors}
              />
            )}
          ></Controller>
          <Controller
            control={control}
            name="email_id"
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <CustomTextField
                inputType="email"
                fieldLabel="Enter Email"
                field={field}
                errorDetail="email_id"
                errors={errors}
              />
            )}
          ></Controller>
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <CustomTextField
                inputType="password"
                fieldLabel="Enter Password"
                field={field}
                errorDetail="password"
                errors={errors}
              />
            )}
          ></Controller>
          <Controller
            control={control}
            name="rePassword"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <>
                <CustomTextField
                  name="repassword"
                  inputType="password"
                  fieldLabel="Re-type Password"
                  field={field}
                  errorDetail="rePassword"
                  errors={errors}
                />
                {passwordError && (
                  <label style={{ color: "red" }}>
                    Passwords do not match. Please try again.
                  </label>
                )}
              </>
            )}
          ></Controller>
          <Box className="col-span-full flex justify-center mt-6">
            <MathCaptcha onSubmit={enableSubmitaftercaptcha} />
          </Box>
          <Box className="col-span-full flex justify-center mt-6">
            <CustomButton
              type="submit"
              text="Submit"
              bgColor="#2C306F"
              btnDisable={!isFormSubmitted}
            />
          </Box>
        </Box>
      </Box>
      {/* <Snackbar
                        
                            open={openAlert}
                            autoHideDuration={2000}
                            onClose={handleAlertClose}
                            action={
                                <IconButton onClick={handleAlertClose}>
                                    <CloseIcon />
                                </IconButton>
                            }
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        >
                            <Alert variant="filled" severity="success" onClose={handleAlertClose}>
                            Your Registration request has been submitted. You will receive an email notification once your request is approved by system admin
                            </Alert>
                        </Snackbar>
           */}
    </>
  );
};

export default Signup;
