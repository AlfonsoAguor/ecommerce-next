import { useState } from "react";
import styled from "styled-components";

const MainImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
    max-width: 100%;
    max-height: 200px;
`;

const BigImageWrapper = styled.div`
    text-align: center;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

const ImageButton = styled.img`
  background-color: #ccc;
  height: 60px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
  border: ${(props) => (props.active ? "2px solid #000" : "2px solid transparent")};
  transition: border 0.2s ease;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={`${process.env.NEXT_PUBLIC_BACK_URL}${activeImage}`} alt="Producto" />
      </BigImageWrapper>
      <ImageButtons>
        {images?.map((image, index) => (
          <ImageButton key={index} src={`${process.env.NEXT_PUBLIC_BACK_URL}${image}`} onClick={() => setActiveImage(image)} active={activeImage === image} alt={`Miniatura ${index + 1}`}/>
        ))}
      </ImageButtons>
    </>
  );
}
