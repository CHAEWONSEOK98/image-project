import { useRecoilState } from 'recoil';
import { imageState } from '../../atoms/atoms';
import { useEffect, useState } from 'react';
import axios from 'axios';

const InfiniteScrollImage = () => {
  const [images, setImages] = useRecoilState(imageState);
  const [imageUrl, setImageUrl] = useState<string>(
    '/api/images/infinite-scroll'
  );
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    setImages([]);
  }, []);

  useEffect(() => {
    getImageData();
  }, [imageUrl]);

  const getImageData = async () => {
    try {
      setImageLoading(true);
      const response = await axios.get(imageUrl);
      setImages((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.log(error);
      setImageError(true);
    } finally {
      setImageLoading(false);
    }
  };

  const loadMoreImageData = () => {
    if (images.length === 0 || imageLoading) return;
    const lastImageId = images[images.length - 1]._id;
    setImageUrl(`/api/images/infinite-scroll?lastId=${lastImageId}`);
  };

  window.addEventListener('scroll', () => {
    let scrollLocation = document.documentElement.scrollTop;
    let windowHeight = window.innerHeight;
    let fullHeight = document.body.scrollHeight;

    if (scrollLocation + windowHeight >= fullHeight) {
      loadMoreImageData();
    }
  });

  return (
    <div className="flex flex-col">
      <div className="p-8">
        {images.length > 0 &&
          images.map((image) => (
            <img
              className="h-32 w-32 rounded-lg"
              key={image._id}
              src={`http://localhost:5000/public/${image.key}`}
            />
          ))}
      </div>
      {imageLoading && <div>Loading...</div>}
      {imageError && <div>Failed to get Image</div>}
    </div>
  );
};

export default InfiniteScrollImage;
