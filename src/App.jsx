import { Outlet } from 'react-router-dom';
import Header from '../src/components/Home/Header';
import Footer from '../src/components/Home/Footer';
import DialogflowChatbot from '../src/components/Chatbot/DialogflowChatbot';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <DialogflowChatbot />
      <Footer />
    </div>
  );
}

export default App;
