// javascript
// client/src/pages/account/page.js
import { htmlToFragment } from "../../lib/utils.js";
import template from "./template.html?raw";
import { logout } from "../../data/auth.js";
import { updateAccount, fetchAccountProfile } from "../../data/account.js";

function getCurrentUser() {
    try {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            const parsed = JSON.parse(userJson);
            return parsed && typeof parsed === "object" ? parsed : null;
        }
        const token = localStorage.getItem("token");
        if (token && typeof decodeJwtPayload === "function") {
            const payload = decodeJwtPayload(token);
            if (payload && payload.email) {
                return { email: payload.email, ...payload };
            }
        }
    } catch (e) {
        console.error("[AccountPage] getCurrentUser error:", e);
    }
    return null;
}

export async function AccountPage() {
    let user = getCurrentUser();

    try {
        const { ok, status, data } = await fetchAccountProfile();
        if (!ok && status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/auth";
            return "";
        }
        if (ok && data) {
            const serverUser = data.user || data;
            if (serverUser && typeof serverUser === "object") {
                user = { ...(user || {}), ...serverUser };
                localStorage.setItem("user", JSON.stringify(user));
            }
        }
    } catch (e) {
        console.error("[AccountPage] fetchAccountProfile error:", e);
        if (!user) {
            window.location.href = "/auth";
            return "";
        }
    }

    if (!user) {
        window.location.href = "/auth";
        return "";
    }

    const html = template
        .replace('id="nom"', `id="nom" value="${user.nom || ""}"`)
        .replace('id="prenom"', `id="prenom" value="${user.prenom || ""}"`)
        .replace('id="email"', `id="email" value="${user.email || ""}"`)
        .replace('id="password"', `id="password" value=""`);

    const fragment = htmlToFragment(html);

    const nomInput = fragment.querySelector("#nom");
    const prenomInput = fragment.querySelector("#prenom");
    const emailInput = fragment.querySelector("#email");

    const logoutBtn = fragment.querySelector("#logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (ev) => {
            ev.preventDefault();
            try {
                await logout();
                localStorage.removeItem("user");
                window.location.href = "/";
            } catch (e) {
                console.error("[AccountPage] logout error:", e);
            }
        });
    }

    const form = fragment.querySelector("#accountForm");
    if (form) {
        form.addEventListener("submit", async (ev) => {
            ev.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            // supprimer immédiatement le localStorage
            localStorage.removeItem("user");

            const nom = form.nom.value.trim();
            const prenom = form.prenom.value.trim();
            const email = form.email.value.trim();
            const password = form.password.value;
            const body = { email: user.email };
            if (nom) body.nom = nom;
            if (prenom) body.prenom = prenom;
            if (password) body.password = password;
            if (email && email !== user.email) body.new_email = email;

            try {
                const { ok, status } = await updateAccount(body);

                if (!ok && status === 401) {
                    // session invalide -> forcer login
                    localStorage.removeItem("user");
                    window.location.href = "/auth";
                    return;
                }
            } catch (e) {
                console.error("[AccountPage] updateAccount error:", e);
                // on poursuit vers le reload pour recréer le localStorage depuis le serveur
            } finally {
                // reload dans tous les cas pour que l'initialisation refasse le localStorage
                window.location.reload();
            }
        });
    }

    return fragment;
}
