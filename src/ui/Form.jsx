import { cloneElement } from "react";
import searchIcon from "../assets/Search.svg";

function Form({ children, onSubmit }) {
  return (
    <form className="w-full px-4 sm:w-[35rem]" onSubmit={onSubmit}>
      <div className="flex items-center justify-between gap-3 rounded-md border bg-white p-4 shadow-sm">
        <label htmlFor="keyword" aria-hidden hidden>
          search
        </label>
        {cloneElement(children, {
          className: "grow bg-inherit text-gray-900 focus:outline-none",
        })}

        <button type="submit">
          <img src={searchIcon} alt="search icon" />
        </button>
      </div>
    </form>
  );
}

export default Form;
