import React, { useContext } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import RightIcon from 'assets/icons/arrow-right-Bold_1_.png'
import LeftIcon from 'assets/icons/arrow-left-Bold_1_.png'
import ShowRightIcon from 'assets/icons/chevron-right.png'
import ImageComponent from "ui/components/shared/ImageComponent";
import { TextSizeContext } from "data/index";
import { useTranslation } from "react-i18next";
import { MobileWidth, TextSizes } from "entities/constants";

const Wrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
});

const CarouselButtons = styled(Button)(({ theme }) => ({
    minWidth: 0,
    width: "2.5rem",
    height: "2.5rem",
    position: 'absolute',
    alignSelf: 'flex-end',
    borderRadius: '50%',
    marginBottom: '4rem',
    border: `2px solid ${theme.palette.common.white}`
}));

const HeaderBox = styled(Box)({
    width: '100%',
    height: '5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const Header = styled(Typography)({
    fontWeight: 500
});

const ShowButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    gap: '0.5rem',
    color: theme.palette.text.secondary,
    paddingRight: 0,

}));

export default function MobileCarousel({ title, onShowMore, children, count = 2 }: any) {
    const { t } = useTranslation()
    const { state: textSize } = useContext(TextSizeContext)

    const responsive = {
        tablet: {
            breakpoint: { max: MobileWidth, min: MobileWidth/1.4 },
            items: count+1,
        },
        mobile: {
            breakpoint: { max: MobileWidth/1.4, min: 0 },
            items: count,
        },
    };

    const CustomRightArrow = ({ onClick, ...rest }: any) => {
        return <CarouselButtons onClick={() => onClick()} sx={{ marginLeft: 'calc(100% - 2.5rem)' }}
            variant="contained" color="primary">
            <ImageComponent src={RightIcon} alt="next" width="auto" height="75%" filterAllowed />
        </CarouselButtons>;
    };

    const CustomLeftArrow = ({ onClick, ...rest }: any) => {
        return <CarouselButtons onClick={() => onClick()}
            variant="contained" color="primary">
            <ImageComponent src={LeftIcon} alt="previous" width="auto" height="75%" filterAllowed />
        </CarouselButtons>;
    };

    return (
        <Wrapper>
            <HeaderBox>
                <Header fontSize={TextSizes[textSize].title2}>{t(title)}</Header>
                <ShowButton sx={{ fontSize: TextSizes[textSize].subhead }}>
                    {t('Show all')}
                    <ImageComponent src={ShowRightIcon} alt="show all" width="1.5rem" height="1.5rem" />
                </ShowButton>
            </HeaderBox>
            <Carousel
                swipeable={true}
                draggable={false}
                responsive={responsive}
                keyBoardControl={false}
                transitionDuration={500}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                // itemClass="carousel-item-padding-40-px"
                // arrows={false}
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
            >
                {children}
            </Carousel>
        </Wrapper>
    );
}
