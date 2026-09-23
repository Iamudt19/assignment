import { useState, useEffect } from 'react';

export interface CountdownResult {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  formattedString: string;
  isExpired: boolean;
}

export const useCountdown = (targetDate?: string | Date): CountdownResult => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!targetDate) return;

    const targetTime = new Date(targetDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;
      setTimeLeft(Math.max(0, difference));
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const days = String(Math.floor(timeLeft / (1000 * 60 * 60 * 24))).padStart(2, '0');
  const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft / 1000 / 60) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  const isExpired = timeLeft <= 0;
  const formattedString = isExpired
    ? 'Registration Closed'
    : `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;

  return {
    days,
    hours,
    minutes,
    seconds,
    formattedString,
    isExpired,
  };
};
