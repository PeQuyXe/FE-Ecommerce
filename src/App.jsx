import { Outlet } from 'react-router-dom';
import Header from '../src/components/Home/Header';
import Footer from '../src/components/Home/Footer';
function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
