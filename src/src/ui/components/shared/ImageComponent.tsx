import { useTheme } from '@mui/material'
import React from 'react'

const ImageComponent = ({ src, alt, width = '2rem', height = '2rem', borderRadius = '0', border = 'none', filterAllowed = false, filter = 'invert(100%)', transform='', objectFit=false }: { src: string, alt: string, width?: string, height?: string, borderRadius?: string, border?: string, filterAllowed?: boolean, filter?: string, transform?:string, objectFit?:boolean }) => {
    const theme = useTheme()
    return (
        <img src={src} alt={alt} style={{
            width: width,
            height: height,
            borderRadius: borderRadius,
            border: border,
            filter: filterAllowed && theme.palette.mode === 'dark' ? filter : 'none',
            flexShrink: 0,
            transform: transform,
            objectFit: objectFit? 'cover': 'fill'   
        }} />
    )
}

export default ImageComponent