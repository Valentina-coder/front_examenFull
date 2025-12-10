import { Link } from 'react-router-dom';

const Navbar = () => {
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-white text-lg">MiTienda</Link>
          <Link to="/admin" className="text-slate-300 hover:text-white">Productos</Link>
          <Link to="/admin/ventas" className="text-slate-300 hover:text-white">Ventas</Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-300 text-sm">{username || 'Invitado'}</span>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded text-white text-sm">Salir</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
