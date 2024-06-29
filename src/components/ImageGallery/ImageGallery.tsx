import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Photo } from "../../App";

export interface GalleryProps {
  photos: Photo[];
  openModal: (currentImage: Photo) => void;
}

const ImageGallery: React.FC<GalleryProps> = ({ photos, openModal }) => {
  return (
    <ul className={css.gallery}>
      {photos.map((photo) => (
        <li key={photo.id}>
          <ImageCard photo={photo} openModal={() => openModal(photo)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
