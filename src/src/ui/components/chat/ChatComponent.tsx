import React, { ChangeEvent, FormEvent, useLayoutEffect, useRef, useState } from 'react'
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
import { Loop } from '@mui/icons-material'
import useScreenSize from 'hooks/ScreenSize'
import { MobileWidth } from 'entities/constants'


const Wrapper = styled(Box)(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 0,
    // gap: '0.5rem'
}))

const TypeBox = styled('form')(({ theme }) => ({
    backgroundColor: theme.palette.mode==='light'? theme.palette.common.white:theme.palette.grey[800],
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0.56rem 0.56rem 0.56rem 2rem',
    borderRadius: '624.9375rem',
    gap: '2rem',
    flexShrink: 0,
    margin: '0.5rem 5rem 1rem 5rem',
    boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.1)',
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
    lineHeight:'1rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight:'100%',
    // whiteSpace: 'nowrap', 
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
    paddingTop: '1rem'
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

const ContentBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'scroll',
    padding: "0.75rem 1.12rem",
    [theme.breakpoints.up('md')]: {
        "&::-webkit-scrollbar": {
            width: "0.4rem",
            height: '0.4rem',
        },
        "&::-webkit-scrollbar-track": {
            background: 'transparent',
        },
        "&::-webkit-scrollbar-thumb": {
            background: theme.palette.primary.dark,
            borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.grey[700],
        },
        marginRight: '0.1rem',
    },

}))

const ChatComponent = (
    {
        messagesData, sendMessage, date, chapter, isInModal, typingNotAllowed, isHome, handleFeedback,
        bookmarkChapter, reportAllowed, sendDisabled, isLoading, handleNext, clearProgress,
    }: ChatComponentPropType) => {
    const fontSize = useFontSize()
    const {width} = useScreenSize()
    const theme = useTheme()
    const { t } = useTranslation()
    const [reportModal, setReportModal] = useState(false);
    const [messageText, setMessageText] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messagesData, isLoading]);

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
            <ContentBox ref={containerRef}>
                {date &&
                    <>
                        <TitleBox>
                            <Typography fontWeight={400} fontSize={fontSize.body} flexGrow={1}>{formatDate(date)}</Typography>
                            {clearProgress && chapter && <SubmitButton variant='outlined' fontColor={theme.palette.text.primary}
                                marginTop='0' width="10rem" icon={<Loop fontSize='small' />} onClick={clearProgress}>
                                Start Over</SubmitButton>}
                        </TitleBox>
                        <TitleBox sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }}>
                            {chapter &&
                                <>
                                    <TitleNum fontSize={fontSize.body}>{chapter.num}</TitleNum>
                                    <TitleText fontSize={fontSize.body}>{t(chapter.title)}</TitleText>
                                    <IconButton onClick={() => bookmarkChapter && bookmarkChapter(chapter.id, chapter.isBookmarked ? 0 : 1)}>
                                        <ImageComponent
                                            src={chapter.isBookmarked ? BookmarkFilledIcon : theme.palette.mode === 'light' ? BookmarkIcon : BookmarkDarkIcon}
                                            alt='bookmark' width='1.5rem' height='1.5rem' />
                                    </IconButton>
                                </>
                            }

                        </TitleBox>
                    </>
                }

                <ChatBox padding={isHome ? '1.25rem 3rem ' : '1.25rem 0 0 0'}>
                    {
                        messagesData.map((message, index) => (
                            isFeedbackInterface(message) || message.type === 'io' ?
                                <ChatBubble key={index} message={isFeedbackInterface(message) ? message.feedback : message.content} date={message.time} isLeft={isFeedbackInterface(message) ? message.direction === '0' : true}
                                    handleReport={reportAllowed && handleReport} handleNext={handleNext} outputs={!isFeedbackInterface(message) && message.outputs} disabled='false' />
                                : message.type === 'next' ?
                                    <SubmitButton width='7.25rem' height='2.5rem' margin='0.5rem 3.8rem' marginTop='0.5rem' disabled={index < messagesData.length - 1 || isLoading}
                                        onClick={() => handleNext && handleNext(message.outputs)}>Next</SubmitButton>
                                    : message.type === 'exit' && handleFeedback &&
                                    <FeedbackBox>
                                        <FeedbackText fontSize={fontSize.title3}>
                                            {t('How did you like this Microlearning?')}</FeedbackText>
                                        <FeedbackButtonBox>
                                            <FeedbackButton variant='contained' color='success' onClick={() => handleFeedback && handleFeedback()} disabled={isLoading}>
                                                <ImageComponent src={ThumbUpIcon} alt='send' width='2rem' height='2rem' filterAllowed />
                                            </FeedbackButton>
                                            <FeedbackButton variant='contained' color='error' onClick={() => handleFeedback && handleFeedback()} disabled={isLoading}>
                                                <ImageComponent src={ThumbDownIcon} alt='send' width='2rem' height='2rem' filterAllowed />
                                            </FeedbackButton>
                                            <FeedbackButton variant='contained' color='secondary' onClick={() => handleFeedback && handleFeedback()} disabled={isLoading}
                                                sx={{ fontSize: fontSize.body }}>{t('Skip')}</FeedbackButton>
                                        </FeedbackButtonBox>
                                    </FeedbackBox>
                        ))
                    }
                    {isLoading && <ChatLoader isInModal={isInModal}/>}
                </ChatBox>
            </ContentBox>
            {!typingNotAllowed && (
                <TypeBox onSubmit={handleSubmit} sx={width<=MobileWidth?{margin:'0.5rem 1rem', height:'4rem'}:{}}>
                    <TextField placeholder={`${t('Type a message')}...`} fullWidth autoComplete='off' value={messageText} onChange={handleChange}
                        variant="standard" InputProps={{ sx: { fontSize: fontSize.body, letterSpacing: '0.02rem', color: theme.palette.mode==='light'?theme.palette.text.primary:theme.palette.grey[400] }, disableUnderline: true }} disabled={sendDisabled}/>
                    <SendButton variant='contained' disabled={sendDisabled || messageText.trim() === ''} type='submit' sx={width<=MobileWidth?{height:'3rem', width:'3rem'}:{}}>
                        <ImageComponent src={SendIcon} alt='send' width={width<=MobileWidth?'1.2rem':'1.5rem'} height={width<=MobileWidth?'1.2rem':'1.5rem'}/>
                    </SendButton>
                </TypeBox>
            )}
            {reportModal && <ReportModal closeModal={handleReport} />}
        </Wrapper>
    )
}

export default ChatComponent