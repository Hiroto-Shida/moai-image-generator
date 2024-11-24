type Props = {
  imagePath: string;
  width: number;
  height: number;
};

const MoaiImage: React.FC<Props> = ({ imagePath, width, height }) => {
  return (
    <div
      style={{
        position: "absolute",
        background: `url(${imagePath})`,
        // backgroundImage: `url(${imagePath})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        width: `${width}px`,
        height: `${height}px`,
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1",
      }}
    />
  );
};

export default MoaiImage;
