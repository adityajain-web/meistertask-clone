import Head from 'next/head'
import React from 'react'

const index = ({ title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
        </>
    )
}

export default index