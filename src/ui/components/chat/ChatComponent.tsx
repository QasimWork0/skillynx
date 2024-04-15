import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Box, Button, IconButton, TextField, Typography, buttonClasses, styled, useTheme } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import SendIcon from 'assets/icons/send-Filled_1_.png'
import ThumbUpIcon from 'assets/icons/Thumbs Up.png'
import ThumbDownIcon from 'assets/icons/Thumb Down.png'
import ChatBubble from './bubble/ChatBubble'
import { useTranslation } from 'react-i18next'
import ReportModal from './modal/ReportModal'
import { ChatComponentPropType, FeedbackInterface } from 'entities/interfaces'
import useFontSize from 'hooks/FontSize'
import { SubmitButton } from '../shared/SubmitButton'
import ChatLoader from './ChatLoader'
import BookmarkIcon from 'assets/icons/bookmark.png'
import BookmarkDarkIcon from 'assets/icons/bookmark-dark.png'
import BookmarkFilledIcon from 'assets/icons/bookmark-filled.png'


const Wrapper = styled(Box)(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: "0.75rem 1.12rem",
    flexShrink: 0,
    gap: '0.5rem'
}))

const TypeBox = styled('form')(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0.56rem 0.56rem 0.56rem 2rem',
    borderRadius: '624.9375rem',
    gap: '2rem',
    flexShrink: 0,
    margin: '2.62rem 5rem 1rem 5rem',
}))

const TitleBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    height: '3.75rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    borderRadius: '0.5rem',
    flexShrink: 0,
    gap: '0.75rem',
}))

const TitleText = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    color: theme.palette.common.white,
    flexGrow: 1,
}))

const TitleNum = styled(TitleText)(({ theme }) => ({
    width: '1.98rem',
    height: '1.98rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 400,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.common.white}`,
    flexGrow: 0,
}))

const FeedbackBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    gap: '1.2rem',
    alignItems: 'center',
    padding: '2rem'
}))

const FeedbackText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bolder',
}))

const FeedbackButtonBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '1.6rem'
}))

const FeedbackButton = styled(Button)(({ theme }) => ({
    borderRadius: '2rem',
    textTransform: 'none',
    padding: '0.25rem 3rem',
    fontWeight: 'bolder',
    height: '2.5rem'
}))

const SendButton = styled(Button)(({ theme }) => ({
    borderRadius: '50%',
    width: '3.875rem',
    height: '3.875rem',
    fontSize: '2.8rem',
    padding: 0,
    minHeight: 0,
    minWidth: 0,
    [`&.${buttonClasses.containedPrimary}`]: {
        // backgroundColor: theme.palette.grey[200],
        '&:disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
            color: theme.palette.action.disabled
        }
    }
}))

const ChatBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    borderRadius: '1.2rem',
    flexGrow: 1,
}))

const ChatComponent = (
    {
        messagesData, sendMessage, date, chapter, isInModal, typingNotAllowed, isHome,
        isBookmarked, bookmarkChapter, reportAllowed, sendDisabled, isLoading, handleNext
    }: ChatComponentPropType) => {
    const fontSize = useFontSize()
    const theme = useTheme()
    const { t } = useTranslation()
    const [reportModal, setReportModal] = useState(false);
    const [messageText, setMessageText] = useState('');

    const handleReport = () => {
        setReportModal(!reportModal)
    }

    const formatDate = (date: Date) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const day = days[date.getDay()];
        const month = months[date.getMonth()];
        const dateNumber = date.getDate();
        const suffix = (dateNumber === 1 || dateNumber === 11 || dateNumber === 21 || dateNumber === 31) ? "st" : (dateNumber === 2 || dateNumber === 12 || dateNumber === 22) ? "nd" : "th";

        return `${day}, ${month} ${dateNumber}${suffix}`;
    }

    function isFeedbackInterface(obj: any): obj is FeedbackInterface {
        return 'feedback' in obj
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        sendMessage && sendMessage(encodeURIComponent(messageText.trim()))
        setMessageText('')
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessageText(event.target.value)
    };

    return (
        <Wrapper >
            {date &&
                <TitleBox>
                    <Typography fontWeight={400} fontSize={fontSize.body}>{formatDate(date)}</Typography>
                </TitleBox>
            }
            {chapter &&
                <TitleBox sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }}>
                    <TitleNum fontSize={fontSize.body}>{chapter.num}</TitleNum>
                    <TitleText fontSize={fontSize.body}>{t(chapter.title)}</TitleText>
                    <IconButton onClick={bookmarkChapter}>
                        <ImageComponent
                            src={isBookmarked ? BookmarkFilledIcon : theme.palette.mode === 'light' ? BookmarkIcon : BookmarkDarkIcon}
                            alt='bookmark' width='' />
                    </IconButton>
                </TitleBox>
            }
            <ChatBox padding={isHome ? '1.25rem 6rem' : '1.25rem 0'}>
                {
                    messagesData.map((message, key) => (
                        <ChatBubble key={key} message={isFeedbackInterface(message) ? message.feedback : message.content} date={message.time} isLeft={isFeedbackInterface(message) ? message.direction==='0' : true}
                            handleReport={reportAllowed && handleReport} />
                    ))
                }
                {isLoading && <ChatLoader />}
                {handleNext && <SubmitButton width='7.25rem' height='2.5rem' margin='0rem 3.8rem' marginTop='1rem' onClick={handleNext}>Next</SubmitButton>}
            </ChatBox>
            {false &&
                <FeedbackBox>
                    <FeedbackText fontSize={fontSize.title3}>{t('How did you like this Microlearning?')}</FeedbackText>
                    <FeedbackButtonBox>
                        <FeedbackButton variant='contained' color='success'>
                            <ImageComponent src={ThumbUpIcon} alt='send' width='2rem' height='2rem' filterAllowed />
                        </FeedbackButton>
                        <FeedbackButton variant='contained' color='error'>
                            <ImageComponent src={ThumbDownIcon} alt='send' width='2rem' height='2rem' filterAllowed />
                        </FeedbackButton>
                        <FeedbackButton variant='contained' color='secondary' sx={{ fontSize: fontSize.body }}>{t('Skip')}</FeedbackButton>
                    </FeedbackButtonBox>
                </FeedbackBox>
            }
            {!typingNotAllowed && (
                <TypeBox onSubmit={handleSubmit}>
                    <TextField placeholder={`${t('Type a message')}...`} fullWidth autoComplete='off' value={messageText} onChange={handleChange}
                        variant="standard" InputProps={{ sx: { fontSize: fontSize.body, letterSpacing: '0.02rem' }, disableUnderline: true }} />
                    <SendButton variant='contained' color='primary' disabled={sendDisabled || messageText.trim() === ''} type='submit'>
                        <ImageComponent src={SendIcon} alt='send' width='2rem' height='2rem' />
                    </SendButton>
                </TypeBox>
            )}
            {reportModal && <ReportModal closeModal={handleReport} />}
        </Wrapper>
    )
}

export default ChatComponent