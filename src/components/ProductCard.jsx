import "./ProductCard.css";

function ProductCard({ title, price, category = "General", inStock, onAddToCart, children }) {
  const formattedPrice = price.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className={`card ${inStock ? "" : "card--out"}`}>
      {children}
      <h3>{title}</h3>
      <p className="category">{category}</p>
      <p className="price">₱{formattedPrice}</p>
      <p className={inStock ? "stock in" : "stock out"}>
        {inStock ? "In Stock" : "Out of Stock"}
      </p>
      <button disabled={!inStock} onClick={() => onAddToCart(title)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;