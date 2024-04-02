import React, { useState } from 'react'
import { Box, Button, IconButton, Typography, styled } from '@mui/material'
import MessageIcon from "assets/icons/Message 1.png";
import ImageComponent from 'ui/components/shared/ImageComponent';
import { MobileWidth } from 'entities/constants';
import useScreenSize from 'hooks/ScreenSize';
// import LeftImage from 'assets/images/message_bubble-left.png'
// import RightImage from 'assets/images/message_bubble-right.png'

const Wrapper = styled(Box)<{ isleft?: string }>(({ isleft }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: isleft ? 'flex-start' : 'flex-end'
}))

const MessageBox = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textTransform: 'none',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  backgroundColor: theme.palette.common.white,
  maxWidth: '70%',
  minWidth: '6rem',
  padding: '1.2rem 2rem 0.2rem 2rem',
  boxShadow: `0px 2px 8px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'}`,
  borderRadius: '1.2rem',
}))

const Date = styled(Typography)(({ theme }) => ({
  width: '100%',
  paddingRight: '1rem',
  paddingTop: '0.6rem',
  textAlign: 'end',
  fontSize: '1rem',
  fontWeight: 'bolder'
}))

const Message = styled(Typography)(({ theme }) => ({
  width:'100%',
  textAlign: 'left',
}))

const CloseButton = styled(IconButton)<{ isweb?: string }>(({ theme, isweb }) => ({
  backgroundColor: isweb && theme.palette.common.white,
  boxShadow: isweb && `0px 2px 8px ${theme.palette.mode === "light"
    ? "rgba(0, 0, 0, 0.2)"
    : "rgba(255, 255, 255, 0.2)"
    }`,
  position: "absolute",
  margin: isweb && '-2.4rem -3rem',
  ':hover': {
    backgroundColor: isweb && theme.palette.secondary.dark,
  }
}));

const ChatBubble = ({ message, date, handleReport, isLeft = false }: any) => {
  const [reportVisible, setReportVisible] = useState(false);
  const { width } = useScreenSize()

  const handleClick = () => {
    setReportVisible(!reportVisible)
  }

  return (
    <Wrapper isleft={isLeft ? 'true' : undefined}>
      <MessageBox onClick={handleClick}>
        <Message >{message}</Message>
        <Date >{date}</Date>
        {reportVisible &&
          <CloseButton onClick={handleReport} isweb={width > MobileWidth ? 'true' : undefined}>
            <ImageComponent
              src={MessageIcon}
              alt="close"
              width={width > MobileWidth ? "1.8rem" : '1.4rem'}
              height="auto"
              filterAllowed
            />
          </CloseButton>}
      </MessageBox>
    </Wrapper>
  )
}

export default ChatBubble