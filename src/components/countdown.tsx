import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string; // ISO string or any format parsable by Date
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

  return (
    <div className="flex gap-4 max-[450px]:gap-2 text-center 
                    text-xl max-[325px]:text-sm max-[450px]:text-lg md:text-2xl lg:text-3xl lg:gap-6">
        <div className="flex flex-col gap-2">
            <span>{timeLeft.days}</span>
            <p>Days</p>
        </div>
        :
        <div className="flex flex-col gap-2">
            <span>{timeLeft.hours}</span>
            <p>Hours</p>
        </div>
        :
        <div className="flex flex-col gap-2">
            <span>{timeLeft.minutes}</span>
            <p>Minutes</p>
        </div>
        :
        <div className="flex flex-col gap-2">
            <span>{timeLeft.seconds}</span>
            <p>Seconds</p>
        </div>
    </div>
  );
};

export default Countdown;
