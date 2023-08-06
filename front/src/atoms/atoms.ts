import { atom } from 'recoil';

export interface ImageInfo {
  createdAt: Date;
  key: string;
  originalFileName: string;
  updatedAt: Date;
  __v: number;
  _id: string;
}

export const imageState = atom<ImageInfo[]>({
  key: 'imageState',
  default: [],
});
