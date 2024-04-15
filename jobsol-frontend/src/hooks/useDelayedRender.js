import { useState, useEffect } from 'react';

function useDelayedRender(delay) {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(true);
    }, delay);

    return () => clearTimeout(timer); // Clear the timeout when the component unmounts
  }, [delay]);

  return showComponent;
}

export default useDelayedRender;
