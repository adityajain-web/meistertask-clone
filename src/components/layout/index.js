import React, { useState } from 'react'
import { Sidebar, Topbar } from '..'

const index = ({ handleOpenEditDashboard }) => {
    const [openSidebar, setOpenSidebar] = useState(false)

    const handleOpenSidebar = (o) => {
        setOpenSidebar(o)
    }

    return (
        <>
            <Topbar openSidebar={openSidebar} handleOpenSidebar={handleOpenSidebar} />
            <Sidebar openSidebar={openSidebar} handleOpenEditDashboard={handleOpenEditDashboard} />
        </>
    )
}

export default index