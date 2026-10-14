import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { projectPhotos } from "../../data/projectPhotos";
import { useText } from "../../i18n/useText";

import "swiper/css";
import "swiper/css/a11y";

export default function ProjectsCarousel() {
  const tr = useText();
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const controlClass =
    "flex h-12 w-12 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-900 transition hover:border-[#C8A97E] hover:bg-[#C8A97E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A97E]";

  if (projectPhotos.length === 0) return null;

  return (
    <section
      aria-label={tr("Our Projects")}
      className="overflow-hidden bg-stone-50 py-12 md:py-16"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          swiperRef.current?.slidePrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          swiperRef.current?.slideNext();
        }
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Swiper
          id="home-project-carousel"
          modules={[A11y]}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{ 768: { slidesPerView: 2 } }}
          loop={projectPhotos.length > 2}
          grabCursor
          watchSlidesProgress
          a11y={{
            prevSlideMessage: tr("Previous image"),
            nextSlideMessage: tr("Next image"),
            slideLabelMessage: t("Photo {{number}}", { number: "{{index}}" }),
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          tabIndex={0}
          className="rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A97E]"
        >
          {projectPhotos.map((photo, index) => (
            <SwiperSlide key={photo.image}>
              <figure className="overflow-hidden rounded-3xl border border-stone-200 bg-white">
                <div className="h-[320px] bg-stone-100 sm:h-[420px]">
                  <img
                    src={photo.image}
                    alt={`${tr(photo.title)} — ${t("Photo {{number}}", { number: index + 1 })}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
                <figcaption className="flex min-h-36 flex-col justify-between gap-4 p-6 sm:min-h-32">
                  <div>
                    <h2 className="text-2xl font-semibold text-stone-900">
                      {tr(photo.title)}
                    </h2>
                    {photo.location && (
                      <p className="mt-1 text-sm text-stone-500">
                        {tr(photo.location)}
                      </p>
                    )}
                  </div>
                  <Link
                    to={photo.slug ? `/projects/${photo.slug}` : "/projects"}
                    className="w-fit text-sm font-semibold text-stone-700 transition hover:text-[#9C7747] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8A97E]"
                  >
                    {tr(photo.slug ? "View Project" : "View All Projects")} →
                  </Link>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label={tr("Previous image")}
            aria-controls="home-project-carousel"
            onClick={() => {
              swiperRef.current?.slidePrev();
            }}
            className={controlClass}
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <span
            aria-live="polite"
            aria-atomic="true"
            className="min-w-20 text-center text-sm tabular-nums text-stone-600"
          >
            {activeIndex + 1} / {projectPhotos.length}
          </span>
          <button
            type="button"
            aria-label={tr("Next image")}
            aria-controls="home-project-carousel"
            onClick={() => {
              swiperRef.current?.slideNext();
            }}
            className={controlClass}
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
