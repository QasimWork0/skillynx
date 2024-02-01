import React, { ReactNode, useContext, useState } from 'react'
import { Box, Typography, styled } from '@mui/material'
import { TextSizeContext } from 'data/index'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'
import SkillboxRowMobile from './SkillboxRowMobile'
import SubScreenMobile from 'ui/components/shared/SubScreenMobile'
import MicroLearningListView from './microLearning/MicroLearningListView'

const SkillboxMobileWrapper = styled(Box)(({ theme }) => ({
    height: "100%",
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

const HeaderBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: '1rem 1.4rem',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
}))

const HeaderText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.common.black
}))


const SkillboxListView = ({ skills }: any) => {
    const { t } = useTranslation()
    const { state: textSize } = useContext(TextSizeContext)
    const [selectedSkill, setSelectedSkill] = useState<{ image: string, label: string, component: ReactNode }>();

    const handleClick = (skill: any) => {
        setSelectedSkill(skill);
    };

    return (
        <SkillboxMobileWrapper>
            <HeaderBox>
                <HeaderText fontSize={TextSizes[textSize].title2}>{t('Skillbox')}</HeaderText>
            </HeaderBox>
            {!selectedSkill && skills.map((skill: any) => (
                <SkillboxRowMobile key={skill.label} skill={skill} handleClick={() => {
                    handleClick({
                        ...skill,
                        component: <MicroLearningListView microlearning={skill.chapters} />
                    })

                }} />
            ))}
            {selectedSkill && (
                <SubScreenMobile onClose={() => { handleClick(undefined) }} data={selectedSkill} padding={'0'} />
            )}
        </SkillboxMobileWrapper>
    )
}

export default SkillboxListView