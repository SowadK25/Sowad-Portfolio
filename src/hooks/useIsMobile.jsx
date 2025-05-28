import { useState, useEffect } from 'react';

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const maxSize = 900

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= maxSize);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return isMobile;
}
