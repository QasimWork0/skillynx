import { Box, Button, List, ListItem, ListItemButton, styled, IconButton, useTheme, Typography, Divider } from '@mui/material'
import React, { useContext, useState } from 'react'
import { TextSizeContext } from 'data/index'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'
import SubScreenMobile from '../../shared/SubScreenMobile'
import ImageComponent from 'ui/components/shared/ImageComponent'
import MoreIcon from 'assets/icons/More-Vertical.png'
import MoreIconDark from 'assets/icons/More-Vertical-dark.png'
import DeleteIcon from 'assets/icons/trash_white.png'
import { ParagraphInterface, SkillboxCourseInterface } from 'entities/interfaces'
import MicroLearningListView from './microLearning/MicroLearningListView'
import SkillboxRowMobile from './SkillboxRowMobile'
import ConfirmationModal from 'ui/components/shared/ConfirmationModal'

const SkillboxMobileWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
}))

const ListElement = styled(ListItem)<{ more?: string }>(({ theme, more }) => ({
    backgroundColor: more ? theme.palette.grey[800] : theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[900],
    height: '7.25rem',
    padding: '0 0.75rem 0 0',
    borderRadius: '0rem 0rem 1.5rem 0rem',
    borderRight: more ? `6px solid ${theme.palette.primary.main}` : 'none',
    gap: '0.5rem',
    zIndex: 2,
}))

const ListButton = styled(ListItemButton)(() => ({
    height: '100%',
    padding: '0.25rem 0.25rem 0.25rem 1.5rem',
    borderRadius: '0 4px 4px 0'
}))

const TitleBox = styled(Box)(({ theme }) => ({
    height: '6.4375rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.25rem 1.5rem',
    flexShrink: 0,
}))

const ListElementBox = styled(Box)(({ theme }) => ({
    display: 'flex'
}))

const DeleteBox = styled(Button)(({ theme }) => ({
    // backgroundColor: theme.palette.warning.main,
    width: '5.6rem',
    height: '7.25rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    padding: '0rem 1.375rem 0rem 2.6875rem',
    zIndex: 1,
}))

const StyledList = styled(List)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[900],
    padding: 0,
    flexGrow: 1,
}))


const SkillboxListView = ({ skills, addUserCourse, deleteUserCourse, expanded, handleExpand, handleExpandClose, setChapterNote,
    getChapterNote, getChapterHistory, getChapterMaterial }: {
        skills: SkillboxCourseInterface[],
        addUserCourse: (courseId: number) => Promise<number>,
        deleteUserCourse: (courseId: number) => Promise<number>
        expanded?: SkillboxCourseInterface
        handleExpand: (skill: SkillboxCourseInterface) => void
        handleExpandClose: () => void
        setChapterNote: (chapterId: number, note: string) => Promise<void>;
        getChapterNote: (chapterId: number) => Promise<string>
        getChapterHistory: (chapterId: number) => Promise<ParagraphInterface[]>
        getChapterMaterial: (chapterId: number) => void
    }) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const { state: textSize } = useContext(TextSizeContext)
    const [moreOptionLabel, setMoreOptionLabel] = useState('')
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

    const handleMore = (label: string) => {
        setMoreOptionLabel(moreOptionLabel !== label ? label : '')
    }

    return (
        <SkillboxMobileWrapper>
            <TitleBox>
                <Typography fontSize={TextSizes[textSize].title1} fontWeight={700}>{t('Skillbox')}</Typography>
            </TitleBox>
            <StyledList>
                {
                    !expanded && skills.map((skill: any) => (
                        <>
                            <ListElementBox key={skill.id}>
                                <ListElement more={skill.title === moreOptionLabel ? 'true' : undefined} sx={{ marginRight: '-1.312rem' }}>
                                    <ListButton onClick={() => handleExpand(skill)} >
                                        <SkillboxRowMobile label={skill.title} image={skill.thumbnail} progress={skill.progress} selected={skill.title === moreOptionLabel} />
                                    </ListButton>
                                    <IconButton onClick={() => handleMore(skill.title)}>
                                        <ImageComponent src={theme.palette.mode === 'light' ? MoreIcon : MoreIconDark} alt='more' width='1.5rem' height='1.5rem' />
                                    </IconButton>
                                </ListElement>
                                {skill.title === moreOptionLabel &&
                                    <DeleteBox color='warning' variant='contained' onClick={() => setDeleteConfirmationModal(true)}>
                                        <ImageComponent src={DeleteIcon} alt='delete' width='2rem' height='2rem' />
                                    </DeleteBox>
                                }
                                {deleteConfirmationModal &&
                                    <ConfirmationModal closeModal={() => setDeleteConfirmationModal(false)} confirmColor='error'
                                        handleConfirm={() => deleteUserCourse(skill.id)} title='Removing Course' description={`Are you sure you want to remove  ${skill.title}?`}
                                    />
                                }
                            </ListElementBox>
                            <Divider sx={{ backgroundColor: theme.palette.grey[900] }} />
                        </>
                    ))
                }
            </StyledList>
            {expanded && (
                <SubScreenMobile onClose={handleExpandClose} data={expanded}>
                    <MicroLearningListView microlearning={expanded.chapters} setCourseNote={setChapterNote} 
                    getChapterNote={getChapterNote} getChapterHistory={getChapterHistory} getChapterMaterial={getChapterMaterial}/>
                </SubScreenMobile>
            )}
        </SkillboxMobileWrapper>
    )
}

export default SkillboxListView