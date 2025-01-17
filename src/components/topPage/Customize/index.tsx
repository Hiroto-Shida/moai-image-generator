import Button from "@/components/button/Button";
import FormColor from "@/components/form/FormColor";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";

import OgpComponent from "@/components/OgpComponent";
import { IMAGE_LIST } from "@/constants/imageList";
import { ImageOptionsType } from "@/types/ImageOptionsType";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormType } from "../Main";
import styles from "./index.module.scss";

type CustomizeProps = {
  imageOptions: Omit<ImageOptionsType, "size">;
  onSubmit: SubmitHandler<FormType>;
};
const Customize: React.FC<CustomizeProps> = ({ imageOptions, onSubmit }) => {
  const { handleSubmit, control } = useFormContext<FormType>();

  const imagePath = `/images/${imageOptions.image}.png`;

  return (
    <div className={styles.topWrapper}>
      <div className={styles.imageWrapper}>
        <OgpComponent
          imagePath={imagePath}
          c1={imageOptions.c1}
          c2={imageOptions.c2}
          main={imageOptions.main}
          sub={imageOptions.sub}
          size={250}
          isOgp={false}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <FormSelect
          label="Image"
          control={control}
          name="image"
          options={IMAGE_LIST.map((image) => ({
            value: image,
            label: image,
          }))}
        />
        <div className={styles.colorWrapper}>
          <FormColor label="Color1" control={control} name="c1" />
          <FormColor label="Color2" control={control} name="c2" />
        </div>
        <FormInput
          label="Main Text"
          control={control}
          name="main"
          maxLength={50}
        />
        <FormInput
          label="Sub Text"
          control={control}
          name="sub"
          maxLength={100}
        />
        <Button variant="black" type="submit">
          Export
        </Button>
      </form>
    </div>
  );
};

export default Customize;
