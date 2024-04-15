import React, { useRef, useState } from 'react'
import { Box, Button, IconButton, Typography,  styled, useTheme } from '@mui/material'
import useFontSize from 'hooks/FontSize';
import { Report } from '@mui/icons-material';

const Wrapper = styled(Box)<{ isleft?: string }>(({ isleft }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: isleft ? 'flex-start' : 'flex-end'
}))

const MessageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '0.75rem',
  maxWidth: '70%',
  flexShrink:0,
}))

const MessageTailBox = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.75rem',
  textTransform: 'none',
  justifyContent: 'flex-end',
  boxShadow: '0px 4px 7px 0px rgba(193, 193, 193, 0.25)',
  padding: 0,
  flexGrow:1,
}))

const UserIcon = styled(Typography)(({ theme }) => ({
  width: '3rem',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  color: theme.palette.common.white,
  fontSize: '1.5rem',
  flexShrink:0
}))

const BubbleBox = styled(Box)(({ theme }) => ({
  borderRadius: '0.75rem',
  zIndex: 3,
  display:'flex',
  justifyContent:'flex-end',
  alignItems:'flex-end',
  flexGrow:1,
  width:'100%'
}))

const DateText = styled(Typography)(({ theme }) => ({
  position:'absolute',
  padding:'0.5rem',
  userSelect: 'text'
}))

const Message = styled(Typography)(({ theme }) => ({
  width: '100%',
  padding:'1.5rem 3.25rem 1.5rem 1.5rem',
  textAlign:'left',
  userSelect:'text'
}))

const ReportButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  alignSelf:'flex-start',
  margin: '-0.rem',
}));

const TailIcon = ({ isLeft, color }: { isLeft: boolean, color: string }) => {
  const theme = useTheme()
  const leftTail = (
    <svg width="20px" height="40px" style={{ marginLeft: '-0.4rem', marginBottom: '-0.2rem' }}>
      <path
        fill={color || theme.palette.secondary.light}
        d="M0.136963 34.7625C6.47176 36.1403 12.7254 31.2089 14.7557 28.0515C12.663 20.9964 25.5833 3.861 17.0557 3.86034C15.0838 3.86034 13.3997 -3.44205 6.22812 2.04016C6.20228 4.25639 6.22812 11.9278 6.22812 13.234C6.22812 31.3174 -1.08127 33.7235 0.136963 34.7625Z"
      />
    </svg>
  )

  const rightTail = (
    <svg width="20px" height="40px" style={{ marginRight: '-0.4rem', marginBottom: '-0.2rem', }}>
      <path
        fill={color || '#DCE2DD'}
        d="M19.863 34.7625C13.5282 36.1403 7.27465 31.2089 5.24426 28.0515C7.33703 20.9964 -5.58327 3.861 2.94435 3.86034C4.91619 3.86034 6.60034 -3.44205 13.7719 2.04016C13.7977 4.25639 13.7719 11.9278 13.7719 13.234C13.7719 31.3174 21.0813 33.7235 19.863 34.7625Z"
      />
    </svg>
  )

  return (
    <Box sx={{
      position: 'absolute',
      zIndex: 2,
      width: '100%',
      display: 'flex',
      justifyContent: isLeft ? 'flex-start' : 'flex-end',
      // backgroundColor: 'red'
    }}>
      {isLeft ? leftTail : rightTail}
    </Box>
  )
}

const ChatBubble = ({ message, date, handleReport, isLeft = false }: any) => {
  const [reportVisible, setReportVisible] = useState(false);
  const theme = useTheme()
  const bubbleRef = useRef(null)
  const fontSize = useFontSize()

  const handleClick = () => {
    setReportVisible(!reportVisible)
  }

  function formatDate(dateString:string):string  {
    const date = new Date(dateString)
    const hours = date.getHours() % 12 || 12; // Get 12-hour format (adjust for AM/PM)
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero for single-digit minutes
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <Wrapper isleft={isLeft ? 'true' : undefined}>
      <MessageBox sx={{ flexDirection: isLeft ? 'row' : 'row-reverse' }}>
        <UserIcon sx={{ backgroundColor: isLeft ? theme.palette.secondary.light : theme.palette.grey[200] }}>
          {!isLeft ? window.localStorage.getItem("currentUserName")?.charAt(0) : ''}
        </UserIcon>
        <MessageTailBox sx={!handleReport? {cursor:'default'}:{}}>
          <TailIcon isLeft={isLeft} color={bubbleRef.current ? window.getComputedStyle(bubbleRef.current).backgroundColor : ''} />
          <BubbleBox onClick={handleClick} ref={bubbleRef}
            sx={{ backgroundColor: isLeft ? theme.palette.common.white : '#DCE2DD', }}
          >
            <Message fontSize={fontSize.callout} dangerouslySetInnerHTML={{__html:decodeURIComponent(message)}}></Message>
            <DateText fontSize={fontSize.caption1}>{formatDate(date)}</DateText>
            {handleReport && reportVisible &&
              <ReportButton onClick={handleReport}>
                <Report/>
              </ReportButton>}
          </BubbleBox>
        </MessageTailBox>
      </MessageBox>
    </Wrapper>
  )
}

export default ChatBubble