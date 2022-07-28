import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { register } from '../actions/auth';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register({
            name, 
            email, 
            password  // if the key and value are identical, just use one word. So the original version is: "name: name, email: email, password: password".
        });
            console.log('REGISTER USER ===> ', res);
            toast.success('Register success. Please login.');
        } catch (err) {
            console.log(err);
            if (err.response.status === 400) toast.error(err.response.data);
        }
    };

    return (
        <>
            <div className="container-fluid h1 p-5 text-center">
                <h1>Register Page</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <RegisterForm handleSubmit={handleSubmit} name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>   
                    </div>
                </div>
            </div>
        </>
    )
};

export default Register;