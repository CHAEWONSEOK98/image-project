import axios from 'axios';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { imageState } from '../atoms/atoms';

const UploadForm = () => {
  const [files, setFiles] = useState<any>(null);
  const [previews, setPreviews] = useState<any>([]);
  const [images, setImages] = useRecoilState(imageState);

  const inputRef = useRef(null);

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
      setImages((prev) => [...res.data, ...prev]);
      inputRef.current.value = null;
    } catch (error) {
      console.log(error);
      setPreviews([]);
      inputRef.current.value = null;
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
              ref={inputRef}
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

// [에러]
// 이미지를 선택하여 업로드 후 다시 업로드할 때, 이전과 같은 이미지를 업로드하려는 경우
// 미리보기가 활성화되지 않는다.

// [이유]
// onChange={handleSelectFile}
// 같은 이미지를 불러오는 경우 바뀐 것이 없는 것으로 인지하여 호출하지 않는다.

// [해결방법?]
// setPreviews([]); > useState에서 상태를 초기화하는 것과 비슷하게 초기화 시켜준다.
// 이미지 업로드 후 인풋 값을 초기화한다.

// [해결과정]
// useRef를 이용하여 불러온 해당 element의 값을 할당한다.
// handleSubmit에서 성공, 실패 두 경우 모두 현재 값을 초기화한다.
// inputRef.current.value = null;
