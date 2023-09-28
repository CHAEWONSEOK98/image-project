import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import UploadPage from './pages/UploadPage';
import InitialPage from './pages/InitialPage/InitialPage';
import PaginationPage from './pages/PaginationPage/PaginationPage';
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
    path: '/pagination',
    element: <PaginationPage />,
  },
  {
    path: '/infinite-scroll',
    element: <InfiniteScrollPage />,
  },
]);

export default router;
