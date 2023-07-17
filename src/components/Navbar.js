import React from "react";
import AvatarImg from '../../public/assets/EEA_LOGO.jpg'
import { Stack, Box, IconButton, Drawer, Paper, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from './Navbar.module.css'
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginState } from "@/features/formSlice";
import LogoutBtn from "./LogoutBtn";
import { useRouter } from "next/router";


const date = new Date();
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const eligibleMonthText = month[date.getMonth() - 1];
const eligibleMonthNumber = (date.getMonth() + 1) - 1
const currentyear = date.getFullYear()

const mydate = { month_text: eligibleMonthText, month_number: eligibleMonthNumber, current_year: currentyear }



const Navbar = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [navColor, setNavColor] = useState(false)
  const loginStatus = useSelector((state) => state.loginForm)
  const rtrFromData = useSelector((state) => state.rtrForm)
  const [intialTry, setInitialtry] = useState(false)
  const validRTRstatus = useSelector((state) => state.validateRTR)
  useEffect(() => {
    // setAdminLoginState(true)
  }, [loginStatus])
 

  function changeColor() {
    if (window.scrollY > 100) {
      setNavColor(true)
    }
    else {
      setNavColor(false)
    }
  }

  useEffect(() => {
    changeColor();
    window.addEventListener('scroll', changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    }
  }, [])


  function handleHamburger() {
    setIsOpen(!isOpen);
  }

  const navbtnStyle = {
    color: 'black',
    '&:hover': {
      color: 'white'
    }
  }
  //   if (rtrFilledList.find((element) => element.month_number === (currentMont - 1) && element.current_year === currentyear)) {
  //     console.log("You have already filled plastic levy tax for this month")
  // }
  return (
    <Paper elevation={20} sx={{ zIndex: '999', position: "relative", top: '0', backgroundColor: 'transparent', }}>
      <Stack
        py={1.5}
        sx={{
          width: "100%",
          position: "relative", top: '0',
          flexDirection: { xs: "row", sm: "row", md: "row" },
          ...(navColor ? {
            backgroundColor: '#1f892a',
            transition: "background-color 0.5s ease",
          } : {
            backgroundColor: '#1f892aC5   ',
            transition: 'background-color 0.8s ease-out',
          }),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: { md: "1rem" },
          px: { xs: "2rem", md: "5rem" },
        }}
      >
        <Box
          display="flex"
          sx={{
            "&:hover": {
              color: "#DE3163",
              transition: "color 0.5s",
            },
            cursor: "pointer",
            alignItems: "center",
            gap: { xs: "10px", sm: "20px" },
            py: { xs: "1rem", sm: "0.8rem", md: "0.2rem" },

          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <Image
              src={AvatarImg}
              alt="Profile_image"
              style={{
                width: "100%",
                height: '100%',
                maxWidth: "5rem",
                borderRadius: "50%",
                cursor: 'pointer'
              }}
            />
          </Box>

        </Box>

        <Box fontWeight="bold">
          <ul className={styles.check}>
            {loginStatus.adminLogin && <>
              <Button sx={{ ...navbtnStyle }} onClick={() => router.push('/Admin/ShopList')}>Home</Button>
              <Button sx={{ ...navbtnStyle }} onClick={() => router.push('/Admin/Approveduserlist')}>Approved user list</Button>
              <Button sx={{ ...navbtnStyle }} onClick={() => router.push('/Admin/ShopList')}>Pending User list</Button>
              <Button sx={{ ...navbtnStyle }} onClick={() => router.push({ pathname: '/Admin/FilledRTRDetails', query: mydate })}>Returns Filed</Button>
              <Button sx={{ ...navbtnStyle }} onClick={() => { router.push('/Login/LoginForm'); dispatch(updateLoginState({ adminLogin: false, userLogin: false })) }}>Sign Out</Button></>}

            {loginStatus.userLogin &&
              <>
                <Button sx={{ ...navbtnStyle }} onClick={() => router.push(`/RTR/UserRTRlist?user_id=${loginStatus.loginuserData.user_id}`)}>Home</Button>
                <Button sx={{ ...navbtnStyle }}
                  onClick={() => {
                    if (!validRTRstatus) {
                      alert("Plastic levy for this month is already filled")
                    }
                    else {
                      router.push('/RTR/RTRform');
                    }
                  }}>
                  File Return</Button>
                <Button sx={{ ...navbtnStyle }} onClick={() => { dispatch(updateLoginState({ adminLogin: false, userLogin: false })); router.push('/Login/LoginForm') }}>Sign Out</Button>
              </>}


          </ul>
          <Button sx={{ display: "none", color: 'black' }}
            onClick={handleHamburger}
            className={styles.hamburger}
            type="button"
            aria-label="menu"
            endIcon={<MenuIcon sx={{ fontSize: "12rem !important" }} />}></Button>

        </Box>
        <Drawer
          anchor="right"
          open={isOpen}
          variant="temporary"
          onClose={handleHamburger}
          className={styles.drawer}
          BackdropProps={{
            style: { backgroundColor: "transparent", opacity: 2 },
          }}
          PaperProps={{
            elevation: 5,
            sx: {
              paddingTop: "20px",
              // height: 320,
              width: "100%",
              backgroundColor: "#E9F1FA",
            },
          }}
        >

          <Box fontWeight="bold">
            <ul>
              {loginStatus.adminLogin && <><Link href={`/Admin/ShopList`}>Home</Link><Link href={'/Signup/Signup'}>Registration Form</Link>

                <Link href="/Login/LoginForm" onClick={() => dispatch(updateLoginState({ adminLogin: false, userLogin: false }))}>Sign Out</Link></>}

              {loginStatus.userLogin && <><Link href={`/RTR/UserRTRlist?user_id=${loginStatus.loginuserData.user_id}`}>Home</Link> <Link href={'/RTR/RTRform'}>File Return</Link>

                <Link href="/Login/LoginForm" onClick={() => dispatch(updateLoginState({ adminLogin: false, userLogin: false }))}>Sign Out</Link>

              </>}

            </ul>

            <IconButton
              onClick={handleHamburger}
              display="flex"
              sx={{ width: "100%", marginTop: "2.5rem" }}
              role="button"
            >

              <CloseIcon
                sx={{
                  fontSize: "2rem",
                  color: "black",
                  borderRadius: "50px",
                }}
              />
            </IconButton>
          </Box>
        </Drawer>
      </Stack>
    </Paper>
  );
};
export default Navbar;
