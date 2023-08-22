import { Box, Card, CardContent, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Logo from '../../images/logo.png'
import { Login, Registration } from '@/components'
import { Head } from '@/sections'
import { parse } from 'cookie';
import authMiddleware from '@/middleware'

const Auth = ({ authToken }) => {
    const [switchForm, setSwitchForm] = useState('reg')
    const router = useRouter()

    const handleFormSwitch = (form) => {
        setSwitchForm(form)
    }

    return (
        <>
            <Head title={switchForm === 'reg' ? 'Registration - Task' : 'Login - Task'} />
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
                                        {
                                            switchForm === "reg" ? <Registration handleFormSwitch={handleFormSwitch} /> : <Login handleFormSwitch={handleFormSwitch} />
                                        }
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

export const getServerSideProps = authMiddleware(async (context) => {
    const { req } = context;

    const cookies = parse(req.headers.cookie || '');
    const authToken = cookies['auth-token'] || null

    return {
        props: {
            authToken
        }
    };
});

export default Auth