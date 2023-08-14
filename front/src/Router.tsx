import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import UploadPage from './pages/UploadPage';
import InitialPage from './pages/InitialPage/InitialPage';
import PaginationPage from './pages/PaginationPage/PaginationPage';

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
]);

export default router;
