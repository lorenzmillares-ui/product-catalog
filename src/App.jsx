import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  const handleAddToCart = (productTitle) => {
    setCount((c) => c + 1);
    setLastAdded(productTitle);
  };

  return (
    <div className="app">
      <header>
        <h1>CvSU Mini Store</h1>
        <p className="cart-msg">
          {count === 0
            ? "Your cart is empty."
            : `Items added to cart: ${count} (Last added: ${lastAdded})`}
        </p>
      </header>

      <div className="grid">
        {products.map((p, index) => (
          <ProductCard
            key={p.id}
            title={p.title}
            price={p.price}
            category={p.category}
            inStock={p.inStock}
            onAddToCart={handleAddToCart}
          >
            {index === 0 && <span className="badge new">New</span>}
            {index === 3 && <span className="badge sale">Sale</span>}
          </ProductCard>
        ))}
      </div>
    </div>
  );
}

export default App;