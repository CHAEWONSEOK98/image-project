import axios from 'axios';
import { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState<File[]>([]);
  const [fileName, setFileName] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file[0]);

    try {
      const res = await axios.post('api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log({ res });
      alert('success');
    } catch (error) {
      console.log(error);
      alert('fail');
    }
  };

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = Array.from(event.target.files || []);
    setFile(imageFile);
    setFileName(imageFile[0].name);
  };

  return (
    <form
      className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%]"
      onSubmit={handleSubmit}
    >
      <label htmlFor="image">{fileName}</label>
      <input id="image" type="file" onChange={handleSelectFile} />
      <button type="submit">제출</button>
    </form>
  );
};

export default UploadForm;
