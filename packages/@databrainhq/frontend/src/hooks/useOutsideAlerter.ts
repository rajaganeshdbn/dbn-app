import { useEffect } from 'react';

type UseOutsideAlerterProps = {
  onOutsideClick: () => void;
  wrapRef: React.RefObject<any>;
};

const useOutsideAlerter = ({
  onOutsideClick,
  wrapRef,
}: UseOutsideAlerterProps) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        onOutsideClick();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapRef, onOutsideClick]);
};

export default useOutsideAlerter;
