import React, { useContext, useState } from 'react'
import { Box, Button, IconButton, TextField, Typography, styled } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import SendIcon from 'assets/icons/send-Filled_1_.png'
import ThumbUpIcon from 'assets/icons/Thumbs Up.png'
import ThumbDownIcon from 'assets/icons/Thumb Down.png'
import ChatBubble from './bubbles/ChatBubble'
import { useTranslation } from 'react-i18next'
import { TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'
import ReportModal from './modal/ReportModal'

const Wrapper = styled(Box)(() => ({
    width: '100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: "0.4rem 2rem",
    flexShrink: 0,
}))

const TypeBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    height: '6rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    borderRadius: '1rem',
    gap: '2rem',
    flexShrink: 0
}))

const DateBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    boxShadow: `0px 2px 8px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'}`,
    borderRadius: '1rem',
    margin: '2px'
}))

const DateText = styled(Typography)(() => ({
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%'
}))

const MessageInput = styled(TextField)(({ theme }) => ({
    padding: '0.7rem 2rem',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '1rem',
    // '.MuiInput-root': {
    //     fontSize: '1.5rem'
    // }
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

const SendButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    borderRadius: '50%',
    width: '5rem',
    height: '5rem',
    color: theme.palette.common.white,
    fontSize: '2.8rem',
    '&:hover': {
        backgroundColor: theme.palette.grey[600],
    }
}))

const ChatBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[400],
    padding: '2rem 3rem',
    gap: '1rem',
    borderRadius: '1.2rem'
}))

const ChatComponent = ({ isInModal=false ,typingNotAllowed = false }: any) => {
    const [reportModal, setReportModal] = useState(false);
    const { state: textSize } = useContext(TextSizeContext)
    const { t } = useTranslation()
    const messages = [
        {
            isSystem: false,
            text: "Hey",
            time: '6:29 PM'
        },
        {
            isSystem: true,
            text: "Oh, hey Martina! It's so good to see you!",
            time: '6:30 PM'
        },
    ]

    const handleReport = ()=>{
        setReportModal(!reportModal)
    }

    return (
        <Wrapper >
            <Box>
                <DateBox>
                    <DateText fontSize={TextSizes[textSize].title2}>Wednesday, March 22nd</DateText>
                </DateBox>
                <ChatBox>
                    {
                        messages.map((message, key) => (
                            <ChatBubble key={key} message={message.text} date={message.time} isLeft={message.isSystem}
                                handleReport={handleReport} />
                        ))
                    }
                </ChatBox>
                <FeedbackBox>
                    <FeedbackText fontSize={TextSizes[textSize].title3}>{t('How did you like this Microlearning?')}</FeedbackText>
                    <FeedbackButtonBox>
                        <FeedbackButton variant='contained' color='success'>
                            <ImageComponent src={ThumbUpIcon} alt='send' width='2rem' height='2rem' filterAllowed />
                        </FeedbackButton>
                        <FeedbackButton variant='contained' color='error'>
                            <ImageComponent src={ThumbDownIcon} alt='send' width='2rem' height='2rem' filterAllowed />
                        </FeedbackButton>
                        <FeedbackButton variant='contained' color='secondary' sx={{ fontSize: TextSizes[textSize].body }}>{t('Skip')}</FeedbackButton>
                    </FeedbackButtonBox>
                </FeedbackBox>
            </Box>
            {!typingNotAllowed && (
                <TypeBox>
                    <MessageInput placeholder={`${t('Type a message')}...`} fullWidth
                        variant="standard" InputProps={{ sx: { fontSize: TextSizes[textSize].title3 }, disableUnderline: true }} />
                    <SendButton >
                        <ImageComponent src={SendIcon} alt='send' width='2rem' height='2rem' filterAllowed />
                    </SendButton>
                </TypeBox>
            )}
            {reportModal && <ReportModal closeModal={handleReport}/>}
        </Wrapper>
    )
}

export default ChatComponent