import MoaiImage from "../MoaiImage";

export type OgpComponentProps = {
  imagePath: string;
  size: number;
  c1: string;
  c2: string;
  main: string;
  sub: string;
  isOgp?: boolean;
};

const OgpComponent: React.FC<OgpComponentProps> = ({
  imagePath,
  size,
  c1,
  c2,
  main,
  sub,
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
        <p
          style={{
            position: "absolute",
            top: "60%",
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
        </p>
        <p
          style={{
            position: "absolute",
            top: "85%",
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
    </>
  );
};

export default OgpComponent;
