import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { imageState } from '../atoms/atoms';

const ImageList = () => {
  const [images, setImages] = useRecoilState(imageState);
  const [imageUrl, setImageUrl] = useState('/api/images');

  const getImageData = async (): Promise<void> => {
    try {
      const response = await axios.get(imageUrl);
      setImages((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get Image');
    }
  };

  const loadMoreImageData = () => {
    if (images.length === 0) return;
    const lastImageId = images[images.length - 1]._id;
    setImageUrl(`/api/images?lastId=${lastImageId}`);
  };

  useEffect(() => {
    getImageData();
  }, [imageUrl]);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-8">
        {images.length > 0 &&
          images.map((image) => (
            <img
              className="rounded-lg"
              key={image._id}
              src={`http://localhost:5000/public/${image.key}`}
            />
          ))}
      </div>
      <button onClick={loadMoreImageData}>Load More Images</button>
    </div>
  );
};

export default ImageList;
