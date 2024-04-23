import React, { useContext } from 'react'
import { Box, Button, Rating, Typography, styled } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import { LibraryCourseInterface } from 'entities/interfaces'
import { SelectedSkillContext, TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'

const Wrapper = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.mode==='light'? theme.palette.common.white: theme.palette.grey[900],
    minHeight: '23.0625rem',
    height: '98%',
    maxHeight: '26rem',
    width: '18.0625rem',
    margin: '0.4rem 0.4rem 0 0.4rem',
    borderRadius: '0.75rem',
    textTransform: 'none',
    boxShadow: theme.palette.mode==='light'? '0px 4px 7px 0px rgba(193, 193, 193, 0.25)': '',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap:'1.75rem',
    alignItems: 'flex-start',
}))

const DetailsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexGrow:'1',   
    margin: '1rem',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'start',
    width: '90%',
    overflow: 'hidden',
}))

const Label = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    whiteSpace: 'nowrap',
}))

const Sublabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    whiteSpace: 'nowrap'
}))

const RatingsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
    gap: '0.5rem'
}))

const RatingsText = styled(Typography)(({ theme }) => ({
    marginLeft: '0.25rem',
    fontWeight: 700
}))

const RatingsCount = styled(Typography)(({ theme }) => ({
    fontWeight: 400
}))

const LibrarySkillCard = ({ data }: { data: LibraryCourseInterface }) => {
    const { updateContext: setSelectedSkill } = useContext(SelectedSkillContext)
    const { state: textSize } = useContext(TextSizeContext)
    return (
        <Wrapper onClick={()=>setSelectedSkill(data)} color='primary'>
            <ImageComponent src={data.image} alt='image' width='100%' height='14.3125rem' borderRadius='0.75rem 0.75rem 0 0'/>
            <DetailsBox>
                <Label fontSize={TextSizes[textSize].title2}>{data.title}</Label>
                <Sublabel fontSize={TextSizes[textSize].callout}>{data.subtitle}</Sublabel>
                <RatingsBox>
                    <Rating name="half-rating" max={1} value={data.ratings === 5 ? data.ratings > 1 ? 1 : 0 : 0.5} precision={0.1} readOnly size='large' />
                    <RatingsText fontSize={TextSizes[textSize].title3}>{data.ratings.toFixed(1)}</RatingsText>
                    <RatingsCount fontSize={TextSizes[textSize].footnote}>{`(${data.ratingsCount.toLocaleString().replace(',','.')})`}</RatingsCount>
                </RatingsBox>
            </DetailsBox>
        </Wrapper>
    )
}

export default LibrarySkillCard