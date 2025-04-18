'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>(format(new Date(), 'HH:mm:ss'));
  const [message, setMessage] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isYellowBackground, setIsYellowBackground] = useState<boolean>(true);

  const formatTime = (time: string): string => {
    return time.startsWith('0') ? time.substring(1) : time;
  };

  const formatRemainingTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prev) => prev - 1000);
        setIsYellowBackground((prev) => !prev);
      } else {
        setCurrentTime(formatTime(format(new Date(), 'HH:mm:ss')));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await fetch('/api/message');
      const data = await res.json();

      if (data.timeRemaining > 0) {
        setMessage(data.message);
        setTimeRemaining(data.timeRemaining);
      } else {
        setMessage(null);
        setTimeRemaining(0);
      }
    };

    const messageInterval = setInterval(fetchMessage, 5000);
    fetchMessage();

    return () => clearInterval(messageInterval);
  }, []);

  const getFontSize = (): string => {
    if (message && message.length > 60) return 'text-[96px]';
    if (message && message.length > 8) return 'text-[144px]';
    return 'text-[288px]';
  };

  return (
    <div
      className={`flex flex-col justify-center items-center h-screen ${
        message && isYellowBackground ? 'bg-yellow-500 text-blue-500' : 'bg-black text-white'
      }`}
    >
      {message && timeRemaining > 0 ? (
        <div className="text-center">
          <h1 className={`font-bold ${getFontSize()}`}>{message}</h1>
          <p className="text-[48px] font-semibold mt-4">
            Time left: {formatRemainingTime(timeRemaining)}
          </p>
        </div>
      ) : (
        <h1 className="font-bold text-[288px]">{currentTime}</h1>
      )}
    </div>
  );
}
