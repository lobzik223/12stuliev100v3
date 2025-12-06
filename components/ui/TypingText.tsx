'use client';

import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function TypingText({ text, speed = 50, delay = 0, className = '', style }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(false);
    
    let typingInterval: NodeJS.Timeout | null = null;
    
    const timer = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      
      typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          if (typingInterval) {
            clearInterval(typingInterval);
          }
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (typingInterval) {
        clearInterval(typingInterval);
      }
    };
  }, [text, speed, delay]);

  return (
    <span className={className} style={style}>
      {displayedText}
      {isTyping && displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

