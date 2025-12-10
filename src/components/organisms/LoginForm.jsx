import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../services/auth.service';

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Front-end validation
    if (!formData.username || !formData.password) {
      setError('Usuario y contraseña son obligatorios');
      return;
    }

    setSubmitting(true);
    try {
      const data = await loginService(formData);

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', data.username);

      if (data.role === 'ADMIN') navigate('/admin');
      else navigate('/');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Usuario o contraseña incorrectos');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded shadow-lg bg-white w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej: admin"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="******"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 disabled:opacity-60 text-white font-bold py-2 px-4 rounded w-full"
        >
          {submitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;