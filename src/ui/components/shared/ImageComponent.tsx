import { useTheme } from '@mui/material'
import React from 'react'

const ImageComponent = ({src, alt, width='1.5rem', height='1.5rem', borderRadius='0', border='none', filterAllowed=false, filter='invert(100%)'}:{src:string, alt:string, width?:string, height?:string, borderRadius?:string, border?:string, filterAllowed?:boolean, filter?:string}) => {
    const theme = useTheme()
    return (
        <img src={src} alt={alt} style={{ width: width, height: height, borderRadius:borderRadius, border:border, filter: filterAllowed && theme.palette.mode==='dark' ? filter:'none' }} />
    )
}

export default ImageComponent