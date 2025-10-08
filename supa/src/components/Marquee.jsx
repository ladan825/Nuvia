export default function Marquee() {
  const content = (
    <>
      <span className="text-2xl sm:text-3xl md:text-6xl font-extrabold text-gray-800 uppercase mx-8 sm:mx-12 md:mx-16 whitespace-nowrap">
        Nuvia
      </span>
      <span className="text-lg sm:text-2xl md:text-4xl font-medium text-gray-600 mx-8 sm:mx-12 md:mx-16 whitespace-nowrap">
        Drink Differently.
      </span>
    </>
  );

  return (
    <div className="w-full py-2 sm:py-3 md:py-4 overflow-hidden relative border-y-2 border-gray-300">
      <div className="marquee-content flex items-center animate-marquee">
        {/* Duplicate content to create smooth loop */}
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}
