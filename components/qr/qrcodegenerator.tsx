"use client"

import React, { useEffect, useRef } from 'react'
import QRCode  from 'qrcode'

interface QRCodeGeneratorProps{
    data: string
}

const QrCodeGenerator = ({data}: QRCodeGeneratorProps) => {

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current;

        QRCode.toCanvas(canvas, data, {width: 300}, (error) => {
            if(error) {
                console.error("Errore nella generazione del QR code", error)
            }
        })
    }, [data])

    return (
        <canvas ref={canvasRef}/>
    )
}

export default QrCodeGenerator