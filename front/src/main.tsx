import ReactDOM from 'react-dom/client';
import './index.css';

// recoil
import { RecoilRoot } from 'recoil';

// router
import { RouterProvider } from 'react-router-dom';
import router from './Router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </>
);
