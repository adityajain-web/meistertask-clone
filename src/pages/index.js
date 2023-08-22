import React, { useEffect, useState } from 'react'
import { parse } from 'cookie';
import { useRouter } from 'next/router';
import authMiddleware from '@/middleware';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetDataFromToken, handleGetUserData } from '@/redux/action/userActions';
import { Layout } from '@/components';
import { Box, Button, Container, Dialog, DialogContent, TextField, Typography } from '@mui/material';
import { handleAddDashColumn } from '@/redux/action/dashboardAction';


const index = ({ authToken }) => {
  const [listName, setListName] = useState("")
  const { decodedToken } = useSelector(state => state.authTokenReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    if (authToken) {
      dispatch(handleGetDataFromToken(authToken))
    }
  }, [authToken])

  useEffect(() => {
    if (decodedToken && Object.keys(decodedToken).length > 0 && decodedToken.id) {
      dispatch(handleGetUserData(decodedToken.id))
    }
  }, [authToken, decodedToken])

  const handleAddColumn = (e) => {
    e.preventDefault()
    dispatch(handleAddDashColumn(listName))
  }

  return (
    <>
      <Layout />
      <section className='dashboard-main'>
        <Container maxWidth="xxl" className='dashboard-container'>

        </Container>
      </section>
      <Dialog maxWidth="xs" fullWidth open={true}>
        <DialogContent>
          <Typography variant='h4'>Edit Board</Typography>
          <Box mt={2}>
            <form onSubmit={handleAddColumn}>
              <Box mb={2}>
                <TextField variant='outlined' label="List Name" name="listName" fullWidth value={listName} onChange={(e) => setListName(e.target.value)} required />
              </Box>
              <Box>
                <Button type='submit' variant='contained' className='primary-button' fullWidth size='large' >Add</Button>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
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

export default index