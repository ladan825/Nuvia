const Land = () => {
  return (
    <section className="min-h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-8 md:px-20 bg-white">
      
      <div className="space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          THE WORLD'S BEST <br />
          <span className="text-yellow-600">DONKWA</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 font-medium">
          Pure. Crunchy. Power-packed Nigerian goodness.
        </p>

        <button className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-xl shadow-md transition">
          Order Now
        </button>
      </div>

      <div className="flex justify-center">
        <img
          src="donkwaar.png"
          alt="Donkwa Snack"
          className="w-[350px] md:w-[500px] object-contain drop-shadow-xl"
        />
      </div>

    </section>
  );
};

export default Land;
