import MoaiImage from "../MoaiImage";

type Props = {
  main: string;
  sub: string;
  imagePath: string;
  size: number;
};

const OgpComponent: React.FC<Props> = ({ main, sub, imagePath, size }) => {
  const fontColor = "#ffffff";
  const shadowColor = "#000000";

  return (
    <>
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
        }}
      >
        <MoaiImage
          imagePath={imagePath}
          width={size * 0.75}
          height={size * 0.75}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "60%",
          }}
        >
          <p
            style={{
              color: fontColor,
              margin: 0,
              fontSize: "100px",
              lineHeight: "100%",
              letterSpacing: "3px",
              whiteSpace: "pre-wrap",
              fontWeight: "bold",
              fontFamily: "Roboto, sans-serif",
              textShadow: `2px 2px 0 ${fontColor}, -2px -2px 0 ${fontColor}, 2px -2px 0 ${fontColor}, -2px 2px 0 ${fontColor},
            4px 4px 0 ${shadowColor}, -4px -4px 0 ${shadowColor}, 4px -4px 0 ${shadowColor}, -4px 4px 0 ${shadowColor}`,
              zIndex: "2",
            }}
          >
            {main}
          </p>
          <p
            style={{
              color: fontColor,
              margin: 0,
              fontSize: "33px",
              lineHeight: "100%",
              whiteSpace: "pre-wrap",
              fontWeight: "bold",
              fontFamily: "Roboto, sans-serif",
              textShadow: `1px 1px 0 ${shadowColor}, -1px -1px 0 ${shadowColor}, 1px -1px 0 ${shadowColor}, -1px 1px 0 ${shadowColor}`,
              zIndex: "2",
            }}
          >
            {sub}
          </p>
        </div>
      </div>
    </>
  );
};

export default OgpComponent;
