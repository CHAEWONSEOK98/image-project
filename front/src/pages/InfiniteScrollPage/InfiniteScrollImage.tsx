import { useRecoilState } from 'recoil';
import { imageState } from '../../atoms/atoms';
import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

const InfiniteScrollImage = () => {
  const [images, setImages] = useRecoilState(imageState);
  const [imageUrl, setImageUrl] = useState<string>(
    '/api/images/infinite-scroll'
  );
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const elementRef = useRef(null);

  useEffect(() => {
    setImages([]);
  }, []);

  useEffect(() => {
    getImageData();
  }, [imageUrl]);

  const lastImageId = images.length > 0 ? images[images.length - 1]._id : null;

  const loadMoreImageData = useCallback(() => {
    if (imageLoading || !lastImageId) return;
    setImageUrl(`/api/images/infinite-scroll?lastId=${lastImageId}`);
  }, [lastImageId, imageLoading]);

  useEffect(() => {
    if (!elementRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      console.log('intersection', entry.isIntersecting);
      if (entry.isIntersecting) loadMoreImageData();
    });
    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [loadMoreImageData]);

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

  // window.addEventListener('scroll', () => {
  //   let scrollLocation = document.documentElement.scrollTop;
  //   let windowHeight = window.innerHeight;
  //   let fullHeight = document.body.scrollHeight;

  //   if (scrollLocation + windowHeight >= fullHeight) {
  //     loadMoreImageData();
  //   }
  // });

  return (
    <div className="flex flex-col">
      <div className="p-8">
        {images.length > 0 &&
          images.map((image, index) => (
            <img
              className="h-32 w-32 rounded-lg"
              key={image._id}
              src={`http://localhost:5000/public/${image.key}`}
              ref={index + 1 === images.length ? elementRef : undefined}
            />
          ))}
      </div>
      {imageLoading && <div>Loading...</div>}
      {imageError && <div>Failed to get Image</div>}
    </div>
  );
};

export default InfiniteScrollImage;

// [에러1]
// Unexpected Application Error!
// Failed to execute 'observe' on 'IntersectionObserver': parameter 1 is not of type 'Element'.

// TypeError: Failed to execute 'observe' on 'IntersectionObserver': parameter 1 is not of type 'Element'.

// >> const elementRef = useRef(null);
// elementRef 변수를 생성한 후 처음에 할당되는 값은 null이다.
// 이후 images배열을 map함수를 사용하여 렌더링하는 과정에서 주어진 조건에 일치하는경우
// elementRef 변수에 값이 할당된다.

// useEffect(() => {
//   if (!elementRef.current) return;
//   const observer = new IntersectionObserver(([entry]) => {
//     if (entry.isIntersecting) loadMoreImageData();
//   });

//   observer.observe(elementRef.current);
// }, [loadMoreImageData]);

// 문제는 위의 코드에서 elementRef 변수에 값이 할당되기 전에 elementRef 값을 참조하는
// IntersectionObserver API 적용하려 했기 때문에 에러가 발생했다.

// elementRef 변수에 값이 할당되지 않았으면 리턴한다는 코드를 적용했을 때 에러가 해결되었다.
// if (!elementRef.current) return;

// [에러2]
// react-dom.development.js:86 Warning:
// Encountered two children with the same key,
// `64d25205b9893135576b4f16`. Keys should be unique
// so that components maintain their identity across
// updates. Non-unique keys may cause children to be
//  duplicated and/or omitted — the behavior is
//  unsupported and could change in a future version.

//  에러 이유:
//  images배열을 렌더링하면서 조건에 해당되면 마지막 element를
//  elementRef 변수에 할당한다. 이후 IntersectionObserver API를
//  사용하여 마지막 element 값이 할당된 elementRef를 추적한다.
//  스크롤이 elementRef 영역에 도달하면 새로운 데이터를 불러오는
//  구조를 갖는다. 이때 스크롤을 내리면서 새로운 데이터를 불러올 때는
//  문제가 없지만, 스크롤을 다시 올릴 때 이전에 elementRef 값을 기준으로
//  새로운 데이터를 불러왔던 코드가 다시 실행된다.

//  스크롤을 내릴 때 elementRef값을 기준으로 새로운 데이터를 불러온 후,
//  데이터를 얻고 난 후에는 elementRef값 추적하는 것을 끊어야한다.

//  useEffect(() => {
//   if (!elementRef.current) return;
//   const observer = new IntersectionObserver(([entry]) => {
//     if (entry.isIntersecting) loadMoreImageData();
//   });
//   observer.observe(elementRef.current);

//   return () => observer.disconnect();
// }, [loadMoreImageData]);

// return () => observer.disconnect();

// clean up function 코드를 추가하여 추적하는 것을 끊는다.
