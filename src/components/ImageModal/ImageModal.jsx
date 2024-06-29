import Modal from "react-modal";
import css from "./ImageModal.module.css";
export default function ImageModal({ photo, modalIsOpen, modalIsClosed }) {
  return (
    <Modal
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          padding: "0",
          position: "absolute",
          background: "#000",
          overflow: "hidden",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          border: "none",
        },
      }}
      isOpen={modalIsOpen}
      ariaHideApp={false}
      shouldCloseOnEsc={true}
      onRequestClose={modalIsClosed}
      shouldCloseOnOverlayClick={true}
    >
      {photo && (
        <img
          className={css.imageModal}
          src={photo.urls.regular}
          alt={photo.alt_description}
        />
      )}
    </Modal>
  );
}
