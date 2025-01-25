"use client";
import Button from "@/components/button/Button";
import FormColor from "@/components/form/FormColor";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";

import ExportModal from "@/components/ExportModal";
import OgpComponent from "@/components/OgpComponent";
import { DEFAULT_IMAGE_OPTIONS, IMAGE_LIST } from "@/constants/image";
import { useDebounce } from "@/hooks/useDebounce";
import { pageSearchParams } from "@/searchParams/searchParams";
import { ImageOptionsType } from "@/types/ImageOptionsType";
import { isImageName } from "@/utils/image";
import { useQueryStates } from "nuqs";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./index.module.scss";

type FormType = {
  image: string;
} & Omit<ImageOptionsType, "image" | "size">;

type UrlsType = {
  ogpUrl: string;
  imageUrl: string;
};

type CustomizeProps = {
  pageUrl: string;
};

const Customize: React.FC<CustomizeProps> = ({ pageUrl }) => {
  const [{ image, size, c1, c2, main, sub }, setForm] =
    useQueryStates(pageSearchParams);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [urls, setUrls] = useState<UrlsType>({
    ogpUrl: "",
    imageUrl: "",
  });
  const [isOpenedExportModal, setIsOpenedExportModal] = useState(false);

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      image: image,
      c1: c1,
      c2: c2,
      main: main,
      sub: sub,
    },
  });

  const {
    control,
    formState: { isValid },
  } = methods;

  const debounce = useDebounce(500);

  // URLを生成
  const generateUrls = useCallback(
    ({ image, c1, c2, main, sub }: Omit<ImageOptionsType, "size">) => {
      // 値が空の時はURLを生成しない（ありえないはずだが一応）
      if (!image || !c1 || !c2) return;

      debounce(() => {
        const queryObj: {
          image?: string;
          size?: string;
          c1?: string;
          c2?: string;
          main?: string;
          sub?: string;
        } = {};

        if (image !== DEFAULT_IMAGE_OPTIONS.image) queryObj.image = image;

        if (size !== DEFAULT_IMAGE_OPTIONS.size) queryObj.size = String(size);
        if (c1 && c1 !== DEFAULT_IMAGE_OPTIONS.c1) queryObj.c1 = c1;
        if (c2 && c2 !== DEFAULT_IMAGE_OPTIONS.c2) queryObj.c2 = c2;
        if (main && main !== DEFAULT_IMAGE_OPTIONS.main) queryObj.main = main;
        if (sub && sub !== DEFAULT_IMAGE_OPTIONS.sub) queryObj.sub = sub;

        const apiQueryParams = new URLSearchParams(queryObj);
        // apiQueryParams.sort();
        const apiQueryStr = apiQueryParams.toString();
        const apiUrl = apiQueryStr
          ? `/api/${image}?${apiQueryStr}`
          : `/api/${image}`;

        const topQueryParams = new URLSearchParams(queryObj);
        topQueryParams.sort();
        const topQueryStr = topQueryParams.toString();
        const topUrl = topQueryStr ? `?${topQueryStr}` : ``;

        setUrls({
          ogpUrl: `${pageUrl}${topUrl}`,
          imageUrl: `${pageUrl}${apiUrl}`,
        });
        fetchImage(apiUrl);
      });
    },
    [debounce, pageUrl, size]
  );

  // apiから画像を取得
  const fetchImage = async (url: string) => {
    setImageSrc(null);

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  // URLクエリが変わった時debounceしてURLを生成
  useEffect(() => {
    generateUrls({ image, c1, c2, main, sub });
  }, [image, c1, c2, main, sub, generateUrls]);

  return (
    <>
      <div className={styles.topWrapper}>
        <div className={styles.imageWrapper}>
          <OgpComponent
            imagePath={`/images/${image}.png`}
            size={250}
            c1={c1}
            c2={c2}
            main={main || DEFAULT_IMAGE_OPTIONS.main}
            sub={sub || DEFAULT_IMAGE_OPTIONS.sub}
            isOgp={false}
          />
        </div>
        <FormProvider {...methods}>
          <form className={styles.formWrapper}>
            <FormSelect
              label="Image"
              control={control}
              name="image"
              options={IMAGE_LIST.map((image) => ({
                value: image,
                label: image,
              }))}
              onChange={(e) => {
                setForm({
                  image: isImageName(e.target.value) ? e.target.value : "happy",
                });
              }}
              value={image}
              required
            />
            <div className={styles.colorWrapper}>
              <FormColor
                label="Color1"
                control={control}
                name="c1"
                onChange={(e) => {
                  setForm({ c1: e.target.value });
                }}
                value={c1}
                required
              />
              <FormColor
                label="Color2"
                control={control}
                name="c2"
                onChange={(e) => {
                  setForm({ c2: e.target.value });
                }}
                value={c2}
                required
              />
            </div>
            <FormInput
              label="Main Text"
              control={control}
              name="main"
              maxLength={50}
              handleChange={(value) => {
                setForm({ main: value });
              }}
              placeholder={DEFAULT_IMAGE_OPTIONS.main}
              value={main || ""}
            />
            <FormInput
              label="Sub Text"
              control={control}
              name="sub"
              maxLength={100}
              handleChange={(value) => {
                setForm({ sub: value });
              }}
              placeholder={DEFAULT_IMAGE_OPTIONS.sub}
              value={sub || ""}
            />
            <Button
              variant="black"
              type="button"
              disabled={!isValid}
              onClick={() => setIsOpenedExportModal(true)}
            >
              Export
            </Button>
          </form>
        </FormProvider>
      </div>
      <ExportModal
        isOpen={isOpenedExportModal}
        onClose={() => setIsOpenedExportModal(false)}
        size={size}
        setSize={(size: number) => setForm({ size })}
        imageSrc={imageSrc}
        urls={urls}
      />
    </>
  );
};

export default Customize;
