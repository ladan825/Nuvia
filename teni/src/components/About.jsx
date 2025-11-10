import React from "react";

const About = () => {
  return (
    <section className="bg-amber-200 py-16 px-6">
      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT — BIO */}
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-900">
            About Our Donkwa Queen 👑
          </h2>
          <p className="text-lg leading-relaxed text-gray-800">
            She is a dedicated teacher and a proud civil servant — the oldest daughter
            in her family, raised with strong values and a loving home behind her.
          </p>

          <p className="text-lg leading-relaxed text-gray-800">
            Passionate, kind, and always putting others first, she continues the legacy
            of her amazing mother — making the best Donkwa you can ever taste.
          </p>

          <p className="text-lg leading-relaxed text-gray-800">
            What started as a side hustle has now become a blessing to so many people,
            bringing joy in every bite!
          </p>

          <p className="text-lg font-semibold text-gray-900">
            Family made. Quality assured. Love in every grain ❤️
          </p>
        </div>

        {/* RIGHT — IMAGES */}
        <div className="grid">
          <img
            src="/teni.jpg"
            alt="donkwa owner"
            className="w-full h-100 object-cover rounded-xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default About;
