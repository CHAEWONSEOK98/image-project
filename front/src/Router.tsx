import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import UploadPage from './pages/UploadPage';
import InitialPage from './pages/InitialPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/upload',
        element: <UploadPage />,
      },
      {
        path: '/initial',
        element: <InitialPage />,
      },
    ],
  },
]);

export default router;
