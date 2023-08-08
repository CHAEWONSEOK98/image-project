import axios from 'axios';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { imageState } from '../atoms/atoms';

const UploadForm = () => {
  const [files, setFiles] = useState<any>(null);
  const [previews, setPreviews] = useState<any>([]);
  const [images, setImages] = useRecoilState(imageState);

  const handleSelectFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files !== null) {
      const imageFiles = event.target.files;
      setFiles(imageFiles);

      const imagePreviews = await Promise.allSettled(
        [...imageFiles].map((imageFile) => {
          return new Promise((resolve, reject) => {
            try {
              const fileReader: any = new FileReader();
              fileReader.readAsDataURL(imageFile);
              fileReader.onload = (e: any) =>
                resolve({
                  imgSrc: e.target.result,
                  fileName: imageFile.name,
                });
            } catch (error) {
              reject(error);
            }
          });
        })
      );
      setPreviews(imagePreviews);
      // const fileReader = new FileReader();
      // fileReader.readAsDataURL(imageFiles[0]);
      // fileReader.onload = () => setImgSrc(fileReader.result);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (files) for (let file of files) formData.append('image', file);

    try {
      const res = await axios.post('api/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('success');
      setPreviews([]);
      setImages((prev) => [...prev, ...res.data]);
    } catch (error) {
      console.log(error);
      setPreviews([]);
      throw new Error('Failed to upload Image');
    }
  };

  const previewImages = previews.map((preview: any) => (
    <img key={preview.value.imgSrc} src={preview.value.imgSrc} alt="" />
  ));

  const fileName =
    previews.length === 0
      ? 'Drag files to upload'
      : previews.reduce((prev, cur) => prev + `${cur.value.fileName} | `, '');

  return (
    <main
      className={`flex h-screen w-screen flex-col items-center justify-center  space-y-10 p-8 md:flex md:flex-row-reverse`}
    >
      <section>{previewImages}</section>

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
              multiple
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
