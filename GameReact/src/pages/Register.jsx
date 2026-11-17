import axios from 'axios';
import { useState } from 'react';
import BASE_URL from '../config';
import '../App.css';
import { useNavigate, Link } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const changedata = (e) => {
        const { name, value } = e.target;

        setData({...data,[name]: value});
    };

    const sendData = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage('');

            const res = await axios.post(
                `${BASE_URL}/api/user/register`,
                data
            );

            console.log(res.data);

            setMessage('Registration successful!');

            setData({
                username: '',
                email: '',
                phone: '',
                password: ''
            });

            navigate("/login");

        }
        catch (error) {

            console.log(error);

            setMessage(
                error.response?.data?.message ||
                'Registration failed. Please try again.'
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
                    Create your account and start building your dream PC.
                </p>

                <form onSubmit={sendData}>

                    <div className="auth-form-group">
                        <label>Username</label>

                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={data.username}
                            onChange={changedata}
                            required
                        />
                    </div>

                    <div className="auth-form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={changedata}
                            required
                        />
                    </div>

                    <div className="auth-form-group">
                        <label>Phone</label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter phone number"
                            value={data.phone}
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
                            minLength="6"
                        />
                    </div>

                    {message && (
                        <p className="auth-message">
                    {message}
                    </p>
                    )}

                    <button type="submit" disabled={loading}>
                      {loading ? 'Registering...' : 'Register'}
                    </button>

                    <p className="auth-link">
                         Already have an account?
                        <Link to="/login"> Login</Link>
                    </p>

                </form>

            </div>

        </div>
    );
}

export default Register;