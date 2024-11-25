import { imagesList } from "@/constants/imageList";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Presenter from "./Presenter";

export type FormType = {
  image: string;
  title: string;
  subTitle: string;
};

type Props = {
  pageUrl: string;
};

const Top: React.FC<Props> = ({ pageUrl }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string>("");

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      image: "happy",
      title: "LGTM",
      subTitle: "Looks Good To Me",
    },
  });

  const fetchImage = useCallback(
    async (image: string, title: string, subTitle: string) => {
      const name = imagesList.includes(image) ? image : "happy";
      const url =
        `/api/${name}` +
        `${title || subTitle ? "?" : ""}` +
        `${title ? `title=${title}` : ""}` +
        `${title && subTitle ? "&" : ""}` +
        `${subTitle ? `subTitle=${subTitle}` : ""}`;
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
        setGeneratedUrl(`![](${pageUrl}${url})`);
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
    fetchImage(data.image, data.title, data.subTitle);
  };

  const handleCopy = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    navigator.clipboard.writeText(e.currentTarget.innerText);
  };

  return (
    <FormProvider {...methods}>
      <Presenter
        imageSrc={imageSrc}
        generatedUrl={generatedUrl}
        onSubmit={onSubmit}
        handleCopy={handleCopy}
      />
    </FormProvider>
  );
};

export default Top;
