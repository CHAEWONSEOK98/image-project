import imageCompression from 'browser-image-compression';

const ResizeUploadForm = () => {
  const handleChange = async (event) => {
    const imageFile = event.target.files[0];
    const originalSize = event.target.files[0].size;
    const options = {
      maxSizeMB: 1, // 허용하는 최대 사이즈 지정
      maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
      useWebWorker: true, // webworker 사용 여부
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(compressedFile.size);
      console.log(originalSize);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input onChange={handleChange} type="file" />
      <img className="h-64 w-64" />
    </div>
  );
};

export default ResizeUploadForm;
