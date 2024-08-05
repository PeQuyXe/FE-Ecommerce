import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function useScrollRestoration() {
  const location = useLocation();
  const scrollPositions = useRef(new Map());

  useEffect(() => {
    // Lưu vị trí cuộn khi người dùng rời khỏi trang
    const saveScrollPosition = () => {
      scrollPositions.current.set(location.key, window.scrollY);
    };

    // Khôi phục vị trí cuộn khi trang được tải lại
    const restoreScrollPosition = () => {
      const savedPosition = scrollPositions.current.get(location.key);
      if (savedPosition !== undefined) {
        window.scrollTo(0, savedPosition);
      } else {
        window.scrollTo(0, 0); // Cuộn về đầu trang nếu không có vị trí đã lưu
      }
    };

    restoreScrollPosition(); // Khôi phục vị trí cuộn khi trang được tải lại

    // Lưu vị trí cuộn khi người dùng rời khỏi trang
    return () => {
      saveScrollPosition();
    };
  }, [location]);

  // Không cần phải trả về gì từ hook này
}

export default useScrollRestoration;
