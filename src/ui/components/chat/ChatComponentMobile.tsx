import React, { useContext, useState } from 'react'
import { Box, Button, IconButton, TextField, Typography, styled } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import SendIcon from 'assets/icons/send-Filled_1_.png'
import { useTranslation } from 'react-i18next'
import { TextSizes } from 'entities/constants'
import ChatBubbleMobile from './bubble/ChatBubbleMobile'
import BackgroundImage from "assets/images/Background_Chat.png";
import ReportModal from 'ui/components/chat/modal/ReportModal'
import { TextSizeContext } from 'data/index'
import ThumbUpIcon from 'assets/icons/Thumbs Up.png'
import ThumbDownIcon from 'assets/icons/Thumb Down.png'

const Wrapper = styled(Box)(({ theme }) => ({
    backgroundImage: `url(${BackgroundImage})`,
    backgroundColor: theme.palette.common.white,
    backgroundSize: "cover",
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}))

const TypeBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    minHeight: '4rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0.4rem 1rem',
    gap: '0.4rem',
    paddingBottom: '2rem',
}))

const MessageInput = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '1.4rem',
    padding: '0.08rem 1.4rem',
    '.MuiInput-root': {
        fontSize: '1.1rem'
    }
}))

const SendButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    borderRadius: '1.4rem',
    width: '3rem',
    height: '2.4rem',
    color: theme.palette.common.white,
    fontSize: '2.8rem',
    '&:hover': {
        backgroundColor: theme.palette.grey[600],
    }
}))

const ChatBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 2rem',
    gap: '0.5rem',
    flex: 1,
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
    padding: '0.25rem 2.4rem',
    fontWeight: 'bolder',
    height: '2.5rem'
}))

const ChatComponentMobile = ({ typingNotAllowed = false }: any) => {
    const { state: textSize } = useContext(TextSizeContext)
    const { t } = useTranslation()
    const [reportModal, setReportModal] = useState(false);

    const handleReport = () => {
        setReportModal(!reportModal)
    }

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

    return (
        <Wrapper>
            <ChatBox>
                {
                    messages.map((message, key) => (
                        <ChatBubbleMobile key={key} message={message.text} date={message.time} isLeft={message.isSystem}
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
            {!typingNotAllowed && (
                <TypeBox>
                    <MessageInput placeholder={`${t('Type a message')}...`} fullWidth multiline
                        variant="standard" InputProps={{ disableUnderline: true }} maxRows={4} />
                    <SendButton >
                        <ImageComponent src={SendIcon} alt='send' filterAllowed />
                    </SendButton>
                </TypeBox>
            )}
            {reportModal && <ReportModal closeModal={handleReport} />}
        </Wrapper>
    )
}

export default ChatComponentMobile