import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState();

  function openModal(currentImage) {
    setIsOpenModal(true);
    setImage(currentImage);
  }
  function closeModal() {
    setIsOpenModal(false);
  }

  const fetchPhotos = async (searchQuery, pageNumber) => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=15&query=${searchQuery}&client_id=YYfT46HjtTb7FYrYCVeo_X-b5wPWO9fckoMc85xYKGg`
      );
      return response.data.results;
    } catch (error) {
      setIsError(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const body = document.querySelector("body");
    isOpenModal
      ? (body.style.overflow = "hidden")
      : (body.style.overflow = "auto");
  }, [isOpenModal]);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    const newPhotos = await fetchPhotos(searchQuery, 1);
    setPhotos(newPhotos);
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const newPhotos = await fetchPhotos(query, nextPage);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  return (
    <div className="container">
      <SearchBar onSubmit={handleSearch} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} openModal={openModal} />
      )}
      {photos.length > 0 && !isLoading && <LoadMoreBtn click={loadMore} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      <ImageModal
        photo={image}
        modalIsOpen={isOpenModal}
        modalIsClosed={closeModal}
      />
    </div>
  );
}

export default App;
