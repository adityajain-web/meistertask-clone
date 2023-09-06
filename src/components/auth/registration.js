import React, { useEffect } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/redux/action/userActions';

const Register = ({ handleFormSwitch, isAdmin }) => {
    const dispatch = useDispatch()
    const { message, error, user } = useSelector(state => state.userReducer)

    const schema = yup.object().shape({
        firstname: yup.string().required('First name is required.'),
        lastname: yup.string().required('Last name is required.'),
        email: yup.string().email('Invalid email.').required('Email is required.'),
        password: yup.string().min(8, 'Password must have minimum 8 characters.').max(12, 'Password must have maximum 12 characters.'),
        cPass: yup.string().oneOf([yup.ref('password'), null], 'Confirm password must be same as password.').required('Confirm password is required.')
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        if (isAdmin) {
            const newData = { ...data, isAdmin: true }
            dispatch(registerUser(newData))
        } else {
            dispatch(registerUser(data))
        }
    }

    useEffect(() => {
        if (error && message !== '' && user === null) {
            toast.error(message)
        } else if (!error && message !== '' && user !== null) {
            toast.success(message)
            reset()
            handleFormSwitch('login')
        }
    }, [error, message])

    return (
        <>
            <Box>
                <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                    <Box mb={2}>
                        <TextField type='text' variant='outlined' label="First Name" name="firstname" fullWidth {...register('firstname')} />
                        {
                            errors && errors.firstname && errors.firstname.message ? <Typography className='text-danger'>{errors.firstname.message}</Typography> : null
                        }
                    </Box>
                    <Box mb={2}>
                        <TextField type='text' variant='outlined' label="Last Name" name="lastname" fullWidth {...register('lastname')} />
                        {
                            errors && errors.lastname && errors.lastname.message ? <Typography className='text-danger'>{errors.lastname.message}</Typography> : null
                        }
                    </Box>
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
                        <TextField type='password' variant='outlined' label="Confirm Password" name="cPass" fullWidth {...register('cPass')} />
                        {
                            errors && errors.cPass && errors.cPass.message ? <Typography className='text-danger'>{errors.cPass.message}</Typography> : null
                        }
                    </Box>
                    <Box mb={2}>
                        <Button type='submit' fullWidth className="primary-button">Sign Up</Button>
                    </Box>
                    <Box>
                        <Button variant='link text-primary' onClick={() => handleFormSwitch('login')}>Already have an account? Log In</Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default Register