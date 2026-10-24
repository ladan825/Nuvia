export const AUDIENCES = ["men", "women", "kids"];

export const CATEGORIES = [
  { slug: "native", label: "Native" },
  { slug: "two-piece", label: "2-Piece" },
  { slug: "suit", label: "Suit" },
];

export const formatNaira = (n) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);