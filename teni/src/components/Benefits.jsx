import { CheckCircle, Shield, Leaf } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Naturally Nutritious",
      subtitle: "Made with premium groundnuts & grains",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Hygienic",
      subtitle: "Produced with top-notch quality control",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "No Preservatives",
      subtitle: "100% pure local taste — nothing artificial",
    },
  ];

  return (
    <section className="py-20 bg-gray-100 px-6 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
        Why Everyone Loves Donkwa ❤️
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {benefits.map((b, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-lg text-center border hover:shadow-xl transition"
          >
            <div className="flex justify-center text-yellow-600 mb-4">
              {b.icon}
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">{b.title}</h3>
            <p className="text-gray-600">{b.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
