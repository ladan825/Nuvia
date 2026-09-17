const BrandStory = () => {
  return (
    <div className="w-full py-24 px-6 flex flex-col items-center justify-center text-center">
      <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-wide mb-6 max-w-2xl">
        Crafted for those who dare to stand out.
      </h2>
      <p className="text-gray-600 max-w-xl leading-relaxed">
        Founded on the belief that fashion is self-expression, our pieces
        blend timeless silhouettes with modern craftsmanship. Every detail
        is considered, every piece made to outlast trends.
      </p>
      <button className="mt-8 uppercase text-sm tracking-widest border-b border-black pb-1 hover:opacity-60 transition">
        Discover Our Story
      </button>
    </div>
  );
};

export default BrandStory;