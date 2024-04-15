import React, { useState } from 'react'
import { Box, Button, IconButton, Typography, styled } from '@mui/material'
import ImageComponent from 'ui/components/shared/ImageComponent'
import MessageIcon from "assets/icons/Message 1.png";
// import LeftImage from 'assets/images/message_bubble-left.png'
// import RightImage from 'assets/images/message_bubble-right.png'

const Wrapper = styled(Box)<{ isleft?: string }>(({ isleft }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: isleft ? 'flex-start' : 'flex-end'
}))

const MessageBox = styled(Button)<{ isleft?: string }>(({ theme, isleft }) => ({
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  maxWidth: '80%',
  minWidth: '3rem',
  boxShadow: `0px 2px 8px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'}`,
  borderRadius: '0.6rem',
  alignItems: isleft ? 'flex-start' : 'flex-end',
  flexDirection: isleft ? 'row' : 'column',
  justifyContent: isleft ?'flex-end' : 'flex-start',
  textTransform: 'none',
  padding: '0.4rem 0.6rem 0.4rem 1rem',
  // alignItems: 'flex-end',
  // justifyContent: 'flex-start',
}))

const Date = styled(Typography)(() => ({
  width: '3.8rem',
  textAlign: 'end',
  fontSize: '0.65rem',
  alignSelf: 'flex-end'
}))

const Message = styled(Typography)(() => ({
  width: '100%',
  textAlign:'left'
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  boxShadow: `0px 2px 8px ${theme.palette.mode === "light"
    ? "rgba(0, 0, 0, 0.2)"
    : "rgba(255, 255, 255, 0.2)"
    }`,
  position: "absolute",
  marginRight: '-1.6rem',
  marginTop: '-1.6rem ',
  ':hover': {
    backgroundColor: theme.palette.secondary.dark,
  }
}));

const ChatBubbleMobile = ({ message, date, handleReport, isLeft = false }: any) => {
  const [reportVisible, setReportVisible] = useState(false);
  const handleClick = () => {
    setReportVisible(!reportVisible)
  }

  return (
    <Wrapper isleft={isLeft ? 'true' : undefined}>
      <MessageBox isleft={isLeft ? 'true' : undefined} onClick={handleClick}>
        <Message>{message}</Message>
        <Date >{date}</Date>
        {reportVisible &&
          <CloseButton onClick={handleReport} >
            <ImageComponent
              src={MessageIcon}
              alt="close"
              width='1.4rem'
              height="auto"
              filterAllowed
            />
          </CloseButton>}
      </MessageBox>
    </Wrapper>
  )
}

export default ChatBubbleMobile