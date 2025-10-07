

export default function Marquee() {
  const content = (
    <>
      <span className="text-4xl md:text-6xl font-extrabold text-gray-800 uppercase mx-16 whitespace-nowrap">Nuvia</span>
      <span className="text-2xl md:text-4xl font-medium text-gray-600 mx-16 whitespace-nowrap">Drink Differently.</span>
    </>
  );

  return (
    <div className="w-full py-4 overflow-hidden relative border-y-2 ">
      <div className="marquee-content flex items-center">
        {/* We duplicate the content to create a seamless loop */}
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}