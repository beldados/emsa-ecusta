'use client';

import * as React from 'react';
import QRCode from 'qrcode';

interface CertificateQRCodeProps {
  url: string;
  size?: number;
}

export function CertificateQRCode({ url, size = 80 }: CertificateQRCodeProps) {
  const [qrDataUrl, setQrDataUrl] = React.useState<string>('');

  React.useEffect(() => {
    QRCode.toDataURL(url, {
      width: size,
      margin: 1,
      color: {
        dark: '#050B14',
        light: '#FFFFFF',
      },
    })
      .then((dataUri) => setQrDataUrl(dataUri))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, [url, size]);

  if (!qrDataUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded bg-white text-[10px] font-bold text-brand-midnight"
      >
        QR
      </div>
    );
  }

  return (
    <img
      src={qrDataUrl}
      alt="Verification QR Code"
      width={size}
      height={size}
      className="rounded border border-black/10 shadow-sm"
    />
  );
}
