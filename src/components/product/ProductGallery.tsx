import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import ProductLightbox from "./ProductLightbox";

type Props = {
  images: string[];
  name: string;
};

export default function ProductGallery({
  images,
  name,
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

            <div
              className="group relative cursor-zoom-in overflow-hidden rounded-3xl bg-stone-100"
              onClick={() => setLightboxOpen(true)}
            >

              <img
                src={selectedImage}
                alt={name}
                className="h-[600px] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />

              {/* Overlay */}

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/20">

                <span className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                  View Fullscreen
                </span>

              </div>

            </div>

            {/* Mobile thumbnails */}

            <div className="lg:hidden">

              <Swiper
                spaceBetween={12}
                slidesPerView={3}
              >

                {images.map((image, index) => (

                  <SwiperSlide key={`${image}-${index}`}>

                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className={`w-full overflow-hidden rounded-xl border-2 ${
                        selectedIndex === index
                          ? "border-[#C8A97E]"
                          : "border-transparent"
                      }`}
                    >

                      <img
                        src={image}
                        alt={`${name} ${index + 1}`}
                        className="h-24 w-full object-cover"
                      />

                    </button>

                  </SwiperSlide>

                ))}

              </Swiper>

            </div>

            {/* Desktop thumbnails */}

            <div className="hidden space-y-4 lg:block">

              {images.map((image, index) => (

                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setSelectedIndex(index)}
                  className={`block w-full overflow-hidden rounded-xl border-2 transition ${
                    selectedIndex === index
                      ? "border-[#C8A97E]"
                      : "border-transparent hover:border-stone-300"
                  }`}
                >

                  <img
                    src={image}
                    alt={`${name} ${index + 1}`}
                    className="h-28 w-full object-cover"
                  />

                </button>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* Fullscreen gallery */}

      {lightboxOpen && (

        <ProductLightbox
          images={images}
          name={name}
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