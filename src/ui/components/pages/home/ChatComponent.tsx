import React, { useContext } from 'react'
import { Box, IconButton, TextField, Typography, styled } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import SendIcon from 'assets/icons/send-Filled_1_.png'
import ChatBubble from './bubbles/ChatBubble'
import { useTranslation } from 'react-i18next'
import { TextSizeContext } from 'data/index'
import { TextSizes } from 'entities/constants'

const Wrapper = styled(Box)(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: "0.4rem 2rem",
}))

const TypeBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    height: '6rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    borderRadius: '1rem'
}))

const DateBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    boxShadow: `0px 2px 8px ${theme.palette.mode==='light'?'rgba(0, 0, 0, 0.2)':'rgba(255, 255, 255, 0.2)'}`,
    borderRadius: '1rem',
    margin: '2px'
}))

const DateText = styled(Typography)(() => ({
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%'
}))

const MessageInput = styled(TextField)(() => ({
    padding: '0.7rem 2rem',
    // '.MuiInput-root': {
    //     fontSize: '1.5rem'
    // }
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

const ChatComponent = ({typingNotAllowed=false}:any) => {
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

    return (
        <Wrapper>
            <Box>
                <DateBox>
                    <DateText fontSize={TextSizes[textSize].title2}>Wednesday, March 22nd</DateText>
                </DateBox>
                <ChatBox>
                    {
                        messages.map((message, key) => (
                            <ChatBubble key={key} message={message.text} date={message.time} isLeft={message.isSystem}/>
                        ))
                    }
                </ChatBox>
            </Box>
            {!typingNotAllowed && (
                <TypeBox>
                    <MessageInput placeholder={`${t('Type a message')}...`} fullWidth
                        variant="standard" InputProps={{ sx:{fontSize:TextSizes[textSize].title3},disableUnderline: true }} />
                    <SendButton >
                        <ImageComponent src={SendIcon} alt='send' width='2rem' height='2rem' filterAllowed/>
                    </SendButton>
                </TypeBox>
            )}
        </Wrapper>
    )
}

export default ChatComponent