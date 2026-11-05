import { Link, useParams } from "react-router-dom";
import policies from "../data/policies";

const nav = [
  { slug: "refund-policy", label: "Refund Policy" },
  { slug: "privacy-policy", label: "Privacy Policy" },
  { slug: "delivery-policy", label: "Delivery Policy" },
  { slug: "terms-and-conditions", label: "Terms and Conditions" },
];

export default function Policy() {
  const { slug } = useParams();
  const policy = policies[slug];

  if (!policy) {
    return (
      <div className="pt-36 pb-20 text-center">
        <p className="text-gray-500">Page not found.</p>
        <Link to="/" className="mt-4 inline-block text-sm uppercase tracking-widest border-b border-black pb-1">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
      <h1 className="font-heading text-4xl text-center">{policy.title}</h1>
      <p className="mt-3 text-center text-xs text-gray-500">Last updated: {policy.updated}</p>

      <div className="mt-12 flex flex-col gap-10">
        {policy.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-sm uppercase tracking-widest font-semibold mb-3">{s.heading}</h2>
            {s.body?.map((p, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-3">{p}</p>
            ))}
            {s.list && (
              <ul className="list-disc pl-5 text-gray-600 leading-relaxed flex flex-col gap-1">
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
        {nav
          .filter((n) => n.slug !== slug)
          .map((n) => (
            <Link key={n.slug} to={`/policies/${n.slug}`} className="text-gray-600 hover:text-black transition">
              {n.label}
            </Link>
          ))}
      </div>
    </div>
  );
}