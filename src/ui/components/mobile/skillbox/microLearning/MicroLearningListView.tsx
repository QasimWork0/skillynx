import React, {  } from 'react'
import { Box, Divider, styled, useTheme } from '@mui/material'
import MicroLearningMobileCard from './MicroLearningMobileCard'

const SkillboxMobileWrapper = styled(Box)(({ theme }) => ({
    background: theme.palette.common.white,
    height: "100%",
    width: '100%',
    display: "flex",
    flexDirection: "column",
    overflowY: 'auto',
}));

const MicroLearningListView = ({ microlearning }: any) => {
    const theme = useTheme()
    return (
        <SkillboxMobileWrapper>
            {
                microlearning.map((item: any, index: number) => (
                    <>
                        <MicroLearningMobileCard key={item.title} data={item} num={index + 1} />
                        <Divider sx={{ backgroundColor: theme.palette.grey[900] }} />
                    </>
                ))
            }
        </SkillboxMobileWrapper>
    )
}

export default MicroLearningListView