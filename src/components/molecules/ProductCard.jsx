const ProductCard = ({ product, onEdit, onDelete }) => {
  const { name, price, description, stock, image } = product || {};

  return (
    <div className="bg-white border rounded p-3 shadow-sm flex flex-col">
      {image && <img src={image} alt={name} className="w-full h-36 object-cover rounded" />}
      <div className="mt-2 flex-1">
        <h3 className="font-semibold text-sm">{name}</h3>
        {description && <p className="text-xs text-gray-600 mt-1">{description}</p>}
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm font-medium">${price ?? '0.00'}</div>
        <div className="text-xs text-gray-500">Stock: {stock ?? '—'}</div>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={() => onEdit && onEdit(product)} className="flex-1 px-2 py-1 rounded bg-blue-600 text-white text-sm">Editar</button>
        <button onClick={() => onDelete && onDelete(product)} className="flex-1 px-2 py-1 rounded border text-sm">Eliminar</button>
      </div>
    </div>
  );
};

export default ProductCard;
