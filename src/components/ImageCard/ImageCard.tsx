import React from "react";
import css from "./ImageCard.module.css";
import { Photo } from "../../App";

interface ImageCardProps {
  photo: Photo;
  openModal: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, openModal }) => {
  return (
    <div onClick={openModal}>
      <img  className={css.imageItem} src={photo.urls.thumb} alt={photo.alt_description} />
    </div>
  );
};

export default ImageCard;
