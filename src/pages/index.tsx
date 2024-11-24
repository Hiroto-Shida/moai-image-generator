import OgpComponent from "@/components/OgpComponent";

export default function Home() {
  const size = 400;

  return (
    <>
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: "1px solid black",
        }}
      >
        <OgpComponent
          title="LGTM"
          subTitle="Looks Good To Me"
          imagePath="/moai.png"
          size={size}
        />
      </div>
      <p>width: {`${size}px`}</p>
      <p>height: {`${size}px`}</p>
    </>
  );
}
