import { DEFAULT_IMAGE_SIZE } from "@/constants/imageSize";
import { create } from "zustand";

type State = {
  size: number;
};

type Action = {
  setSize: (size: number) => void;
};

export const useImageSizeStore = create<State & Action>()((set) => ({
  size: DEFAULT_IMAGE_SIZE,
  setSize: (num: number) => set(() => ({ size: num })),
}));
