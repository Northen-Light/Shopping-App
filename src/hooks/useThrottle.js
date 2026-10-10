import { useEffect, useRef, useState } from 'react';

export const useThrottle = (value, delay = 1000) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const isThrottled = useRef(false);
  const nextValue = useRef(null);

  useEffect(() => {
    if (!isThrottled.current) {
      setThrottledValue(value);
      isThrottled.current = true;

      setTimeout(() => {
        if (nextValue.current !== null) {
          setThrottledValue(nextValue.current);
          nextValue.current = null;
        }
        isThrottled.current = false;
      }, delay);
    } else {
      nextValue.current = value;
    }
  }, [value, delay]);

  return throttledValue;
};
