import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import { products } from "./data/products";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer); // cleanup
  }, [searchText]);

  // filter + sort, calculated during render (copy first, never mutate products)
  let filteredProducts = [...products]
    .filter((p) => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .filter((p) => category === "All" || p.category === category);

  if (sortOrder === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // title effect
  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
  }, [filteredProducts.length]);

  const handleAddToCart = (productTitle) => {
    setCount((c) => c + 1);
    setLastAdded(productTitle);
  };

  const handleClear = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
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

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={handleClear}
      />

      <p className="result-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {filteredProducts.length === 0 ? (
        <p className="empty">No products found. Try a different keyword or category.</p>
      ) : (
        <div className="grid">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              title={p.title}
              price={p.price}
              category={p.category}
              inStock={p.inStock}
              onAddToCart={handleAddToCart}
            >
              {p.id === 1 && <span className="badge new">New</span>}
              {p.id === 4 && <span className="badge sale">Sale</span>}
            </ProductCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;