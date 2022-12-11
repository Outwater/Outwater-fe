import { useState, useEffect, useCallback, useRef, RefObject } from 'react';

const useIntersection = (targetRef: RefObject<HTMLElement>) => {
  const observeRef = useRef<IntersectionObserver>();
  const [intersecting, setIntersectiong] = useState(false);

  const getObserver = useCallback(() => {
    if (!observeRef.current) {
      observeRef.current = new IntersectionObserver((entries) => {
        setIntersectiong(entries.some((entry) => entry.isIntersecting));
      });
    }
    return observeRef.current;
  }, [observeRef.current]);

  useEffect(() => {
    if (targetRef.current) {
      getObserver().observe(targetRef.current);
    }
  }, [targetRef.current]);

  return intersecting;
};

export default useIntersection;
