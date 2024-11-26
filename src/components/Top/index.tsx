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
};

const Top: React.FC<Props> = ({ pageUrl }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [generatedGithubUrl, setGeneratedGithubUrl] = useState<string>("");

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      image: "happy",
      main: "LGTM",
      sub: "Looks Good To Me",
    },
  });

  const fetchImage = useCallback(
    async (image: string, main: string, sub: string) => {
      const imageName = imagesList.includes(image) ? image : "happy";
      const topUrl =
        `?image=${imageName}` +
        `${main || sub ? "&" : ""}` +
        `${main ? `main=${main}` : ""}` +
        `${main && sub ? "&" : ""}` +
        `${sub ? `sub=${sub}` : ""}`;
      const apiUrl =
        `/api/${imageName}` +
        `${main || sub ? "?" : ""}` +
        `${main ? `main=${main}` : ""}` +
        `${main && sub ? "&" : ""}` +
        `${sub ? `sub=${sub}` : ""}`;
      try {
        const response = await fetch(apiUrl.replace(/\s/g, "%20"));
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
        setGeneratedUrl(`${pageUrl}${topUrl.replace(/\s/g, "%20")}`);
        setGeneratedGithubUrl(`![](${pageUrl}${apiUrl.replace(/\s/g, "%20")})`);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    },
    [pageUrl]
  );

  useEffect(() => {
    fetchImage("", "", "");
  }, [fetchImage]);

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
