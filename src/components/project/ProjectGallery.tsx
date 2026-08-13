import { useState } from "react";

import ProjectLightbox from "./ProjectLightbox.tsx";

type Props = {
  images: string[];
  title: string;
};

export default function ProjectGallery({
  images,
  title,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [lightboxOpen, setLightboxOpen] = useState(false);

  const selectedImage = images[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((current) => {
      if (current === 0) {
        return images.length - 1;
      }

      return current - 1;
    });
  };

  const handleNext = () => {
    setSelectedIndex((current) => {
      if (current === images.length - 1) {
        return 0;
      }

      return current + 1;
    });
  };

  return (
    <>
      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="grid gap-8 lg:grid-cols-[1fr_180px]">

            {/* Main image */}

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="group relative overflow-hidden rounded-3xl bg-stone-100 text-left"
            >

              <img
                src={selectedImage}
                alt={title}
                className="h-[600px] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">

                <span className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold opacity-0 shadow-lg transition group-hover:opacity-100">
                  View Fullscreen
                </span>

              </div>

            </button>

            {/* Desktop thumbnails */}

            <div className="hidden space-y-4 lg:block">

              {images.map((image, index) => (

                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`block w-full overflow-hidden rounded-xl border-2 transition ${
                    selectedIndex === index
                      ? "border-[#C8A97E]"
                      : "border-transparent hover:border-stone-300"
                  }`}
                >

                  <img
                    src={image}
                    alt={`${title} ${index + 1}`}
                    className="h-28 w-full object-cover"
                  />

                </button>

              ))}

            </div>

            {/* Mobile thumbnails */}

            <div className="flex gap-3 overflow-x-auto lg:hidden">

              {images.map((image, index) => (

                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`h-24 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 ${
                    selectedIndex === index
                      ? "border-[#C8A97E]"
                      : "border-transparent"
                  }`}
                >

                  <img
                    src={image}
                    alt={`${title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />

                </button>

              ))}

            </div>

          </div>

        </div>

      </section>

      {lightboxOpen && (
        <ProjectLightbox
          images={images}
          title={title}
          selectedIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSelect={setSelectedIndex}
        />
      )}
    </>
  );
}
