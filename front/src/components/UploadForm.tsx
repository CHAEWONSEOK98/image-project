const UploadForm = () => {
  return (
    <form className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%]">
      <label htmlFor="image">사진</label>
      <input id="image" type="file" />
      <button type="submit">제출</button>
    </form>
  );
};

export default UploadForm;
