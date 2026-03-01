'use client'

import { useEffect, useState } from 'react'

const Countdown = ({ targetDate }: { targetDate: string }) => {
    const calculate = () => {
        const diff = +new Date(targetDate) - +new Date()
        if (diff <= 0) return null

        return {
            d: Math.floor(diff / 86400000),
            h: Math.floor((diff / 3600000) % 24),
            m: Math.floor((diff / 60000) % 60),
            s: Math.floor((diff / 1000) % 60),
        }
    }

    const [time, setTime] = useState(calculate())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calculate())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    if (!time) {
        return (
            <pre className="font-mono text-sm sm:text-lg md:text-2xl lg:text-3xl text-twelve text-center
                            bg-one p-4 rounded-2xl">
                [event.timer] → status: LIVE
            </pre>
        )
    }

    return (
        <div className="font-mono text-twelve bg-one
                        flex flex-col justify-center rounded-2xl"
        >
            <div className='bg-two h-7 rounded-t-2xl flex justify-between px-4 py-0.5'>
                <div className='flex items-center h-full gap-2'>
                   <div className='h-4 w-4 bg-twelve rounded-full'/>
                   <div className='h-4 w-4 bg-nine rounded-full'/>
                   <div className='h-4 w-4 bg-ten rounded-full'/>
                </div>

                <div>
                    <p className='text-four'>Itrix Countdown</p>
                </div>

                <div className='flex items-center h-full gap-2'>
                   <div className='h-4 w-4 bg-twelve rounded-full'/>
                   <div className='h-4 w-4 bg-nine rounded-full'/>
                   <div className='h-4 w-4 bg-ten rounded-full'/>
                </div>
            </div>

            <div className='p-4'>
                <pre className="text-[11px] min-[375px]:text-sm text-[500px]:text-base lg:text-lg
                            leading-relaxed
                            whitespace-pre-wrap
                            break-words"
                >
                    {`ITRIX in ISTA via v26.3.2026 …\n➜ systemctl status itrix26.timer\n\n● itrix26.timer - Event Countdown Daemon\nLoaded: loaded (/usr/lib/systemd/system/itrix26.timer)\nActive: active (running)`}
                </pre>

                <div
                    className="
                        font-bold
                        tracking-widest
                        text-center
                        my-4
                        // text-[clamp(1.8rem,6vw,4.5rem)]
                        // drop-shadow-[0_0_10px_#00FF9F]
                    "
                >
                    {String(time.d).padStart(2,'0')}:
                    {String(time.h).padStart(2,'0')}:
                    {String(time.m).padStart(2,'0')}:
                    {String(time.s).padStart(2,'0')}
                </div>

                <pre className="text-[11px] min-[375px]:text-sm text-[500px]:text-base lg:text-lg whitespace-pre-wrap">
                    {`[event.timer] :: T-minus ${time.d}d ${time.h}h ${time.m}m ${time.s}s`}
                </pre>
            </div>
           

        </div>
    )
}

export default Countdown