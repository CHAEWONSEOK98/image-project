import { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleSelectImage = (event) => {
    const imageFile = event.target.files[0];
    setFile(imageFile);
    setFileName(imageFile.name);
  };
  return (
    <form className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%]">
      <label htmlFor="image">{fileName}</label>
      <input id="image" type="file" onChange={handleSelectImage} />
      <button type="submit">제출</button>
    </form>
  );
};

export default UploadForm;
