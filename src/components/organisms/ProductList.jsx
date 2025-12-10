import ProductCard from '../molecules/ProductCard';

const ProductList = ({ products = [], onEdit, onDelete }) => {
  if (!products || products.length === 0) return <p>No hay productos registrados.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
      {products.map((p) => (
        <ProductCard key={p.id ?? p._id ?? p.name} product={p} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ProductList;
