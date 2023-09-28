import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import UploadPage from './pages/UploadPage';
import InitialPage from './pages/InitialPage/InitialPage';
import ShowMorePage from './pages/showMorePage/ShowMorePage';
import InfiniteScrollPage from './pages/InfiniteScrollPage/InfiniteScrollPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/upload',
    element: <UploadPage />,
  },
  {
    path: '/initial',
    element: <InitialPage />,
  },
  {
    path: '/show-more',
    element: <ShowMorePage />,
  },
  {
    path: '/infinite-scroll',
    element: <InfiniteScrollPage />,
  },
]);

export default router;
