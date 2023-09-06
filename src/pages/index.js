import React, { useEffect, useState } from 'react'
import { parse } from 'cookie';
import authMiddleware from '@/middleware';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetDataFromToken, handleGetUserData } from '@/redux/action/userActions';
import { Board, Column, EditDashboardModal, Layout } from '@/components';
import { Box, Container } from '@mui/material';
import { Head } from '@/sections';


const index = ({ authToken }) => {
  const [openEditDashboardModal, setOpenEditDashboardModal] = useState(false)
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

  const handleOpenEditDashboard = (o) => {
    setOpenEditDashboardModal(o)
  }

  return (
    <>
      <Head title="Dashboard | Task" />
      <Layout handleOpenEditDashboard={handleOpenEditDashboard} />
      <section className='dashboard-main'>
        <Container maxWidth="xxl" className='dashboard-container'>
          <Board />
        </Container>
      </section>
      <EditDashboardModal handleOpenEditDashboard={handleOpenEditDashboard} openEditDashboardModal={openEditDashboardModal} />
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