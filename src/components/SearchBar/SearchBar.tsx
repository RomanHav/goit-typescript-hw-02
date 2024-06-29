import React, { FormEvent, ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface Submition {
  onSubmit: (value: string) => void;
}

const SearchBar = ({ onSubmit }: Submition) => {
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (search.trim() === "") {
      toast("Field must be fulfilled");
      return;
    }
    onSubmit(search);
    setSearch("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
};

export default SearchBar;
