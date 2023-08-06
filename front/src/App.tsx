import UploadForm from './components/UploadForm';
import ImageList from './components/ImageList';

const App = () => {
  return (
    <div className="flex flex-col items-center md:flex md:flex-row">
      <UploadForm />
      <ImageList />
    </div>
  );
};

export default App;
