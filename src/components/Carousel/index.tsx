import { ReactNode, type FC } from 'react'
import Slider, { ResponsiveObject, Settings } from "react-slick";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './index.module.scss'
import clsx from 'clsx';

const responsives: ResponsiveObject[] = [
    {
        breakpoint: 1600,
        settings: {
            slidesToShow: 5,
        }
    },
    {
        breakpoint: 1200,
        settings: {
            slidesToShow: 4,
        }
    },
    {
        breakpoint: 992,
        settings: {
            slidesToShow: 2,
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 1,
        }
    },
    {
        breakpoint: 576,
        settings: {
            slidesToShow: 1,
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
        }
    }
]

interface CarouselProps {
    children: ReactNode[],
    className?: string,
    dots?: boolean,
    arrows?: boolean,
    autoplay?: boolean,
    infinite?: boolean,
}

const Carousel: FC<CarouselProps> = ({
    children,
    className,
    arrows = true,
    autoplay = false,
    dots = false,
    infinite = false,
}) => {
    const settings: Settings = {
        dots,
        infinite,
        speed: 500,
        autoplay,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: responsives,
        arrows,
        prevArrow: <FaAngleLeft />,
        nextArrow: <FaAngleRight />,
        className: clsx(styles.root, className)
    }

    return (
        <Slider {...settings}>
            {children}
        </Slider>
    )
}

export default Carousel
