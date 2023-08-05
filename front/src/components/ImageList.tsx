import axios from 'axios';
import { useEffect, useState } from 'react';

interface ImageInfo {
  createdAt: Date;
  key: string;
  originalFileName: string;
  updatedAt: Date;
  __v: number;
  _id: string;
}

const ImageList = () => {
  const [images, setImages] = useState<ImageInfo[]>([]);

  const getImageData = async (): Promise<void> => {
    try {
      const response = await axios.get<ImageInfo[]>('/api/images');
      setImages(response.data);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get Image');
    }
  };
  console.log(images);
  useEffect(() => {
    getImageData();
  }, []);

  const imageList = images.map((image) => (
    <img key={image.key} src={`http://localhost:5000/public/${image.key}`} />
  ));
  return <div>{images && imageList}</div>;
};

export default ImageList;
