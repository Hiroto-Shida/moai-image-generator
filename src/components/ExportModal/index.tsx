import { Dialog, DialogPanel } from "@headlessui/react";
import clsx from "clsx";
import { M_PLUS_1 } from "next/font/google";
import { FormProvider, useForm } from "react-hook-form";
import ClearIcon from "../../assets/icons/clear.svg";
import Caption from "../Caption";
import Button from "../button/Button";
import UrlButton from "../button/UrlButton";
import FormRange from "../form/FormRange";
import Label from "../form/Label";
import styles from "./index.module.scss";

const mPlus1 = M_PLUS_1({
  subsets: ["latin"],
});

type RangeFormType = {
  size: string;
};

type ExportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  size: number;
  setSize: (size: number) => void;
  imageSrc: string | null;
  urls: { ogpUrl: string; imageUrl: string };
  handleCopy: (text: string) => void;
};

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  size,
  setSize,
  imageSrc,
  urls,
  handleCopy,
}) => {
  const methods = useForm<RangeFormType>({
    mode: "onChange",
    defaultValues: {
      size: String(size),
    },
  });

  const { control } = methods;

  // TODO: 下から出るようなanimationにしたい headless uiのtransition使う
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={clsx(mPlus1.className, styles.dialogWrapper)}
    >
      <div className={styles.backGround}>
        <DialogPanel className={styles.modalWrapper}>
          <button className={styles.close} type="button" onClick={onClose}>
            <ClearIcon />
          </button>
          <div className={styles.imageWrapper}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="Generated Image"
                className={styles.image}
              />
            ) : (
              <div className={styles.loadingWrapper}>
                <div className={styles.image} />
                <p className={styles.text}>Generating image...</p>
              </div>
            )}
          </div>
          <div className={styles.urlsWrapper}>
            <FormProvider {...methods}>
              <FormRange
                label={`Image Size: ${size}px`}
                control={control}
                name="size"
                inputRange={{
                  min: 100,
                  max: 400,
                  step: 50,
                }}
                onChange={(value) => setSize(Number(value))}
              />
            </FormProvider>
            <div className={styles.url}>
              <Label variant="black">URL</Label>
              <UrlButton
                url={urls.ogpUrl}
                handleClick={(text) => handleCopy(text)}
              />
              <Caption>Use to preview image (OGP) on SNS</Caption>
            </div>
            <div className={styles.url}>
              <Label variant="black">Image URL</Label>
              <UrlButton
                url={urls.imageUrl}
                handleClick={(text) => handleCopy(text)}
              />
              <Caption>e.g. Use as LGTM images on GitHub.</Caption>
            </div>
          </div>
          <Button
            variant="primary"
            type="download"
            fileName="moai-image"
            href={imageSrc || ""}
            disabled={!imageSrc}
          >
            Download(PNG)
          </Button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ExportModal;
