import React, { useContext } from 'react'
import { Box, Typography, styled, useTheme } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import RadialSeparators from './RadialSeparators'
import { TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center'
}))

const SkillCard = ({ label, image, progress = 20 }: any) => {
    const theme = useTheme()
    const { state: textSize } = useContext(TextSizeContext)
    return (
        <Wrapper>
            <CircularProgressbarWithChildren
                value={Math.floor((progress/12.5))*12.5}
                strokeWidth={6}
                styles={{
                    root: { width: '4.6rem', height: '4.6rem', display: 'flex' },
                    path: {
                        stroke: theme.palette.primary.main,
                        // strokeLinecap: 'round',
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
            <Typography sx={{fontWeight:'bold', padding:'1rem', fontSize: TextSizes[textSize].title3}}>{label}</Typography>
        </Wrapper>
    )
}

export default SkillCard