import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllData } from '../util/index';

const URL = 'http://localhost:8000/api/v1/';

const Home = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    (async () => {
      try {
        const response = await axios.get(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(response.data.data || 'No data received');
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to load data');
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      }
    })();

    return () => {
      console.log('unmounting');
    };
  }, []);

 const handleLogout = async () => {
    try {
      await axios.post(`${URL}logout`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="flex flex-col justify-center items-center text-center min-h-screen bg-gradient-to-r from-cyan-400 to-blue-500">
      <h1 className="text-4xl font-bold text-white mb-8">Login Success Page</h1>
      <p className="text-xl text-white mb-6">{message}</p>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;