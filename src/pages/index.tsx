import { NextPage } from "next";
import { useEffect, useState } from "react";

const Page: NextPage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const fetchImage = async () => {
    try {
      const response = await fetch("/api");
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
      <div>
        {imageSrc ? (
          <img src={imageSrc} alt="Generated Image" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button
        style={{
          padding: "10px",
        }}
        onClick={() => {
          fetchImage();
        }}
      >
        Generated Image
      </button>
    </div>
  );
};

export default Page;
