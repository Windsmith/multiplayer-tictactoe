import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState('');

    return (
        <div className="flex flex-col">
            <label>Enter your username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
            <Link to={`/game`}>Enter</Link>
        </div>

    )
}