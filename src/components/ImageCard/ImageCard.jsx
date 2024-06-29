import css from "./ImageCard.module.css";

export default function ImageCard({ photos, openModal }) {
  return (
    <div>
      <img
        className={css.imageItem}
        src={photos.urls.small}
        alt={photos.alt_description}
        onClick={() => openModal(photos)}
      />
    </div>
  );
}
