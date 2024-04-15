import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/material'

const Wrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    width: '5.5rem',
    height: '2.5rem',
    padding: '0.8125rem 1.4375rem',
    justifyCcontent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: '2.625rem',
    margin: '0.5rem 0 0 3.8rem',
    boxShadow: '0px 4px 7px 0px rgba(193, 193, 193, 0.25)',
    gap:'0.44rem'
}))

const Dot = styled(Box)<{selected?:string}>(({ theme, selected }) => ({
    backgroundColor: '#234A5A',
    width: '0.5rem',
    height: '0.5rem',
    flexShrink: 0,
    borderRadius: '50%',
    opacity: selected? 1:0.6
}))

const ChatLoader = () => {
    const [selectedDot, setSelectedDot] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSelectedDot((prevDot) => (prevDot === 3 ? 1 : prevDot + 1))
        }, 400);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Wrapper>
            <Dot selected={selectedDot===1? 'true':undefined}/>
            <Dot selected={selectedDot===2? 'true':undefined}/>
            <Dot selected={selectedDot===3? 'true':undefined}/>
        </Wrapper>
    )
}

export default ChatLoader