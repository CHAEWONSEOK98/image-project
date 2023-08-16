import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { imageState } from '../../atoms/atoms';

const PaginationImage = () => {
  const [images, setImages] = useRecoilState(imageState);
  const [imageUrl, setImageUrl] = useState('/api/images/pagination');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImages([]);
  }, []);

  useEffect(() => {
    getImageData();
  }, [imageUrl]);

  const getImageData = async (): Promise<void> => {
    try {
      setImageLoading((prev) => true);
      const response = await axios.get(imageUrl);
      setImages((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.log(error);
      setImageError((prev) => false);
    } finally {
      setImageLoading((prev) => false);
    }
  };

  const loadMoreImageData = () => {
    if (images.length === 0 || imageLoading) return;
    const lastImageId = images[images.length - 1]._id;
    setImageUrl(`/api/images/pagination?lastId=${lastImageId}`);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-8">
        {images.length > 0 &&
          images.map((image) => (
            <img
              className="h-32 w-32 rounded-lg"
              key={image._id}
              src={`http://localhost:5000/public/${image.key}`}
            />
          ))}
      </div>

      {!imageLoading ? (
        <button onClick={loadMoreImageData}>Load More Images</button>
      ) : (
        <div>Loading...</div>
      )}
      {imageError && <div>Failed to get Image</div>}
    </div>
  );
};

export default PaginationImage;
