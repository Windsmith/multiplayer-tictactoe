import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className="flex flex-col">
            <div className="flex flex-col">
                <label>Enter your username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
            </div>
            <div className="flex flex-col">
                <label>Enter your email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
            </div>
            <div className="flex flex-col">
                <label>Enter your password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
            </div>
            <button>Signup</button>
        </form>

    )
}