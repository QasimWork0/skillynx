import React from 'react'
import { Box, IconButton, TextField, styled } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import SendIcon from 'assets/icons/send-Filled_1_.png'
import ChatBubble from '../../pages/home/bubbles/ChatBubble'
import { useTranslation } from 'react-i18next'
import useScreenSize from 'hooks/ScreenSize'
import { MobileWidth } from 'entities/constants'
import ChatBubbleMobile from './bubbles/ChatBubbleMobile'
import BackgroundImage from "assets/images/Background_Chat.png";

const Wrapper = styled(Box)(({theme}) => ({
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

const MessageInput = styled(TextField)(({theme}) => ({
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
    flex:1,
}))

const ChatComponentMobile = ({ typingNotAllowed = false }: any) => {
    const { t } = useTranslation()
    const { width } = useScreenSize()

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
                        width > MobileWidth ? (
                            <ChatBubble key={key} message={message.text} date={message.time} isLeft={message.isSystem} />
                        ) : (
                            <ChatBubbleMobile key={key} message={message.text} date={message.time} isLeft={message.isSystem} />
                        )
                    ))
                }
            </ChatBox>
            {!typingNotAllowed && (
                <TypeBox>
                    <MessageInput placeholder={`${t('Type a message')}...`} fullWidth multiline
                        variant="standard" InputProps={{ disableUnderline: true }} maxRows={4}/>
                    <SendButton >
                        <ImageComponent src={SendIcon} alt='send' filterAllowed />
                    </SendButton>
                </TypeBox>
            )}
        </Wrapper>
    )
}

export default ChatComponentMobile