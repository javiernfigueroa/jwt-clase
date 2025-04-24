import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4001/api/products', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
    };

    const handleCreate = async () => {
        const token = localStorage.getItem('token');
        await axios.post(
            'http://localhost:4001/api/products',
            { name, price },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <input placeholder="Nombre" onChange={e => setName(e.target.value)} />
            <input placeholder="Precio" type="number" onChange={e => setPrice(e.target.value)} />
            <button onClick={handleCreate}>Crear producto</button>

            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        {p.name} - ${p.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
