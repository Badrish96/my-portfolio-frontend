import { useRef, useEffect } from 'react';

export default function useThrottle(value, limit) {
  const ref = useRef(value);
  useEffect(() => {
    const id = setTimeout(() => (ref.current = value), limit);
    return () => clearTimeout(id);
  }, [value, limit]);
  return ref.current;
}
