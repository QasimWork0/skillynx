import React from "react";
import { IconButton, styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import RightIcon from 'assets/icons/chevron-right-Bold_1_.png'
import LeftIcon from 'assets/icons/chevron-left-Bold_1_.png'
import ImageComponent from "ui/components/shared/ImageComponent";

const StyledCarousel = styled(Carousel)({
    height: '100%',
    marginRight: '4rem',
    marginLeft: '0.4rem',
});

export default function CustomCarousel({ children }: any) {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        largeDesktop: {
            breakpoint: { max: 3000, min: 1800 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 1800, min: 1500 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1500, min: 1080 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 1080, min: 750 },
            items: 2,
        },
        smallMobile: {
            breakpoint: { max: 750, min: 0 },
            items: 1,
        },
    };

    const CustomRightArrow = ({ onClick, ...rest }: any) => {
        return <IconButton onClick={() => onClick()} sx={{ width: "3rem", height: "3.6rem", position: 'fixed', right: '2rem' }}>
            <ImageComponent src={RightIcon} alt="" width="auto" height="100%" />
        </IconButton>;
    };

    const CustomLeftArrow = ({ onClick, ...rest }: any) => {
        return <IconButton onClick={() => onClick()} sx={{ width: "3rem", height: "3.6rem", position: 'fixed', left: '4.4rem' }}>
            <ImageComponent src={LeftIcon} alt="" width="auto" height="100%" />
        </IconButton>;
    };

    return (
        <StyledCarousel
            swipeable={true}
            draggable={false}
            responsive={responsive}
            keyBoardControl={false}
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            renderButtonGroupOutside={true}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow/>}
        >
            {children}
        </StyledCarousel>
    );
}
