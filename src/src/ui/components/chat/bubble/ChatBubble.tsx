import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, IconButton, Typography, styled, useTheme } from '@mui/material'
import useFontSize from 'hooks/FontSize';
import { Report } from '@mui/icons-material';
import "./../../../../assets/styles/chatInteractiveElements.css"
import { MobileWidth } from 'entities/constants';
import useScreenSize from 'hooks/ScreenSize';

const Wrapper = styled(Box)<{ isleft?: string }>(({ isleft }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: isleft ? 'flex-start' : 'flex-end',
  // overflow:'clip'
}))

const MessageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '0.75rem',
  maxWidth: '100%',
  flexShrink: 0,
}))

const MessageTailBox = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.75rem',
  textTransform: 'none',
  justifyContent: 'flex-end',
  boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.1)',
  padding: 0,
  flexGrow: 1,
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
  flexShrink: 0
}))

const BubbleBox = styled(Box)(({ theme }) => ({
  borderRadius: '0.75rem',
  zIndex: 3,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  flexGrow: 1,
  width: '100%'
}))

const DateText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  padding: '0.5rem',
  userSelect: 'text'
}))

const Message = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.grey[400],
  width: '100%',
  padding: '1.5rem 3.25rem 1.5rem 1.5rem',
  textAlign: 'left',
  userSelect: 'text',
  wordWrap: 'break-word',
  'input': {
    cursor: 'pointer',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    width: '100%'
  },
  ':disabled': {
    'input': {
      cursor: 'no-drop',
    }
  }
}))

const ReportButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  alignSelf: 'flex-start',
  margin: '-0.rem',
}));

const TailIcon = ({ isLeft, color }: { isLeft: boolean, color: string }) => {
  const theme = useTheme()
  const leftTail = (
    <svg width="20px" height="40px" style={{ marginLeft: '-0.4rem', marginBottom: '-0.2rem' }}>
      <path
        fill={color || (theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[600])}
        d="M0.136963 34.7625C6.47176 36.1403 12.7254 31.2089 14.7557 28.0515C12.663 20.9964 25.5833 3.861 17.0557 3.86034C15.0838 3.86034 13.3997 -3.44205 6.22812 2.04016C6.20228 4.25639 6.22812 11.9278 6.22812 13.234C6.22812 31.3174 -1.08127 33.7235 0.136963 34.7625Z"
      />
    </svg>
  )

  const rightTail = (
    <svg width="20px" height="40px" style={{ marginRight: '-0.4rem', marginBottom: '-0.2rem', }}>
      <path
        fill={color || (theme.palette.mode === 'light' ? '#DCE2DD' : theme.palette.grey[600])}
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

const ChatBubble = ({ message, date, handleReport, isLeft = false, handleNext = (outputs: string) => { }, outputs = '' }: any, disabled = false) => {
  const [reportVisible, setReportVisible] = useState(false);
  const { width } = useScreenSize()
  const theme = useTheme()
  const bubbleRef = useRef(null)
  const fontSize = useFontSize()

  const handleClick = () => {
    setReportVisible(!reportVisible)
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const hours = date.getHours() % 12 || 12; // Get 12-hour format (adjust for AM/PM)
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero for single-digit minutes
    const ampm = hours >= 12 ? 'PM' : 'AM';

    return `${hours}:${minutes} ${ampm}`;
  }

  const decodeMessage = (message: string) => {
    const userName = localStorage.getItem('currentUserName')?.split(' ')[0] || ''

    const decodedMessage = decodeURIComponent(message)
    const finalMessage = decodedMessage.replaceAll("@user.name", userName)
    return finalMessage
  }

  const handleButtonClickWrapper = (event: any) => {
    const { target } = event;
    if (target.tagName.toLowerCase() === 'input' && target.type === 'submit') {
      handleNext(outputs.split(',')[target.id])
    }
  };

  useEffect(() => {
    const dragElements = document.querySelectorAll('.diadibi-drag-element');
    dragElements.forEach(element => {
      element.setAttribute('draggable', 'true');
    })

    if (!customElements.get('drag-drop')) {
      class DragDropElement extends HTMLElement {
        constructor() {
          super();

          // Add event listeners for drag and drop
          this.addEventListener('dragstart', this.handleDragStart);
          this.addEventListener('dragover', this.handleDragOver);
          this.addEventListener('drop', this.handleDrop);
        }

        // Handle dragstart event for draggable elements
        private handleDragStart(event: DragEvent): void {
          if (event.target instanceof HTMLElement) {
            event.target.classList.add("dragging");
            event.dataTransfer?.clearData()
            event.dataTransfer?.setData('text/plain', event.target.id || '');
          }
        }

        // Handle dragover event for drop zones
        private handleDragOver(event: DragEvent): void {
          event.preventDefault();
        }

        // Handle drop event for drop zones
        private handleDrop(event: DragEvent): void {
          event.preventDefault();
          const sourceId = event.dataTransfer?.getData('text/plain');
          const sourceElement = document.querySelector(`#${sourceId}.diadibi-drag-element`)
          if (sourceElement && event.target instanceof HTMLElement && event.target.classList.contains('diadibi-drop-zone') && event.target.childNodes.length===1) {
            const clone = sourceElement.cloneNode(true) as HTMLElement
            event.target.appendChild(clone)
            sourceElement.classList.remove('dragging')
            sourceElement.remove()
          }
        }
      }

      // Define the custom element tag name and register it
      customElements.define('drag-drop', DragDropElement);
    }
  }, []);

  return (
    <Wrapper isleft={isLeft ? 'true' : undefined} >
      <MessageBox sx={{ flexDirection: isLeft ? 'row' : 'row-reverse', maxWidth: width <= MobileWidth ? '100%' : '70%' }}>
        <UserIcon sx={{ backgroundColor: isLeft ? (theme.palette.mode === 'light' ? theme.palette.secondary.light : theme.palette.grey[600]) : theme.palette.grey[200] }}>
          {!isLeft ? window.localStorage.getItem("currentUserName")?.charAt(0) : ''}
        </UserIcon>
        <MessageTailBox sx={!handleReport ? { cursor: 'default' } : {}} disabled={false}>
          <TailIcon isLeft={isLeft} color={bubbleRef.current ? window.getComputedStyle(bubbleRef.current).backgroundColor : ''} />
          <BubbleBox onClick={handleClick} ref={bubbleRef}
            sx={{ backgroundColor: isLeft ? (theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[600]) : (theme.palette.mode === 'light' ? '#DCE2DD' : theme.palette.grey[600]), }}
          >
            <Message sx={width <= MobileWidth ? { padding: '1rem' } : {}}
              fontSize={fontSize.callout} dangerouslySetInnerHTML={{ __html: decodeMessage(message) }} onClick={handleButtonClickWrapper} />
            {date && <DateText sx={width <= MobileWidth ? { padding: '0.3rem 0.5rem' } : {}} fontSize={width <= MobileWidth ? fontSize.caption2 : fontSize.caption1}>{formatDate(date)}</DateText>}
            {handleReport && reportVisible &&
              <ReportButton onClick={handleReport}>
                <Report />
              </ReportButton>}
          </BubbleBox>
        </MessageTailBox>
      </MessageBox>
    </Wrapper>
  )
}

export default ChatBubble