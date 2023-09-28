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
      <Link to={`/show-more`}>
        <button className="cursor-pointer rounded-xl border-2 border-black p-8">
          showMorePage
        </button>
      </Link>
      <Link to={`/infinite-scroll`}>
        <button className="cursor-pointer rounded-xl border-2 border-black p-8">
          infiniteScrollPage
        </button>
      </Link>
    </>
  );
};

export default App;
