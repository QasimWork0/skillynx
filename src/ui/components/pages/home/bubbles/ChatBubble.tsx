import React from 'react'
import { Box, Typography, styled } from '@mui/material'
// import LeftImage from 'assets/images/message_bubble-left.png'
// import RightImage from 'assets/images/message_bubble-right.png'

const Wrapper = styled(Box)<{ isleft?: string }>(({ isleft }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: isleft ? 'flex-start' : 'flex-end'
}))

const MessageBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  maxWidth: '70%',
  minWidth: '5%',
  padding: '1.2rem 2rem 0.2rem 2rem',
  boxShadow: `0px 2px 8px ${theme.palette.mode==='light'?'rgba(0, 0, 0, 0.2)':'rgba(255, 255, 255, 0.2)'}`,
  borderRadius: '1.2rem',
}))

const Date = styled(Typography)(({ theme }) => ({
  width:'100%',
  padding:'0 1rem',
  paddingTop: '0.6rem',
  textAlign:'end',
  fontSize:'1rem',
  fontWeight: 'bolder'
}))

const ChatBubble = ({ message, date, isLeft = false }: any) => {
  return (
    <Wrapper isleft={isLeft ? 'true' : undefined}>
      <MessageBox>
        <Typography>{message}</Typography>
        <Date >{date}</Date>
      </MessageBox>
    </Wrapper>
  )
}

export default ChatBubble