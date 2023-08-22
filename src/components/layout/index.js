import React, { useState } from 'react'
import { Sidebar, Topbar } from '..'

const index = () => {
    const [openSidebar, setOpenSidebar] = useState(false)

    const handleOpenSidebar = (o) => {
        setOpenSidebar(o)
    }

    return (
        <>
            <Topbar openSidebar={openSidebar} handleOpenSidebar={handleOpenSidebar} />
            <Sidebar openSidebar={openSidebar} />
        </>
    )
}

export default index