import { TextField } from '@mui/material'
import React from 'react'

const CustomTextField = ({ row , inputType, fieldLabel, field, errorDetail, errors, disabled, inputpropStyling, variant,multiline }) => {
    return (
        <TextField fullWidth row={row} multiline={multiline}
           InputLabelProps={{
            style: {
                color: '#2C306F',
            }
        }}
            InputProps={{
                style: {
                    background: 'white'
                }
            }}

            inputProps={inputpropStyling}
            
            sx={{ borderRadius: '5px', }}
            variant={variant ? variant : 'outlined'}
            autoComplete="on"
            type={inputType} label={fieldLabel} error={!!errors[errorDetail]} helperText={errors[errorDetail]?.message}
            disabled={disabled}
            {...field} />
    )
}

export default CustomTextField
