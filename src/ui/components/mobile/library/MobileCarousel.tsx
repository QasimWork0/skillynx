import React, { useContext } from "react";
import { Box, Button, Divider, Typography, styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import RightIcon from 'assets/icons/arrow-right-Bold_1_.png'
import LeftIcon from 'assets/icons/arrow-left-Bold_1_.png'
import ShowRightIcon from 'assets/icons/chevron-right-Bold_1_.png'
import ImageComponent from "ui/components/shared/ImageComponent";
import { TextSizeContext } from "data/index";
import { useTranslation } from "react-i18next";
import { MobileWidth, TextSizes } from "entities/constants";

const Wrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem',
});

const CarouselButtons = styled(Button)(({ theme }) => ({
    minWidth: 0,
    width: "3rem",
    height: "3rem",
    position: 'absolute',
    alignSelf: 'flex-end',
    borderRadius: '50%',
    marginBottom: '1.8rem',
    border: `0.3rem solid ${theme.palette.common.white}`
}));

const HeaderBox = styled(Box)({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '0.6rem'
});

const Header = styled(Typography)({
    fontWeight: 'bolder'
});

const ShowButton = styled(Button)(({theme}) => ({
    textTransform: 'none',
    gap: '1rem',
    color: theme.palette.text.secondary
}));

const HeaderDivider = styled(Divider)(({theme})=>({
    backgroundColor: theme.palette.common.black,
    width: '2.5rem'
}));

export default function MobileCarousel({ title, onShowMore, children, count=3 }: any) {
    const { t } = useTranslation()
    const { state: textSize } = useContext(TextSizeContext)

    const responsive = {
        mobile: {
            breakpoint: { max: MobileWidth, min: 0 },
            items: count,
        },
    };

    const CustomRightArrow = ({ onClick, ...rest }: any) => {
        return <CarouselButtons onClick={() => onClick()} sx={{ marginLeft: 'calc(100% - 3rem)' }}
            variant="contained" color="primary">
            <ImageComponent src={RightIcon} alt="next" width="auto" height="75%" filterAllowed/>
        </CarouselButtons>;
    };

    const CustomLeftArrow = ({ onClick, ...rest }: any) => {
        return <CarouselButtons onClick={() => onClick()}
            variant="contained" color="primary">
            <ImageComponent src={LeftIcon} alt="previous" width="auto" height="75%" filterAllowed/>
        </CarouselButtons>;
    };

    return (
        <Wrapper>
            <HeaderBox>
                <Box>
                    <Header fontSize={TextSizes[textSize].title2}>{t(title)}</Header>
                    <HeaderDivider/>
                </Box>
                <ShowButton sx={{ fontSize: TextSizes[textSize].subhead }}>
                    {t('Show all')}
                    <ImageComponent src={ShowRightIcon} alt="show all" width="0.6rem" height="auto"/>
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
                itemClass="carousel-item-padding-40-px"
                // arrows={false}
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
            >
                {children}
            </Carousel>
        </Wrapper>
    );
}
