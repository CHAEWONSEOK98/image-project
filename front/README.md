# Image Foundation

## 문제점

1.

`이미지 처리 과정`

_initialPage_

- front에서 back으로 데이터 요청 > 경로 /images
- 데이터베이스로부터 데이터를 불러와서 프론트로 전달
- front로 전달된 데이터는 recoil-atom(imageState)을 통해 상태관리

_paginationPage_

- front에서 back으로 데이터 요청 > 경로 /images/pagination
- 데이터베이스로부터 초기데이터를 불러와서 프론트로 전달
- front로 전달된 데이터는 recoil-atom(imageState)을 통해 상태관리
- front에서 데이터를 더 불러오도록하는 버튼을 눌렀을 때 back에서 설정해둔 데이터를 front로 재전송
  - 경로 images/pagination?lastId=${lastImageId}`

`문제점`

- 웹 화면이 초기화된 상태에서 paginationPage를 먼저 들어가는 경우 예상대로 동작
- initialPage로 먼저 들어간 후 나중에 paginationPage로 들어가는 경우 문제 발생
- initialPage에서 불러온 이미지 데이터들이 초기화되지 않은 상태로 paginationPage의 화면에서 그대로 나타남
- pagination의 동작은 정상적으로 이루어지지만 이미지를 불러올 때마다 중복 발생

`예상`

- atom으로 상태를 다룰 때, initialPage와 paginationPage에서 imageState라는 상태를 공유해서 사용했기 때문에 initialPage에서 불러온 이미지 데이터는 paginationPage로 이동한 후에도 새로고침하는 이벤트가 없는 코드상의 이유로 유지되는 것이 아닐까?

`해결`

- paginationPage에서 이미지 데이터를 받아와서 화면에 렌더링하기전에 상태를 초기화

```
  useEffect(() => {
    setImages([]); // 이 부분이 추가됨
    getImageData();
  }, [imageUrl]);
```
