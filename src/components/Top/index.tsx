import { imagesList } from "@/constants/imageList";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Presenter from "./Presenter";

export type FormType = {
  image: string;
  c1: string;
  c2: string;
  main: string;
  sub: string;
};

type ImageOptionsType = {
  image: string;
  c1?: string;
  c2?: string;
  main?: string;
  sub?: string;
};

type Props = {
  pageUrl: string;
  imageOptions: ImageOptionsType;
};

const Top: React.FC<Props> = ({ pageUrl, imageOptions }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [generatedGithubUrl, setGeneratedGithubUrl] = useState<string>("");

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      image: imageOptions.image,
      c1: imageOptions.c1 || "#ff7e5f",
      c2: imageOptions.c2 || "#feb47b",
      main: imageOptions.main || "LGTM",
      sub: imageOptions.sub || "Looks Good To Me",
    },
  });

  const fetchImage = useCallback(
    async ({ image, c1, c2, main, sub }: ImageOptionsType) => {
      const imageName = imagesList.includes(image) ? image : "happy";

      const queryObj: {
        c1?: string;
        c2?: string;
        main?: string;
        sub?: string;
      } = {};
      if (c1) queryObj.c1 = c1;
      if (c2) queryObj.c2 = c2;
      if (main) queryObj.main = main;
      if (sub) queryObj.sub = sub;
      const queryStr = new URLSearchParams(queryObj).toString();

      const topUrl = queryStr
        ? `?image=${imageName}&${queryStr}`
        : `?image=${imageName}`;

      const apiUrl = queryStr
        ? `/api/${imageName}?${queryStr}`
        : `/api/${imageName}`;

      try {
        const response = await fetch(apiUrl);
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
        setGeneratedUrl(`${pageUrl}${topUrl}`);
        setGeneratedGithubUrl(`![](${pageUrl}${apiUrl})`);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    },
    [pageUrl]
  );

  useEffect(() => {
    fetchImage(imageOptions);
  }, [fetchImage, imageOptions]);

  const onSubmit: SubmitHandler<FormType> = (data) => {
    fetchImage(data);
  };

  const handleCopy = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    navigator.clipboard.writeText(e.currentTarget.innerText);
    setIsOpenToast(true);
    setTimeout(() => {
      setIsOpenToast(false);
    }, 1500);
  };

  return (
    <FormProvider {...methods}>
      <Presenter
        imageSrc={imageSrc}
        generatedUrl={generatedUrl}
        generatedGithubUrl={generatedGithubUrl}
        onSubmit={onSubmit}
        handleCopy={handleCopy}
        isOpenToast={isOpenToast}
      />
    </FormProvider>
  );
};

export default Top;
