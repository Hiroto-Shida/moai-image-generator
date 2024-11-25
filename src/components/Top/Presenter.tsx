import { SubmitHandler, useFormContext } from "react-hook-form";
import { FormType } from ".";

type Props = {
  imageSrc: string | null;
  generatedUrl: string;
  generatedGithubUrl: string;
  onSubmit: SubmitHandler<FormType>;
  handleCopy: (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => void;
};

const Presenter: React.FC<Props> = ({
  generatedUrl,
  generatedGithubUrl,
  onSubmit,
  handleCopy,
  imageSrc,
}) => {
  const { register, handleSubmit } = useFormContext<FormType>();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        {imageSrc ? (
          <img src={imageSrc} alt="Generated Image" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "right",
        }}
      >
        <select {...register("image")}>
          <option value="happy">happy</option>
          <option value="good">good</option>
          <option value="appear">appear</option>
          <option value="bow">bow</option>
          <option value="dance">dance</option>
          <option value="fight">fight</option>
          <option value="macho">macho</option>
          <option value="walk">walk</option>
        </select>
        <input {...register("main")} />
        <input {...register("sub")} />

        <button type="submit">Generate</button>
      </form>

      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          // gap: "10px",
          width: "50%",
        }}
      >
        <p>URL</p>
        <p
          style={{
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={(e) => handleCopy(e)}
        >
          {generatedUrl}
        </p>

        <p>markdown</p>
        <p
          style={{
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={(e) => handleCopy(e)}
        >
          {generatedGithubUrl}
        </p>
      </div>
    </div>
  );
};

export default Presenter;
