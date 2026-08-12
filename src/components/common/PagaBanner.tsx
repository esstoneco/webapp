
type Props = {
  title: string;
  subtitle?: string;
  image?: string;
};

export default function PageBanner({
  title,
  subtitle,
  image,
}: Props) {
  return (
    <section
      className="relative flex h-[420px] items-center justify-center overflow-hidden"
      style={
        image
          ? {
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 text-center text-white">
        <h1 className="mb-4 text-6xl font-bold">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xl text-stone-200">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}