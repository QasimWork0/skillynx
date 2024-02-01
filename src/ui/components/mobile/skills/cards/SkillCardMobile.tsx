import React, { useContext } from 'react'
import { Box, Typography, styled, useTheme } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'
import RadialSeparators from 'ui/components/pages/skills/cards/RadialSeparators'

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
}))

const Label = styled(Typography)(({ theme }) => ({
    width: '100%',
    fontWeight: 'bold',
    margin: '0 1.5rem',
}))

const Date = styled(Typography)(({ theme }) => ({
    fontWeight: 'lighter'
}))

const SkillCardMobile = ({ label, image, date='12.01.2023', progress = 20 }: any) => {
    const theme = useTheme()
    const { state: textSize } = useContext(TextSizeContext)
    return (
        <Wrapper>
            <CircularProgressbarWithChildren
                value={Math.floor((progress / 12.5)) * 12.5}
                strokeWidth={6}
                styles={{
                    root: { width: '4.6rem', height: '4.6rem', display: 'flex' },
                    path: {
                        stroke: theme.palette.primary.main,
                    },
                    trail: {
                        stroke: 'transparent',
                    },
                    text: {
                        display: 'none',
                    },
                }}
            >
                <ImageComponent src={image} alt='skill' width='80%' height='80%' />
                <RadialSeparators
                    count={8}
                    style={{
                        background: theme.palette.common.white,
                        width: "4px",
                        height: `${7}%`
                    }}
                />
            </CircularProgressbarWithChildren>
            <Label fontSize={TextSizes[textSize].title3}>{label}</Label>
            <Date fontSize={TextSizes[textSize].subhead}>{date}</Date>
        </Wrapper>
    )
}

export default SkillCardMobile