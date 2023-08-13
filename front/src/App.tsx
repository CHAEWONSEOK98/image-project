import Header from './components/Header';
import ImageList from './components/ImageList';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <div className="flex flex-col items-center md:flex md:flex-row">
        <ImageList />
      </div>
    </>
  );
};

export default App;
