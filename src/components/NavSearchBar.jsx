import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";

const MAX_RECENT = 3;

export default function NavSearchBar({
  autoFocus = false,
  onCloseMobile,
  onSearchComplete,
  onClose,
}) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("recent_searches");
      if (raw) setRecentSearches(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const getProducts = () => {
    try {
      const raw = localStorage.getItem("products");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const trimmed = query.trim().toLowerCase();
  const matchingProducts = trimmed
    ? getProducts()
      .filter((p) => {
        const name = (p.name || "").toLowerCase();
        const category =
          (p.category?.name || (typeof p.category === "string" ? p.category : "")).toLowerCase();
        return name.includes(trimmed) || category.includes(trimmed);
      })
      .slice(0, 5)
    : [];

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseMobile) onCloseMobile();
    if (onSearchComplete) onSearchComplete();
    if (onClose) onClose();
  };

  const executeSearch = (term) => {
    const value = (term || query).trim();
    if (!value) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== value.toLowerCase());
      const next = [value, ...filtered].slice(0, MAX_RECENT);
      try {
        localStorage.setItem("recent_searches", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    handleClose();
    setQuery(value);
    navigate(`/catalog?q=${encodeURIComponent(value)}`);
  };

  const goToProduct = (product) => {
    handleClose();
    setQuery("");
    navigate(`/product/${product.slug || product._id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeSearch();
    }
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const showDropdown = isOpen && trimmed.length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center w-full bg-surface border border-border rounded-full shadow-level-1 transition-all outline-none duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 py-1 px-1.5 pl-3.5 sm:pl-5 h-11 sm:h-12">
        <SearchOutlined className="text-text-secondary text-base sm:text-lg shrink-0 mr-2 sm:mr-3" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          placeholder="Search products..."
          className="flex-1 bg-transparent p-0 border-0 outline-none text-text-primary placeholder:text-text-secondary text-xs sm:text-sm tracking-[-0.031em] font-normal"
        />

        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="text-text-secondary hover:text-text-primary mr-1.5 p-1 transition-colors cursor-pointer bg-transparent border-0 flex items-center justify-center"
          >
            <CloseCircleFilled className="text-xs sm:text-sm" />
          </button>
        )}

        <button
          type="button"
          aria-label="Search"
          onClick={() => executeSearch()}
          className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-primary hover:bg-primary/90 text-on-primary rounded-full shadow-violet-glow flex items-center justify-center transition-transform active:scale-95 border-0 cursor-pointer"
        >
          <ArrowRightOutlined className="text-xs sm:text-sm text-white" />
        </button>
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2.5 bg-white rounded-2xl shadow-level-3 border border-border p-3 z-50 overflow-hidden backdrop-blur-md animate-fadeIn">
          {recentSearches.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <ClockCircleOutlined className="text-[11px]" />
                <span>Recent</span>
              </div>
              <div className="flex flex-col gap-0.5 mt-1">
                {recentSearches.map((term) => (
                  <div
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      executeSearch(term);
                    }}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-canvas text-text-primary text-xs sm:text-sm cursor-pointer group transition-colors"
                  >
                    <ClockCircleOutlined className="text-gray-400 text-xs shrink-0 group-hover:text-primary transition-colors" />
                    <span className="truncate group-hover:text-primary font-medium transition-colors">
                      {term}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingProducts.length > 0 && (
            <div className="flex flex-col gap-1">
              {matchingProducts.map((prod) => {
                const image = prod.images?.[0] || prod.image || prod.thumbnail;
                const category =
                  prod.category?.name || (typeof prod.category === "string" ? prod.category : "");

                return (
                  <div
                    key={prod._id || prod.slug}
                    onClick={() => goToProduct(prod)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-canvas cursor-pointer transition-colors group"
                  >
                    {image && (
                      <img
                        src={image}
                        alt={prod.name}
                        className="w-10 h-10 object-cover rounded-lg border border-border shrink-0 bg-canvas"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-text-primary group-hover:text-primary transition-colors truncate">
                        {prod.name}
                      </div>
                      {category && (
                        <div className="text-[11px] text-text-secondary truncate">
                          {category}
                        </div>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-primary shrink-0">
                      ${Number(prod.price || 0).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {matchingProducts.length === 0 && (
            <div className="px-3 py-4 text-center text-xs text-text-secondary">
              No products found for "{query}"
            </div>
          )}

          <div className="mt-1 pt-2 border-t border-border">
            <div
              onClick={() => executeSearch()}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-primary hover:bg-[#5433eb]/10 transition-colors cursor-pointer"
            >
              <span>
                Search all for &quot;<span className="font-bold">{query}</span>&quot;
              </span>
              <span className="text-sm">→</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
