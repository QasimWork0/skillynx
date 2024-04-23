import React, { useContext } from 'react'
import { Box, Button, Typography, styled } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import { LibraryCourseInterface } from 'entities/interfaces'
import { SelectedSkillContext, TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'

const WrapperButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.grey[900],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1rem',
    padding: 0,
    flexShrink: 0,
    textTransform: 'none',
    maxWidth:'100%',
}))

const TopLabel = styled(Typography)(({ theme }) => ({
    width: '100%',
    fontWeight: 500,
    padding: '0.62rem 0.25rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingTop: 0,
}))

const Label = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    textTransform: 'none',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
}))

const LabelBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '4.0625rem',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0.25rem 1rem',
}))

const LibrarySkillCardMobile = ({ data, isCategory = false }: { data: LibraryCourseInterface, isCategory?: boolean }) => {
    const { updateContext: setSelectedSkill } = useContext(SelectedSkillContext)
    const { state: textSize } = useContext(TextSizeContext)
    return (
        <>
            {isCategory && <TopLabel fontSize={TextSizes[textSize].callout}>{data.title}</TopLabel>}
            <WrapperButton onClick={() => setSelectedSkill(data)}  sx={{width:isCategory?'100%':'calc(100% - 0.4rem)', height:isCategory?'16.25rem':'17.5625rem', maxWidth:isCategory?'100%':'11.5rem'}}>
                <ImageComponent src={data.image} alt='image' width='100%' height={isCategory?'100%':'13.5rem'} borderRadius={isCategory?'1rem':'1rem 1rem 0 0'} objectFit/>
                {!isCategory &&
                    <LabelBox>
                        <Label fontSize={TextSizes[textSize].title3}>{data.title}</Label>
                    </LabelBox>
                }
            </WrapperButton>
        </>
    )
}

export default LibrarySkillCardMobile