import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

type Props = {
  images: string[];
  name: string;
  selectedIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

export default function ProductLightbox({
  images,
  name,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
  onSelect,
}: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent background page from scrolling
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = "";
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
        onClick={onClose}
      >
        {/* CLOSE BUTTON */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label="Close gallery"
          className="absolute right-5 top-5 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
        >
          <FaTimes />
        </button>

        {/* IMAGE COUNTER */}

        <div className="absolute left-5 top-5 z-[110] rounded-full bg-white/10 px-5 py-3 text-sm text-white backdrop-blur-md">
          {selectedIndex + 1} / {images.length}
        </div>

        {/* PREVIOUS BUTTON */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrevious();
          }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 z-[110] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 md:left-8 md:h-14 md:w-14"
        >
          <FaChevronLeft />
        </button>

        {/* NEXT BUTTON */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-4 top-1/2 z-[110] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 md:right-8 md:h-14 md:w-14"
        >
          <FaChevronRight />
        </button>

        {/* MAIN CONTENT */}

        <div
          className="flex max-h-[90vh] max-w-7xl flex-col items-center"
          onClick={(event) => event.stopPropagation()}
        >
          {/* MAIN IMAGE */}

          <motion.img
            key={`${images[selectedIndex]}-${selectedIndex}`}
            src={images[selectedIndex]}
            alt={`${name} ${selectedIndex + 1}`}
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.25,
            }}
            className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />

          {/* PRODUCT NAME */}

          <p className="mt-5 text-center text-lg font-medium text-white">
            {name}
          </p>

          {/* THUMBNAILS */}

          <div className="mt-5 flex max-w-full gap-3 overflow-x-auto px-4 pb-2">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(index);
                }}
                className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  index === selectedIndex
                    ? "border-[#C8A97E]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt={`${name} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}