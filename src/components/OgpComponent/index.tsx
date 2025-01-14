import MoaiImage from "../MoaiImage";

export type OgpComponentProps = {
  imagePath: string;
  c1: string;
  c2: string;
  main: string;
  sub: string;
  size: number;
  isOgp?: boolean;
};

const OgpComponent: React.FC<OgpComponentProps> = ({
  imagePath,
  c1,
  c2,
  main,
  sub,
  size,
  isOgp = true,
}) => {
  const fontColor = "#ffffff";
  const shadowColor = "#000000";
  const maSd = isOgp ? 2 : 0.5;
  const suSd = isOgp ? 1 : 0.5;

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
            zIndex: "1",
          }}
        >
          <span
            style={{
              color: fontColor,
              margin: 0,
              fontSize: `${size * 0.25}px`,
              lineHeight: isOgp ? "90%" : "100%",
              whiteSpace: "nowrap",
              fontWeight: "bold",
              fontFamily: "M PLUS 1p, sans-serif",
              textShadow: `${maSd}px ${maSd}px 0 ${shadowColor}, -${maSd}px -${maSd}px 0 ${shadowColor}, ${maSd}px -${maSd}px 0 ${shadowColor}, -${maSd}px ${maSd}px 0 ${shadowColor}`,
              zIndex: "2",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {main}
          </span>
          <p
            style={{
              color: fontColor,
              margin: 0,
              fontSize: `${size * 0.08}px`,
              lineHeight: "100%",
              whiteSpace: "nowrap",
              fontWeight: "bold",
              fontFamily: "M PLUS 1p, sans-serif",
              textShadow: `${suSd}px ${suSd}px 0 ${shadowColor}, -${suSd}px -${suSd}px 0 ${shadowColor}, ${suSd}px -${suSd}px 0 ${shadowColor}, -${suSd}px ${suSd}px 0 ${shadowColor}`,
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
