"use client"

import React, { useEffect, useRef } from 'react'
import { useQRCode } from 'next-qrcode';
interface QRCodeGeneratorProps{
    data: string
}

const QrCodeGenerator = ({data}: QRCodeGeneratorProps) => {
 const { Canvas } = useQRCode();

  return (
    <Canvas
      text={data}
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#000000",
          light: "#3B3B3B",
        },
      }}
    />
  );
}

export default QrCodeGenerator