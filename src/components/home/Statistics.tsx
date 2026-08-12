export default function Statistics() {

  const stats = [
    { number: "25+", title: "Years of Experience" },
    { number: "1200+", title: "Completed Projects" },
    { number: "30+", title: "Countries Served" },
    { number: "100%", title: "Natural Marble" },
  ];

  return (
    <section className="bg-black py-28 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.title} className="text-center">
            <h2 className="text-5xl font-bold text-white">
              {item.number}
            </h2>

            <p className="mt-3 text-stone-300">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}