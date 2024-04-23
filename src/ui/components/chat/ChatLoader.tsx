import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/material'
import useScreenSize from 'hooks/ScreenSize'
import { MobileWidth } from 'entities/constants'

const Wrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode==='light'? theme.palette.common.white:theme.palette.grey[600],
    display: 'flex',
    width: '5.5rem',
    height: '2.5rem',
    padding: '0.8125rem 1.4375rem',
    justifyCcontent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: '2.625rem',
    margin: '0.5rem 0 0 3.8rem',
    boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.1)',
    gap:'0.44rem'
}))

const Dot = styled(Box)<{selected?:string}>(({ theme, selected }) => ({
    backgroundColor: theme.palette.mode==='light'? '#234A5A': '#FCFCFC',
    width: '0.5rem',
    height: '0.5rem',
    flexShrink: 0,
    borderRadius: '50%',
    opacity: selected? 1:0.6,
    transition: 'opacity 0.3s ease-in-out'
}))

const ChatLoader = ({isInModal}:any) => {
    const [selectedDot, setSelectedDot] = useState(1);
    const {width} = useScreenSize() 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSelectedDot((prevDot) => (prevDot === 3 ? 1 : prevDot + 1))
        }, 300);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Wrapper sx={width<=MobileWidth || isInModal?{margin:'0.5rem'}:{}}>
            <Dot selected={selectedDot===1? 'true':undefined}/>
            <Dot selected={selectedDot===2? 'true':undefined}/>
            <Dot selected={selectedDot===3? 'true':undefined}/>
        </Wrapper>
    )
}

export default ChatLoader