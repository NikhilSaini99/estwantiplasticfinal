import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({ bgColor,text,type,btnDisable,handleClick, }) => {
    const btnStyling = {
        backgroundColor: `${bgColor} !important`,
        color: 'FEFEFE',
        '&:hover': {
            backgroundColor: `${bgColor}F1 `,
        }
        
    }

    return (
        <Button  type={type} variant='contained' sx={{ ...btnStyling,"&.Mui-disabled": {
            background: `grey !important`,
            color: "white"
          } }}
        disabled={btnDisable}  onClick={handleClick} >{text}</Button>
    )
}

export default CustomButton
