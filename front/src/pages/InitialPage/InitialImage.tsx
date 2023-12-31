import axios from 'axios';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { imageState } from '../../atoms/atoms';

const InitialImage = () => {
  const [images, setImages] = useRecoilState(imageState);

  useEffect(() => {
    getImageData();
  }, []);

  const getImageData = async (): Promise<void> => {
    try {
      const response = await axios.get('/api/images');
      setImages(response.data);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get Image');
    }
  };

  const imageList = images.map((image) => (
    <img
      className="h-32 w-32 rounded-lg"
      key={image.key}
      src={`http://localhost:5000/public/${image.key}`}
    />
  ));

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 p-8">
      {images.length > 0 && imageList}
    </div>
  );
};

export default InitialImage;
