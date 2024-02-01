import React, { ReactNode, useState } from 'react'
import { Box, styled } from '@mui/material'
import SubScreenMobile from 'ui/components/shared/SubScreenMobile'
import MicroLearningMobileCard from './MicroLearningMobileCard'
import ChatComponentMobile from '../../home/ChatComponentMobile'

const SkillboxMobileWrapper = styled(Box)(({ theme }) => ({
    height: "96%",
    width: '100%',
    display: "flex",
    flexDirection: "column",
    background: theme.palette.common.white,
    overflow: 'scroll',
    "&::-webkit-scrollbar": {
        width: "0.3rem",
        height: '0.3rem',
    },
    "&::-webkit-scrollbar-thumb": {
        background: theme.palette.primary.main,
        borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: theme.palette.grey[700],
    },
}));



const MicroLearningListView = ({ microlearning }: any) => {
    const [selectedML, setSelectedML] = useState<{ label: string, component: ReactNode }>();

    const handleClick = (microLearning: any) => {
        setSelectedML(microLearning);
    };

    return (
        <SkillboxMobileWrapper>
            {
                microlearning.map((item: any) => (
                    <>
                        <MicroLearningMobileCard key={item.title} data={item} handleClick={() => {
                            handleClick({
                                label: item.title,
                                component: (
                                    <ChatComponentMobile typingNotAllowed />
                                )
                            })
                        }} />
                    </>
                ))
            }
            {selectedML && (
                <SubScreenMobile onClose={() => { handleClick(undefined) }} data={selectedML} padding={0} />
            )}
        </SkillboxMobileWrapper>
    )
}

export default MicroLearningListView