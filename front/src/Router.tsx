import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import UploadPage from './pages/UploadPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/upload',
    element: <UploadPage />,
  },
]);

export default router;
