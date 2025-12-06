'use client';

interface BackgroundImageProps {
  imagePath: string;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: string;
}

export default function BackgroundImage({ imagePath, className = '', style = {}, aspectRatio }: BackgroundImageProps) {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        aspectRatio: aspectRatio || 'auto',
        ...style
      }}
    />
  );
}

