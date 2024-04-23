import React, { useContext } from 'react'
import { Box, Typography, styled, useTheme } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'
import RadialSeparators from 'ui/components/pages/skills/RadialSeparators'

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
}))

const Label = styled(Typography)(({ theme }) => ({
    width: '100%',
    marginLeft: '1rem',
}))

const Date = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    fontFamily: "Helvetica Neue"
}))

const SkillCardMobile = ({ label, image, selected, date = '12.01.2023', progress = 20 }: any) => {
    const theme = useTheme()
    const { state: textSize } = useContext(TextSizeContext)
    return (
        <Wrapper>
            <CircularProgressbarWithChildren
                value={Math.floor((progress / 12.5)) * 12.5}
                strokeWidth={6}
                styles={{
                    root: { width: '4.2rem', height: '4.2rem', display: 'flex' },
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
                <ImageComponent src={image} alt='skill' width='3.25rem' height='3.25rem' borderRadius='50%'/>
                <RadialSeparators
                    count={8}
                    style={{
                        background: theme.palette.common.white,
                        width: "4px",
                        height: `${7}%`
                    }}
                />
            </CircularProgressbarWithChildren>
            <Label fontSize={selected ? TextSizes[textSize].body : TextSizes[textSize].callout}
                fontWeight={selected ? 700 : 500}>
                {label}
            </Label>
            <Date fontSize={TextSizes[textSize].footnote}>{date}</Date>
        </Wrapper>
    )
}

export default SkillCardMobile