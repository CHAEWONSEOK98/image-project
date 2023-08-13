import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <Link to={`/`}>
        <button className="rounded-lg border-2 border-black px-4 py-2 ">
          Home
        </button>
      </Link>
      <Link to={`/upload`}>
        <button className="rounded-lg border-2 border-black px-4 py-2 ">
          Upload
        </button>
      </Link>
    </div>
  );
};

export default Header;
