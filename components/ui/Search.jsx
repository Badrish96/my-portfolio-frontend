"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from 'react-dom'
import styles from "./Search.module.css";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useDebounce from "../../lib/hooks/useDebounce";

function Search() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (!debouncedValue) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        setIsSearching(true);
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${debouncedValue}`
        );
        const data = await res.json();
        setResults(data.products || []);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setIsSearching(false);
      }
    };

    fetchData();
  }, [debouncedValue]);

  function clear() {
    setValue("");
    inputRef.current?.focus();
  }

  const inputClass = `${styles.input} ${
    value ? styles["input-with-clear"] : ""
  } bg-white`;

  const [dropdownStyle, setDropdownStyle] = useState(null)

  useEffect(() => {
    function updatePos() {
      const el = inputRef.current
      if (!el) return setDropdownStyle(null)
      const rect = el.getBoundingClientRect()
      setDropdownStyle({
        position: 'absolute',
        left: `${rect.left + window.scrollX}px`,
        top: `${rect.bottom + window.scrollY + 6}px`, // small gap
        width: `${rect.width}px`,
        zIndex: 99999,
      })
    }

    updatePos()
    window.addEventListener('resize', updatePos)
    window.addEventListener('scroll', updatePos, true)
    return () => {
      window.removeEventListener('resize', updatePos)
      window.removeEventListener('scroll', updatePos, true)
    }
  }, [value])

  return (
    <div className={`block sm:inline-block relative overflow-visible`}>
      <div className="flex items-center gap-2 relative">
        <MagnifyingGlassIcon
          className="w-4 h-4 absolute left-2"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
          type="text"
          placeholder="Search..."
          aria-label="Search"
        />
        {value && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className="ml-1 inline-flex items-center justify-center rounded-md p-1 text-white-400 hover:text-[#12F7D6] focus:outline-2 focus:outline-offset-2 absolute right-0"
          >
            <XMarkIcon className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* 👇 Results Dropdown */}
      {value && dropdownStyle && createPortal(
        <ul style={dropdownStyle} className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-100 overflow-y-auto">
          {isSearching ? (
            <li className="px-3 py-2 text-sm text-gray-500">Searching...</li>
          ) : results.length > 0 ? (
            results.map((item) => (
              <li
                key={item.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-gray-500">${item.price}</div>
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-sm text-gray-500">
              No results found.
            </li>
          )}
        </ul>,
        document.body
      )}
    </div>
  );
}

export default Search;
