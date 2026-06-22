import { useState, useEffect, useRef } from "react";

export function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");
    setDone(false);

    const delayTimer = setTimeout(() => {
      const timer = setInterval(() => {
        indexRef.current += 1;
        if (indexRef.current > text.length) {
          clearInterval(timer);
          setDone(true);
          return;
        }
        setDisplayed(text.slice(0, indexRef.current));
      }, speed);
      return () => clearInterval(timer);
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, startDelay]);

  return { displayed, done };
}
