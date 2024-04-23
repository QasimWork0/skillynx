import React, { } from 'react'
import { Box, Divider, styled, useTheme } from '@mui/material'
import MicroLearningMobileCard from './MicroLearningMobileCard'

const SkillboxMobileWrapper = styled(Box)(({ theme }) => ({
    background: theme.palette.common.white,
    height: "100%",
    margin:'0 -0.6rem',
    width:'calc(100% + 1.2rem)',
    display: "flex",
    flexDirection: "column",
    overflowY: 'auto',
}));

const MicroLearningListView = ({ microlearning, setChapterNote, getChapterNote, getChapterHistory, getChapterMaterial }: any) => {
    const theme = useTheme()
    return (
        <SkillboxMobileWrapper>
            {
                microlearning.map((item: any, index: number) => (
                    <>
                        <MicroLearningMobileCard key={item.title} data={item} num={index + 1} saveNote={async (note: string) => await setChapterNote(item.id, note)}
                    getNote={async ()=> await getChapterNote(item.id)} getChapterHistory={async ()=> await getChapterHistory(item.id)} getChapterMateria={async ()=> await getChapterMaterial(item.id)} />
                        <Divider sx={{ backgroundColor: theme.palette.grey[900] }} />
                    </>
                ))
            }
        </SkillboxMobileWrapper>
    )
}

export default MicroLearningListView