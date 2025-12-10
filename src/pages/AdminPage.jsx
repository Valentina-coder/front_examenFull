import { useEffect, useState } from 'react';
import Navbar from '../components/organisms/Navbar';
import ProductList from '../components/organisms/ProductList';
import * as productService from '../services/product.service';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', description: '', stock: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data || []);
      } catch (err) {
        console.error('Error cargando productos', err);
        setError('No se pudieron cargar los productos. Verifica el backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: '2rem auto', padding: '1rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>Panel de Administración</h1>
            <p style={{ color: '#374151' }}>Gestiona productos, ventas y usuarios.</p>
          </div>
        </header>

        <section className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div />
            <div>
              <button
                onClick={() => { setSelected(null); setForm({ name: '', price: '', description: '', stock: '' }); setFormOpen(true); }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Nuevo Producto
              </button>
            </div>
          </div>

          {loading && <p>Cargando productos...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && !error && (
            <>
              <ProductList
                products={products}
                onEdit={(p) => { setSelected(p); setForm({ name: p.name || '', price: p.price || '', description: p.description || '', stock: p.stock || '' }); setFormOpen(true); }}
                onDelete={async (p) => {
                  const ok = window.confirm(`Eliminar producto "${p.name}"?`);
                  if (!ok) return;
                  try {
                    await productService.deleteProduct(p.id ?? p._id);
                    setProducts((prev) => prev.filter((x) => (x.id ?? x._id) !== (p.id ?? p._id)));
                  } catch (err) {
                    console.error('Eliminar error', err);
                    alert('No se pudo eliminar el producto');
                  }
                }}
              />

              {formOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                  <div className="bg-white rounded p-6 w-full max-w-lg">
                    <h2 className="text-lg font-semibold mb-3">{selected ? 'Editar Producto' : 'Crear Producto'}</h2>

                    <div className="grid grid-cols-1 gap-3">
                      <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2 rounded" placeholder="Nombre" />
                      <input name="price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border p-2 rounded" placeholder="Precio" type="number" />
                      <input name="stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="border p-2 rounded" placeholder="Stock" type="number" />
                      <textarea name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-2 rounded" placeholder="Descripción" />
                    </div>

                    <div className="flex gap-2 justify-end mt-4">
                      <button onClick={() => setFormOpen(false)} className="px-3 py-2 rounded border">Cancelar</button>
                      <button
                        onClick={async () => {
                          // simple validation
                          if (!form.name || form.name.trim() === '') { alert('Nombre requerido'); return; }
                          try {
                            if (selected) {
                              const id = selected.id ?? selected._id;
                              const updated = await productService.updateProduct(id, { ...form });
                              setProducts((prev) => prev.map((x) => ((x.id ?? x._id) === id ? updated : x)));
                            } else {
                              const created = await productService.createProduct({ ...form });
                              setProducts((prev) => [created, ...prev]);
                            }
                            setFormOpen(false);
                          } catch (err) {
                            console.error('Guardar producto', err);
                            alert('Error guardando producto');
                          }
                        }}
                        className="px-4 py-2 rounded bg-green-600 text-white"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminPage;