import { Link } from "react-router-dom";

const items = [
  { to: "/shop/men", label: "Men", img: "/men.jpeg" },
  { to: "/shop/women", label: "Women", img: "/women.jpeg" },
  { to: "/shop/kids", label: "Kids", img: "/kids.jpeg" },
];

export default function Gender() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-3">
      {items.map((i) => (
        <Link key={i.to} to={i.to} className="flex flex-col items-center group">
          <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden">
            <img
              src={i.img}
              alt={`${i.label} collection`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
            />
          </div>
          <h2 className="my-6 font-heading text-2xl tracking-wide text-gray-900">{i.label}</h2>
        </Link>
      ))}
    </section>
  );
}