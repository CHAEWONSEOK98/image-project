import axios from 'axios';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { imageState } from '../atoms/atoms';

const UploadForm = () => {
  const [file, setFile] = useState<File[]>([]);
  const [fileName, setFileName] = useState<string>('Drag files to upload');
  const [imgSrc, setImgSrc] = useState<any>(null);
  const [images, setImages] = useRecoilState(imageState);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = Array.from(event.target.files || []);
    setFile(imageFile);
    setFileName(imageFile[0].name);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile[0]);
    fileReader.onload = () => setImgSrc(fileReader.result);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file[0]);

    try {
      const res = await axios.post('api/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('success');
      setFileName('Drag files to upload');
      setImgSrc(null);
      setImages((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
      setFileName('Drag files to upload');
      setImgSrc(null);
      throw new Error('Failed to upload Image');
    }
  };

  return (
    <main
      className={`flex h-screen w-screen flex-col items-center justify-center  space-y-10 p-8 md:flex md:flex-row-reverse ${
        imgSrc !== null ? 'md:justify-around' : ''
      }`}
    >
      <section>
        <img className="rounded-md" src={imgSrc} alt={imgSrc} />
      </section>

      <section>
        <form
          className="rounded-md border-[3px] border-solid border-blue-500 p-16 "
          onSubmit={handleSubmit}
        >
          <div className="flex h-64 w-80 items-center justify-center rounded-md border-[2px]  border-dashed border-black">
            <span className="absolute font-bold">{fileName}</span>
            <input
              className="h-full w-full cursor-pointer opacity-0"
              id="image"
              type="file"
              accept="image/*"
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
      </section>
    </main>
  );
};

export default UploadForm;
