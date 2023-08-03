import axios from 'axios';
import { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState<File[]>([]);
  const [fileName, setFileName] = useState('Drag files to upload');

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
      className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] border-[2px] border-solid p-20 shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="relative flex h-[15rem] w-[20rem] items-center justify-center  rounded-md border-[2px] border-dashed border-black  ">
        <span className="font-bold">{fileName}</span>
        <input
          className="absolute h-full w-full cursor-pointer opacity-0 "
          id="image"
          type="file"
          onChange={handleSelectFile}
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-[#0144FF] p-2 py-3 text-white"
      >
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
