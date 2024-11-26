import { imagesList } from "@/constants/imageList";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Presenter from "./Presenter";

export type FormType = {
  image: string;
  main: string;
  sub: string;
};

type Props = {
  pageUrl: string;
  image: string;
  main?: string;
  sub?: string;
};

const Top: React.FC<Props> = ({ pageUrl, image, main, sub }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [generatedGithubUrl, setGeneratedGithubUrl] = useState<string>("");

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      image: image,
      main: main || "LGTM",
      sub: sub || "Looks Good To Me",
    },
  });

  const fetchImage = useCallback(
    async (image: string, main: string, sub: string) => {
      const imageName = imagesList.includes(image) ? image : "happy";

      const queryObj: { main?: string; sub?: string } = {};
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
    fetchImage(image, main || "", sub || "");
  }, [fetchImage, image, main, sub]);

  const onSubmit: SubmitHandler<FormType> = (data) => {
    fetchImage(data.image, data.main, data.sub);
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
