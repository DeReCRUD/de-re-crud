import { useEffect, useRef } from 'preact/hooks';

export default function useAfterMountEffect(cb, deps) {
  const mountedRef = useRef(false);

  useEffect(
    () => {
      if (!mountedRef.current) {
        mountedRef.current = true;
        return;
      }

      cb();
    },
    [deps],
  );
}
