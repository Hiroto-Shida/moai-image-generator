import MoaiImage from "../MoaiImage";

type Props = {
  imagePath: string;
  c1: string;
  c2: string;
  main: string;
  sub: string;
  size: number;
};

const OgpComponent: React.FC<Props> = ({
  imagePath,
  c1,
  c2,
  main,
  sub,
  size,
}) => {
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
          background: `linear-gradient(to right, ${c1}, ${c2})`,
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
