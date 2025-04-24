import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:4001/api/auth/register', {
                email,
                password,
            });
            alert('Usuario registrado. Puedes iniciar sesión.');
            navigate('/');
        } catch (err) {
            console.log(err);
            alert('Error al registrar');
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Registrar</button>
        </div>
    );
}

export default Register;
