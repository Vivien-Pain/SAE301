// javascript
import { API_URL } from "../lib/api-request.js";

export async function updateAccount(body) {
    const url = `${API_URL}profils/account/update`;
    console.debug("[updateAccount] URL:", url);
    console.debug("[updateAccount] Body envoyé :", body);

    let res;
    try {
        res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(body),
            credentials: "include"
        });
    } catch (e) {
        console.error("[updateAccount] fetch error:", e);
        return { ok: false, status: 0, data: null };
    }

    console.debug("[updateAccount] HTTP status:", res.status);
    const ct = res.headers.get("content-type") || "";
    let data = null;
    try {
        if (ct.includes("application/json")) {
            data = await res.json();
        } else {
            data = await res.text();
        }
    } catch (e) {
        console.warn("[updateAccount] impossible de parser la réponse :", e);
    }

    console.debug("[updateAccount] réponse parsée:", data);
    if (data && typeof data === "object" && data.user) {
        console.info("[updateAccount] user reçu depuis le serveur:", data.user);
    }

    return { ok: res.ok, status: res.status, data };
}

export async function fetchAccountProfile() {
    const url = `${API_URL}profils/account/`;
    console.debug("[fetchAccountProfile] URL:", url);

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "include"
        });

        console.debug("[fetchAccountProfile] HTTP status:", res.status);
        const ct = res.headers.get("content-type") || "";
        let data = null;
        try {
            if (ct.includes("application/json")) data = await res.json();
            else data = await res.text();
        } catch (e) {
            console.warn("[fetchAccountProfile] parse error:", e);
        }

        console.debug("[fetchAccountProfile] réponse parsée:", data);
        if (data && typeof data === "object" && data.user) {
            console.info("[fetchAccountProfile] user reçu:", data.user);
        }

        return { ok: res.ok, status: res.status, data };
    } catch (e) {
        console.error("[fetchAccountProfile] fetch error:", e);
        return { ok: false, status: 0, data: null };
    }
}
