import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { handleUserLogin } from '@/redux/action/userActions';

const Login = ({ handleFormSwitch, isAdmin }) => {
    const { message, error, user } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const router = useRouter()
    const schema = yup.object().shape({
        email: yup.string().email('Invalid email.').required('Email is required.'),
        password: yup.string().min(8, 'Password must have minimum 8 characters.').max(12, 'Password must have maximum 12 characters.'),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        dispatch(handleUserLogin(data))
    }

    useEffect(() => {
        if (error && message !== "" && user === null) {
            toast.error(message)
        } else if (!error && message !== "" && user !== null) {
            reset()
            toast.success(message)
            router.push('/')
        }
    }, [error, message, user])

    return (
        <>
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box mb={2}>
                        <TextField type='email' variant='outlined' label="Email" name="email" fullWidth {...register('email')} />
                        {
                            errors && errors.email && errors.email.message ? <Typography className='text-danger'>{errors.email.message}</Typography> : null
                        }
                    </Box>
                    <Box mb={2}>
                        <TextField type='password' variant='outlined' label="Password" name="password" fullWidth {...register('password')} />
                        {
                            errors && errors.password && errors.password.message ? <Typography className='text-danger'>{errors.password.message}</Typography> : null
                        }
                    </Box>
                    <Box mb={2}>
                        <Button type='submit' fullWidth className="primary-button">Log In</Button>
                    </Box>
                    <Box>
                        <Button variant='link text-primary' onClick={() => handleFormSwitch('reg')}>Create an account.</Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default Login