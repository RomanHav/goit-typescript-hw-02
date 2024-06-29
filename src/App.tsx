import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

export interface Photo {
  id: string;
  urls: {
    small: string;
    regular: string;
    thumb: string;
  };
  alt_description: string;
}

const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [image, setImage] = useState<Photo | null>(null);

  const openModal = (currentImage: Photo): void => {
    setIsOpenModal(true);
    setImage(currentImage);
  };

  const closeModal = (): void => {
    setIsOpenModal(false);
  };

  const fetchPhotos = async (searchQuery: string, pageNumber: number): Promise<Photo[]> => {
    setIsLoading(true);
    try {
      const response = await axios.get<{ results: Photo[] }>(
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
    if (body) {
      body.style.overflow = isOpenModal ? "hidden" : "auto";
    }
  }, [isOpenModal]);

  const handleSearch = async (searchQuery: string): Promise<void> => {
    setQuery(searchQuery);
    setPage(1);
    const newPhotos = await fetchPhotos(searchQuery, 1);
    setPhotos(newPhotos);
  };

  const loadMore = async (): Promise<void> => {
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
      {image && (
        <ImageModal
          photo={image}
          modalIsOpen={isOpenModal}
          modalIsClosed={closeModal}
        />
      )}
    </div>
  );
};

export default App;
