import type { FC } from "react";
import Head from "next/head";

const HeadSEO: FC = () => {
    return (
        <Head>
            <title>Bookworm</title>
            <meta name="title" content='NashTech Rookie Bookworm Shop' key="title" />
            <meta name="description" content='This is the front-end application for the Bookworm shop' key="description" />
        </Head>
    )
}

export default HeadSEO