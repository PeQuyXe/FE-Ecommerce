import { useEffect } from 'react';

const DialogflowChatbot = () => {
  useEffect(() => {
    // Kiểm tra xem custom element đã được đăng ký chưa
    if (!window.customElements.get('df-messenger')) {
      const script = document.createElement('script');
      script.src =
        'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
      script.async = true;

      // Đánh dấu rằng script đã được tải
      script.onload = () => {
        window.dfMessengerLoaded = true;
      };

      // Thêm script vào body
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        window.dfMessengerLoaded = false;
      };
    }
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="Chatbot"
      agent-id="64674736-10fa-4081-9f63-c743ab83843f"
      language-code="vi"
    ></df-messenger>
  );
};

export default DialogflowChatbot;
