import { Box, Paper } from '@mui/material'
import React from 'react'
import backgroundImg from '../../public/assets/background1.png'
import Image from 'next/image'

const Card = ({ children }) => {
    const newBoxStyle = {
        display: 'flex',
        gap: { xs: '2rem', md: '4rem', lg: '12rem' },
        justifyContent: 'space-between',
    }

    return (

        <Box sx={{ ...newBoxStyle }}>
            <Box sx={{ margin: '0 auto' }}>{children}</Box>
            <div className='hidden md:block'>
                <Image src={backgroundImg} alt='backgroundImg'
                    width={0}
                    height={0}
                    style={{
                        width: "100%", height: "100%",
                        objectFit: 'cover'
                    }}
                />
            </div>
        </Box>

    )
}

export default Card
