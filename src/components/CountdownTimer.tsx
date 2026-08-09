import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2ED573]/10 border border-[#2ED573]/30 text-[#2ED573] font-bold">
        <span className="w-2.5 h-2.5 rounded-full bg-[#2ED573] animate-ping" />
        <span>OFFICIAL REGISTRATIONS ARE NOW LIVE!</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto my-6 p-4 sm:p-6 rounded-2xl bg-[#1A1D22]/80 border border-[#E8B923]/30 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E8B923]">
          <Timer className="w-4 h-4" />
          <span>Launch Countdown</span>
        </div>
        <span className="text-xs text-[#2ED573] font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2ED573] animate-pulse" />
          Pre-Registration Open
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
        {/* Days */}
        <div className="p-2 sm:p-3 rounded-xl bg-[#0D0F12] border border-white/5">
          <div className="text-2xl sm:text-4xl font-black font-mono text-[#F5F5F5]">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs font-medium uppercase text-[#8A8F98] tracking-wider mt-1">
            Days
          </div>
        </div>

        {/* Hours */}
        <div className="p-2 sm:p-3 rounded-xl bg-[#0D0F12] border border-white/5">
          <div className="text-2xl sm:text-4xl font-black font-mono text-[#E8B923]">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs font-medium uppercase text-[#8A8F98] tracking-wider mt-1">
            Hours
          </div>
        </div>

        {/* Minutes */}
        <div className="p-2 sm:p-3 rounded-xl bg-[#0D0F12] border border-white/5">
          <div className="text-2xl sm:text-4xl font-black font-mono text-[#F5F5F5]">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs font-medium uppercase text-[#8A8F98] tracking-wider mt-1">
            Mins
          </div>
        </div>

        {/* Seconds */}
        <div className="p-2 sm:p-3 rounded-xl bg-[#0D0F12] border border-white/5 relative overflow-hidden">
          <div className="text-2xl sm:text-4xl font-black font-mono text-[#E8B923]">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs font-medium uppercase text-[#8A8F98] tracking-wider mt-1">
            Secs
          </div>
        </div>
      </div>
    </div>
  );
};
