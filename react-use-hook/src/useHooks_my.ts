import { useCallback, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
function useMountedState(): () => boolean {
  const mountRef = useRef(false);
  const isMounted = useCallback(() => mountRef.current, []);

  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  }, []);
  return isMounted;
}

function useLifecycles(mount: Function, unmount?: Function): void {
  useEffect(() => {
    mount();
    console.log("inner MOUNTED");
    return () => {
      console.log("inner UNMOUNTED");
      unmount?.();
    };
  }, []);
}

function useCookie(cookieName: string): [string | null, (newValue: string, options?: Cookies.CookieAttributes) => void, () => void] {
  const [value, setValue] = useState<string | null>(() => Cookies.get(cookieName) || null);
  const updateCookie = useCallback(
    (newValue: string, options?: Cookies.CookieAttributes) => {
      Cookies.set(cookieName, newValue, options);
      setValue(newValue);
    },
    [cookieName]
  );
  const removeValue = useCallback(() => {
    Cookies.remove(cookieName);
    setValue(null);
  }, [cookieName]);

  return [value, updateCookie, removeValue];
}

export { useMountedState, useLifecycles, useCookie };
