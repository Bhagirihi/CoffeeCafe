import Image from "next/image";
import Link from "next/link";
import { formatPrice, formatPriceRange } from "../lib/menu-data";

export default function MenuItem({ item }) {
  const imageSrc = item.imageData || item.image || "/assets/images/menu-1.png";

  let priceDisplay = formatPrice(item.price);
  if (item.jar_price || item.slice_price) {
    priceDisplay = formatPriceRange(item);
  }

  let description = item.description || "";
  let ingredients = item.ingredients || "";
  if (item.description && item.description.length > 0) {
    description = `${item.description}`;
  }
  if (item.ingredients && item.ingredients.length > 0) {
    ingredients = `Ingredients: ${item.ingredients.join(", ")}`;
  }

  const specialDishBadge = item.isSpecialDish ? (
    <span
      className="badge label-1"
      style={{
        background: "var(--gold-crayola)",
        color: "var(--black)",
        fontWeight: "bold",
        padding: "6px 12px",
        borderRadius: "20px",
        boxShadow: "0 2px 8px rgba(218, 165, 32, 0.4)",
      }}
    >
      ⭐ Special
    </span>
  ) : null;

  const specialDishBorder = item.isSpecialDish
    ? {
        border: "3px solid var(--gold-crayola)",
        borderRadius: "10px",
        padding: "10px",
      }
    : {};

  return (
    <li>
      <div className="menu-card hover:card" style={specialDishBorder}>
        <figure
          className="card-banner img-holder"
          style={{ "--width": 100, "--height": 100 }}
        >
          <Image
            src={imageSrc}
            width={100}
            height={100}
            alt={item.name}
            className="img-cover"
            unoptimized
          />
        </figure>
        <div>
          <div className="title-wrapper">
            <h3 className="title-3">
              <Link href="#" className="card-title">
                {item.name}
              </Link>
            </h3>
            {item.badge && <span className="badge label-1">{item.badge}</span>}
            {specialDishBadge}
            <span className="span title-2">{priceDisplay}</span>
          </div>
          {description && <p className="card-text label-1">{description}</p>}

          {ingredients && <p className="card-text label-2">{ingredients}</p>}
        </div>
      </div>
    </li>
  );
}
