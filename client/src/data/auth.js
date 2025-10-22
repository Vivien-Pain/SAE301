import { api } from "../lib/api-request.js";

export async function register({ email, password }) {
    const res = await fetch(api('profils'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    return data;
}

export async function login({ email, password }) {
    const res = await fetch(api('profils/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    return data;
}


export async function logout() {
    const res = await fetch(api('profils/logout'), {
        method: 'POST',
        credentials: 'include'
    });
    return true;
}

