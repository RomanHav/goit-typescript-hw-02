import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (search.trim() === "") {
      toast("Field must be fulfilled");
      return;
    }
    onSubmit(search);
    setSearch("");
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <header className={css.headerForm}>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </header>
  );
}
