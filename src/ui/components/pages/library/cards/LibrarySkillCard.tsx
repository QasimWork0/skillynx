import React, { useContext } from 'react'
import { Box, Button, Rating, Typography, styled } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import { LibrarySkillInterface } from 'entities/interfaces'
import { SelectedSkillContext, TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'

const Wrapper = styled(Box)(() => ({
    height: '26rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1.4rem',
}))

const DetailsBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    height: '40%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: `0px 2px 8px ${theme.palette.mode==='light'?'rgba(0, 0, 0, 0.2)':'rgba(255, 255, 255, 0.2)'}`,
    borderRadius: '0 0 2rem 2rem',
    justifyContent: 'center',
    alignItems: 'center',
}))

const Label = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold'
}))

const Sublabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main
}))

const RatingsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginTop: '1rem'
}))

const RatingsText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold'
}))

const RatingsCount = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold'
}))

const HoverBox = styled(Button)(({ theme }) => ({
    position: 'absolute',
    width: '88%',
    height: '90%',
    borderRadius: '2rem',
}))

const LibrarySkillCard = ({ data }: { data: LibrarySkillInterface }) => {
    const { updateContext: setSelectedSkill } = useContext(SelectedSkillContext)
    const { state: textSize } = useContext(TextSizeContext)
    return (
        <Wrapper>
            <ImageComponent src={data.image} alt='image' width='100%' height='60%' borderRadius='2rem 2rem 0 0'/>
            <DetailsBox>
                <Label fontSize={TextSizes[textSize].title1}>{data.label}</Label>
                <Sublabel fontSize={TextSizes[textSize].title3}>{data.sublabel}</Sublabel>
                <RatingsBox>
                    <Rating name="half-rating" max={1} value={data.ratings === 5 ? data.ratings > 1 ? 1 : 0 : 0.5} precision={0.1} readOnly size='large' />
                    <RatingsText fontSize={TextSizes[textSize].title3}>{data.ratings.toFixed(1)}</RatingsText>
                    <RatingsCount fontSize={TextSizes[textSize].footnote}>{`(${data.ratingsCount.toLocaleString().replace(',','.')})`}</RatingsCount>
                </RatingsBox>
            </DetailsBox>
            <HoverBox onClick={()=>setSelectedSkill(data)} color='primary'/>
        </Wrapper>
    )
}

export default LibrarySkillCard