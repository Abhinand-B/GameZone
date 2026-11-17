import axios from 'axios';
import { useState } from 'react';
import BASE_URL from '../config';
import '../App.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const changedata = (e) => {
        const { name, value } = e.target;

        setData({ ...data, [name]: value });
    };

    const sendData = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage('');

            const res = await axios.post(
                `${BASE_URL}/api/user/login`,
                data,
                {
                    withCredentials: true
                }
            );

            login(
                res.data.accesstoken,
                res.data.role,
                res.data.username
            );

            setMessage('Login successful!');

            setData({
                email: '',
                password: ''
            });

            navigate("/");

        }
        catch (error) {

            console.log(error);

            setMessage(
                error.response?.data?.message ||
                'Login failed. Please try again.'
            );

        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-box">

                <h2>GAMEZONE</h2>

                <p className="auth-subtitle">
                    Login to access your gaming PC builder.
                </p>

                <form onSubmit={sendData}>

                    <div className="auth-form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                            value={data.email}
                            onChange={changedata}
                            required
                        />

                    </div>

                    <div className="auth-form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={data.password}
                            onChange={changedata}
                            required
                        />

                    </div>

                    {message && (
                        <p className="auth-message">
                            {message}
                        </p>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="auth-link">
                        Don't have an account?
                        <Link to="/register"> Register</Link>
                    </p>

                </form>

            </div>

        </div>
    );
}

export default Login;