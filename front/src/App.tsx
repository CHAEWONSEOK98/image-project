import Header from './components/Header';
import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Link to={`/initial`}>
        <button className="cursor-pointer rounded-xl border-2 border-black p-8">
          initialPage
        </button>
      </Link>
    </>
  );
};

export default App;
