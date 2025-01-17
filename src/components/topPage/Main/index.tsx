import { IMAGE_LIST } from "@/constants/imageList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Presenter from "./Presenter";
import { isImageName } from "@/utils/image";
import { ImageOptionsType } from "@/types/ImageOptionsType";
import ExportModal from "@/components/ExportModal";
import Toast from "@/components/Toast";
import { useDebounce } from "@/hooks/useDebounce";
import { useImageSizeStore } from "@/stores/useImageSizeStore";
import { DEFAULT_IMAGE_OPTIONS } from "@/constants/imageOptions";

export type FormType = {
  image: string;
} & Omit<ImageOptionsType, "image" | "size">;

type Props = {
  pageUrl: string;
  imageOptions: {
    image: (typeof IMAGE_LIST)[number];
  } & Partial<Omit<ImageOptionsType, "image">>;
  lineLists: ImageOptionsType[][];
};

const Main: React.FC<Props> = ({ pageUrl, imageOptions, lineLists }) => {
  const [isOpenedExportModal, setIsOpenedExportModal] = useState(false);
  const [isOpenToast, setIsOpenToast] = useState(false);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [urls, setUrls] = useState<{ ogpUrl: string; imageUrl: string }>({
    ogpUrl: "",
    imageUrl: "",
  });
  const size = useImageSizeStore((state) => state.size);

  // TODO: カラーコードのバリデーションの確認
  const defaultValues = {
    image: imageOptions.image,
    c1: imageOptions.c1 || DEFAULT_IMAGE_OPTIONS.c1,
    c2: imageOptions.c2 || DEFAULT_IMAGE_OPTIONS.c2,
    main: imageOptions.main || DEFAULT_IMAGE_OPTIONS.main,
    sub: imageOptions.sub || DEFAULT_IMAGE_OPTIONS.sub,
  };

  const [formattedImageOptions, setFormattedImageOptions] =
    useState<ImageOptionsType>({ ...defaultValues, size: String(size) });

  // TODO: 空文字送信ができないようにする
  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
  });

  const { setValue, watch } = methods;

  const onSubmit: SubmitHandler<FormType> = () => {
    setIsOpenedExportModal(true);
  };

  const handleClickImage = useCallback(
    (data: ImageOptionsType) => {
      setValue("image", data.image);
      setValue("c1", data.c1);
      setValue("c2", data.c2);
      setValue("main", data.main);
      setValue("sub", data.sub);
    },
    [setValue]
  );

  // URLを生成
  // TODO: defaultvaluesと同じ値のところは省略するようにする
  const generateUrls = useCallback(() => {
    const { c1, c2, main, sub, image } = formattedImageOptions;

    const queryObj: {
      size: string;
      c1?: string;
      c2?: string;
      main?: string;
      sub?: string;
    } = {
      size: String(size),
    };
    if (c1) queryObj.c1 = c1;
    if (c2) queryObj.c2 = c2;
    if (main) queryObj.main = main;
    if (sub) queryObj.sub = sub;
    const queryStr = new URLSearchParams(queryObj).toString();

    const topUrl = queryStr ? `?image=${image}&${queryStr}` : `?image=${image}`;
    const apiUrl = queryStr ? `/api/${image}?${queryStr}` : `/api/${image}`;

    return {
      ogpUrl: `${pageUrl}${topUrl}`,
      imageUrl: `${pageUrl}${apiUrl}`,
    };
  }, [formattedImageOptions, pageUrl, size]);

  // // apiから画像を取得
  const fetchImage = useCallback(async () => {
    setImageSrc(null);

    try {
      const response = await fetch(urls.imageUrl);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }, [urls.imageUrl]);

  const formatImageOptions = (
    formValues: Partial<FormType>
  ): ImageOptionsType => {
    return {
      image:
        formValues.image && isImageName(formValues.image)
          ? formValues.image
          : DEFAULT_IMAGE_OPTIONS.image,
      size: String(size),
      c1: formValues.c1 || DEFAULT_IMAGE_OPTIONS.c1,
      c2: formValues.c2 || DEFAULT_IMAGE_OPTIONS.c2,
      main: formValues.main || "",
      sub: formValues.sub || "",
    };
  };

  // フォームの値が変更された時 formattedImageOptions を更新
  useEffect(() => {
    const subscription = watch((value) => {
      setFormattedImageOptions(formatImageOptions(value));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // sizeが変更された時に formattedImageOptions を更新
  useEffect(() => {
    const formValues = methods.getValues();
    setFormattedImageOptions(formatImageOptions(formValues));
  }, [size]);

  // formattedImageOptions が変更された時に URL を再生成
  useEffect(() => {
    const { ogpUrl, imageUrl } = generateUrls();
    setUrls({
      ogpUrl,
      imageUrl,
    });
  }, [formattedImageOptions]);

  const debounceFetchImage = useDebounce({
    callback: () => fetchImage(),
    delay: 500,
  });

  // 画像URLが変更された時に再度画像を取得(debounce)
  useEffect(() => {
    debounceFetchImage();
  }, [urls.imageUrl]);

  const debounceCloseToast = useDebounce({
    callback: () => setIsOpenToast(false),
    delay: 1500,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsOpenToast(true);
    debounceCloseToast();
  };

  return (
    <>
      <FormProvider {...methods}>
        <Presenter
          imageOptions={formattedImageOptions}
          onSubmit={onSubmit}
          handleClickImage={handleClickImage}
          lineLists={lineLists}
        />
      </FormProvider>
      <ExportModal
        isOpen={isOpenedExportModal}
        onClose={() => setIsOpenedExportModal(false)}
        imageSrc={imageSrc}
        urls={urls}
        handleCopy={handleCopy}
      />
      <Toast isOpen={isOpenToast} message="URL has been copied to clipboard." />
    </>
  );
};

export default Main;
