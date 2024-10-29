import { GrLinkTop } from 'react-icons/gr';
import { useState, useEffect } from 'react';

const ScrolltoTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrolltoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-20">
      {isVisible && (
        <button
          type="button"
          onClick={scrolltoTop}
          className="p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        >
          <GrLinkTop />
        </button>
      )}
    </div>
  );
};

export default ScrolltoTop;
