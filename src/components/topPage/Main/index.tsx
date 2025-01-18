import ExportModal from "@/components/ExportModal";
import Toast from "@/components/Toast";
import { DEFAULT_IMAGE_OPTIONS } from "@/constants/image";
import { useDebounce } from "@/hooks/useDebounce";
import { ImageOptionsType } from "@/types/ImageOptionsType";
import { isImageName } from "@/utils/image";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Presenter from "./Presenter";

export type FormType = {
  image: string;
} & Omit<ImageOptionsType, "image" | "size">;

type UrlsType = {
  ogpUrl: string;
  imageUrl: string;
};

type Props = {
  pageUrl: string;
  initImageOptions: ImageOptionsType;
  lineLists: ImageOptionsType[][];
};

const Main: React.FC<Props> = ({ pageUrl, initImageOptions, lineLists }) => {
  const [isOpenedExportModal, setIsOpenedExportModal] = useState(false);
  const [isOpenToast, setIsOpenToast] = useState(false);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [urls, setUrls] = useState<UrlsType>({
    ogpUrl: "",
    imageUrl: "",
  });

  const [formattedImageOptions, setFormattedImageOptions] =
    useState<ImageOptionsType>(initImageOptions);

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      image: initImageOptions.image,
      c1: initImageOptions.c1,
      c2: initImageOptions.c2,
      main: initImageOptions.main,
      sub: initImageOptions.sub,
    },
  });

  const { setValue, watch, trigger } = methods;

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
      trigger();
    },
    [setValue]
  );

  // URLを生成
  const generateUrls = useCallback(() => {
    const { image, size, c1, c2, main, sub } = formattedImageOptions;

    // 値が空の時はURLを生成しない
    if (!c1 || !c2 || !main || !sub) return;

    const queryObj: {
      image?: string;
      size?: string;
      c1?: string;
      c2?: string;
      main?: string;
      sub?: string;
    } = {};

    if (size !== DEFAULT_IMAGE_OPTIONS.size) queryObj.size = String(size);
    if (c1 && c1 !== DEFAULT_IMAGE_OPTIONS.c1) queryObj.c1 = c1;
    if (c2 && c2 !== DEFAULT_IMAGE_OPTIONS.c2) queryObj.c2 = c2;
    if (main && main !== DEFAULT_IMAGE_OPTIONS.main) queryObj.main = main;
    if (sub && sub !== DEFAULT_IMAGE_OPTIONS.sub) queryObj.sub = sub;

    const apiQueryParams = new URLSearchParams(queryObj);
    apiQueryParams.sort();
    const apiQueryStr = apiQueryParams.toString();
    const apiUrl = apiQueryStr ? `api/${image}?${apiQueryStr}` : `api/${image}`;

    if (image !== DEFAULT_IMAGE_OPTIONS.image) queryObj.image = image;
    const topQueryParams = new URLSearchParams(queryObj);
    topQueryParams.sort();
    const topQueryStr = topQueryParams.toString();
    const topUrl = topQueryStr ? `?${topQueryStr}` : ``;

    setUrls({
      ogpUrl: `${pageUrl}${topUrl}`,
      imageUrl: `${pageUrl}${apiUrl}`,
    });
  }, [formattedImageOptions, pageUrl]);

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
  ): Omit<ImageOptionsType, "size"> => {
    return {
      image:
        formValues.image && isImageName(formValues.image)
          ? formValues.image
          : DEFAULT_IMAGE_OPTIONS.image,
      c1: formValues.c1 || DEFAULT_IMAGE_OPTIONS.c1,
      c2: formValues.c2 || DEFAULT_IMAGE_OPTIONS.c2,
      main: formValues.main || "",
      sub: formValues.sub || "",
    };
  };

  // フォームの値が変更された時 formattedImageOptions を更新
  useEffect(() => {
    const subscription = watch((value) => {
      setFormattedImageOptions((prev) => ({
        ...prev,
        ...formatImageOptions(value),
      }));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const debounceGenerateUrls = useDebounce({
    callback: () => generateUrls(),
    delay: 500,
  });

  // formattedImageOptions が変更された時に URL を再生成(debounce)
  useEffect(() => {
    debounceGenerateUrls();
  }, [formattedImageOptions]);

  // 画像URLが変更された時に再度画像を取得(debounce)
  useEffect(() => {
    fetchImage();
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
        size={formattedImageOptions.size}
        setSize={(size) =>
          setFormattedImageOptions({ ...formattedImageOptions, size })
        }
        imageSrc={imageSrc}
        urls={urls}
        handleCopy={handleCopy}
      />
      <Toast isOpen={isOpenToast} message="URL has been copied to clipboard." />
    </>
  );
};

export default Main;
