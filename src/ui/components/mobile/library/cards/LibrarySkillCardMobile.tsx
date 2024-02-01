import React, { useContext } from 'react'
import { Box, Button, Typography, styled } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import { LibrarySkillInterface } from 'entities/interfaces'
import { SelectedSkillContext, TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'

const Wrapper = styled(Box)(({ theme }) => ({
    height: '13rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0.4rem 0.3rem',
    borderRadius: '1rem',
    border: `0.3rem solid ${theme.palette.secondary.main}`,
    boxShadow: `0px 2px 6px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'}`,
}))

const Label = styled(Typography)(({ theme }) => ({
    fontWeight: 'bolder',
    backgroundColor: theme.palette.common.white,
    borderRadius: '1rem',
    padding: '0 0.8rem',
    textTransform: 'none',
    maxWidth: '90%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}))

const HoverBox = styled(Button)(({ theme }) => ({
    position: 'absolute',
    width: '88%',
    height: '90%',
    borderRadius: '1rem',
    display:'flex',
    alignItems:'flex-end',
    padding:'2rem 0',
}))

const LibrarySkillCardMobile = ({ data }: { data: LibrarySkillInterface }) => {
    const { updateContext: setSelectedSkill } = useContext(SelectedSkillContext)
    const { state: textSize } = useContext(TextSizeContext)
    return (
        <Wrapper>
            <ImageComponent src={data.image} alt='image' width='100%' height='100%' borderRadius='1rem' />
            <HoverBox onClick={() => setSelectedSkill(data)} color='primary'>
                <Label fontSize={TextSizes[textSize].subhead}>{data.label}</Label>
            </HoverBox>
        </Wrapper>
    )
}

export default LibrarySkillCardMobile