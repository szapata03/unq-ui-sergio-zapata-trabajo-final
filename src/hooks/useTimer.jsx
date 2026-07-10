import { useState, useRef, useEffect } from "react";

export function useTimer(initialTime, onFinish) {
    const [time, setTime] = useState(initialTime);

    const intervalRef = useRef(null);

    function clearTimer() {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    function start() {
        clearTimer();

        setTime(initialTime);

        intervalRef.current = setInterval(() => {
            setTime((currentTime) => {

                if (currentTime <= 1) {
                    clearTimer();
                    onFinish?.();
                    return 0;
                }

                return currentTime - 1;
            });
        }, 1000);
    }

    function pause() {
        clearTimer();
    }

    function resume() {
        if (intervalRef.current !== null || time <= 0) return;

        intervalRef.current = setInterval(() => {
            setTime((currentTime) => {

                if (currentTime <= 1) {
                    clearTimer();
                    onFinish?.();
                    return 0;
                }

                return currentTime - 1;
            });
        }, 1000);
    }

    function stop() {
        clearTimer();
        setTime(initialTime);
    }

    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, []);

    return {
        time,
        start,
        pause,
        resume,
        stop,
    };
}