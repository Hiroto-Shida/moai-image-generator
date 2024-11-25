import { imagesList } from "@/constants/imageList";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Page: NextPage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const fetchImage = async () => {
    const name = imagesList[Math.floor(Math.random() * imagesList.length)];
    try {
      const response = await fetch(`/api/${name}`);
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
      {/* <form
        action=""
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "right",
        }}
      >
        <label>
          Title
          <input type="text" name="title" value="title" />
        </label>
        <label>
          subTitle
          <input type="text" name="subTitle" value="subTitle" />
        </label> */}
      <button
        style={{
          padding: "10px",
        }}
        type="submit"
        onClick={() => {
          fetchImage();
        }}
      >
        Generated Image
      </button>
      {/* </form> */}
    </div>
  );
};

export default Page;
