import { axiosClient } from 'api/axios'
import { Container } from 'components'
import { Title } from 'modules/Components'
import { useEffect, useState, type FC } from 'react'
import { API_ASSET_PORT, API_HOST } from 'utils/constant'
import { getUrlEndpoint } from 'utils/helper'
import parse from 'html-react-parser';
import styles from './index.module.scss'

const About: FC = () => {
    const [content, setContent] = useState<string>('')

    useEffect(() => {
        (async () => {
            const url = getUrlEndpoint(
                API_HOST,
                API_ASSET_PORT,
                '/api/assets/about-page'
            )
            const { data } = await axiosClient.get(url)
            if (data) {
                console.log(data?.data?.content)
                setContent(data?.data?.content)
            }
        })()
    }, [])

    return (
        <Container>
            <Title>
                About Us
            </Title>
            <Container className={styles.root}>
                {parse(content)}
            </Container>
        </Container>
    )
}

export default About
