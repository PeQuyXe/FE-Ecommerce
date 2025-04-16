import { useEffect, useState } from "react";

const DialogflowChatbot = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu script đã được thêm trước đó
    if (!document.querySelector('script[src*="bootstrap.js"]')) {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;

      script.onload = () => {
        setIsScriptLoaded(true);
      };

      document.body.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }
  }, []);

  return (
    <>
      {isScriptLoaded && (
        <df-messenger
          intent="WELCOME"
          chat-title="Chat Với Chúng Tôi"
          agent-id="64674736-10fa-4081-9f63-c743ab83843f"
          language-code="vi"
        ></df-messenger>
      )}
    </>
  );
};

export default DialogflowChatbot;
