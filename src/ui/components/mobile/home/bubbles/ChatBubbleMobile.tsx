import React from 'react'
import { Box, Typography, styled } from '@mui/material'
// import LeftImage from 'assets/images/message_bubble-left.png'
// import RightImage from 'assets/images/message_bubble-right.png'

const Wrapper = styled(Box)<{ isleft?: string }>(({ isleft }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: isleft ? 'flex-start' : 'flex-end'
}))

const MessageBox = styled(Box)<{ isleft?: string }>(({ theme, isleft }) => ({
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  maxWidth: '80%',
  minWidth: '3rem',
  padding: '0.4rem 0.6rem 0.4rem 1rem',
  boxShadow: `0px 2px 8px ${theme.palette.mode==='light'?'rgba(0, 0, 0, 0.2)':'rgba(255, 255, 255, 0.2)'}`,
  borderRadius: '0.6rem',
  alignItems:isleft ? 'flex-end' : 'flex-start',
  flexDirection: isleft ? 'row' : 'column',
  justifyContent:'flex-start'
}))

const Date = styled(Typography)(() => ({
  width: '3.8rem',
  textAlign:'end',
  fontSize:'0.65rem',
}))

const ChatBubbleMobile = ({ message, date, isLeft = false }: any) => {
  return (
    <Wrapper isleft={isLeft ? 'true' : undefined}>
      <MessageBox isleft={isLeft ? 'true' : undefined}>
        <Typography>{message}</Typography>
        <Date >{date}</Date>
      </MessageBox>
    </Wrapper>
  )
}

export default ChatBubbleMobile