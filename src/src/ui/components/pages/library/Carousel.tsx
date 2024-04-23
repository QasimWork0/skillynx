import React, { useContext } from "react";
import { Button, alpha, styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TextSizeContext } from "data/index";
import { useTranslation } from "react-i18next";
import { TextSizes } from "entities/constants";

const StyledCarousel = styled(Carousel)({
    paddingTop: '2.6rem',
    marginTop: '1rem'  
});


const StyledDiv = styled("div")({
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "8px",
    padding: "0 12px",
});

const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    color: theme.palette.common.black,
    padding: 0,
    minWidth: 0,
    "&:hover": {
        background: alpha(theme.palette.grey[100], 0.12),
    },
}));

export default function CustomCarousel({ children }: any) {
    const { state: textSize } = useContext(TextSizeContext)
    const {t} = useTranslation()

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 7,
        },
        largeDesktop: {
            breakpoint: { max: 3000, min: 1800 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 1800, min: 1630 },
            items: 5,
        },
        smalldesktop: {
            breakpoint: { max: 1630, min: 1320 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1320, min: 1050 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 1050, min: 750 },
            items: 2
        },
    };

    const ButtonGroup = ({ next, previous, goToSlide, ...rest }:any) => {
        return (
            <StyledDiv>
                <StyledButton sx={{fontSize:TextSizes[textSize].body}}>{t('View All')}</StyledButton>
                <StyledButton onClick={() => previous()}>
                    <ChevronLeftIcon fontSize="large" />
                </StyledButton>
                <StyledButton onClick={() => next()}>
                    <ChevronRightIcon fontSize="large" />
                </StyledButton>
            </StyledDiv>
        );
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
            customButtonGroup={<ButtonGroup />}
            arrows={false}
        >
            {children}
        </StyledCarousel>
    );
}
