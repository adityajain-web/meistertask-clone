import React, { useEffect, useState } from 'react'
import { Head } from '@/sections'
import { Box, Card, CardContent, Container, Grid } from '@mui/material'
import { Login, Registration } from '@/components'
import Logo from '../../images/logo.png'


const admin = () => {
    const [switchForm, setSwitchForm] = useState('reg')

    const handleFormSwitch = (form) => {
        setSwitchForm(form)
    }
    return (
        <>
            <Head title={switchForm === 'reg' ? 'Admin - Registration | Task' : 'Admin - Login | Task'} />
            <section className='bg--secondary' id="auth">
                <Container maxWidth="xxl" className='authContainer'>
                    <Grid container spacing={2} sx={{ height: "100%" }}>
                        <Grid item xs={12} sm={6} lg={4} className='d-flex justify-content-center align-items-center'>
                            <Card className='bg--muted' style={{ width: '90%' }}>
                                <CardContent>
                                    <Box>
                                        <Box mb={2} className="d-flex justify-content-center align-items-center">
                                            <img src={Logo.src} className='img-fluid auth-logo' />
                                        </Box>
                                        <Box>
                                            {
                                                switchForm === "reg" ? <Registration handleFormSwitch={handleFormSwitch} isAdmin={true} /> : <Login handleFormSwitch={handleFormSwitch} isAdmin={true} />
                                            }
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={8} className='d-none d-sm-block'>
                            <Box className="video-background">
                                <video autoPlay loop>
                                    <source src="/videos/authBg.mp4" type="video/mp4" />
                                </video>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </>
    )
}

export default admin