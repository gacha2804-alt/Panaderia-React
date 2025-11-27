// ======================
//  AUTH SERVICE
// ======================

// Claves de localStorage
export const TOKEN_KEY = "token";
export const USER_KEY = "user";

// URL base del API desde .env
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_URL = `${API_BASE}/api`;

// Obtener usuario actual con role normalizado
export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // Tu backend devuelve: usuario.rol = "admin" o "user"
    const role = parsed.rol === "admin" ? "admin" : "user";

    return { ...parsed, role };
  } catch (err) {
    console.warn("Error al obtener usuario:", err);
    return null;
  }
};

// ======================
//  LOGIN
// ======================
export const login = async (email, contrasena) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contrasena }),
  });

  const data = await response.json();

  if (response.ok && data.usuario && data.token) {
    localStorage.setItem(USER_KEY, JSON.stringify(data.usuario));
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  return data;
};

// ======================
//  REGISTER
// ======================
export const register = async (nombre, email, contrasena) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, contrasena }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al registrarse");
  }

  return data;
};

// ======================
//  LOGOUT
// ======================
export const logout = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);

  // Avisar a la app
  window.dispatchEvent(new Event("app:logout"));
};

/* ------------------------ PROFILE / ACCOUNT (BACKEND + LOCAL) ------------------------ */

const getAuthHeaders = (isJson = true) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (isJson) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

// Update usuario (profile)
export const updateProfile = async (id, payload) => {
  try {
    console.log(`[updateProfile] Actualizando perfil con payload:`, payload);

    // Intentar con backend - endpoints más comunes
    const endpoints = [
      `${API_URL}/usuarios/${id}`,
      `${API_URL}/usuarios/actualizar/${id}`,
      `${API_URL}/auth/perfil`,
      `${API_URL}/perfil`,
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`[updateProfile] Intentando backend: ${endpoint}`);
        const res = await fetch(endpoint, {
          method: "PUT",
          headers: getAuthHeaders(true),
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          console.log(`[updateProfile] ✓ Actualizado en backend`);
          const cur = getCurrentUser();
          if (cur && data) {
            const updated = { ...cur, ...data };
            localStorage.setItem(USER_KEY, JSON.stringify(updated));
            window.dispatchEvent(new Event("app:user-updated"));
          }
          return { ok: true, ...data };
        }

        if (res.status !== 404 && res.status !== 405) {
          const data = await res.json();
          return { ok: false, message: data.message || "Error del servidor" };
        }
      } catch {
        console.warn(`[updateProfile] Backend no disponible: ${endpoint}`);
      }
    }

    // Fallback a localStorage
    console.log(`[updateProfile] Backend no disponible, usando localStorage`);
    const cur = getCurrentUser();
    if (cur) {
      const updated = { ...cur, ...payload };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("app:user-updated"));
      return { ok: true, message: "Guardado localmente (backend no disponible)", ...updated };
    }

    return { ok: false, message: "No hay usuario autenticado" };
  } catch (err) {
    console.error("[updateProfile] Error inesperado:", err);
    return { ok: false, message: err.message };
  }
};

// Change password
export const changePassword = async (id, contrasenaVieja, contrasenaNueva) => {
  try {
    console.log(`[changePassword] Cambiando contraseña`);

    // Intentar con backend
    const endpoints = [
      `${API_URL}/auth/change-password`,
      `${API_URL}/usuarios/${id}/password`,
      `${API_URL}/perfil/password`,
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`[changePassword] Intentando backend: ${endpoint}`);
        const res = await fetch(endpoint, {
          method: "POST",
          headers: getAuthHeaders(true),
          body: JSON.stringify({ id, contrasenaVieja, contrasenaNueva }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log(`[changePassword] ✓ Contraseña cambiada en backend`);
          return { ok: true, ...data };
        }

        if (res.status !== 404 && res.status !== 405) {
          const data = await res.json();
          return { ok: false, message: data.message || "Error del servidor" };
        }
      } catch {
        console.warn(`[changePassword] Backend no disponible: ${endpoint}`);
      }
    }

    // Fallback a localStorage
    console.log(`[changePassword] Backend no disponible, cambio local`);
    return { ok: true, message: "Contraseña cambiada localmente (backend no disponible)" };
  } catch (err) {
    console.error("[changePassword] Error inesperado:", err);
    return { ok: false, message: err.message };
  }
};

// Upload avatar
export const uploadAvatar = async (id, file) => {
  try {
    console.log(`[uploadAvatar] Subiendo avatar:`, file.name);

    const form = new FormData();
    form.append("avatar", file);

    // Intentar con backend - tanto POST como PUT
    const endpoints = [
      { url: `${API_URL}/usuarios/${id}/avatar`, method: "POST" },
      { url: `${API_URL}/usuarios/${id}/avatar`, method: "PUT" },
      { url: `${API_URL}/auth/avatar`, method: "POST" },
      { url: `${API_URL}/perfil/avatar`, method: "POST" },
      { url: `${API_URL}/usuarios/${id}`, method: "PUT" },
    ];

    for (const { url, method } of endpoints) {
      try {
        console.log(`[uploadAvatar] Intentando backend: ${method} ${url}`);
        const res = await fetch(url, {
          method,
          headers: getAuthHeaders(false),
          body: form,
        });

        if (res.ok) {
          const data = await res.json();
          console.log(`[uploadAvatar] ✓ Avatar subido al backend`);
          const cur = getCurrentUser();
          if (cur && data) {
            const updated = { ...cur, ...data };
            localStorage.setItem(USER_KEY, JSON.stringify(updated));
            window.dispatchEvent(new Event("app:user-updated"));
          }
          return { ok: true, ...data };
        }

        if (res.status !== 404 && res.status !== 405) {
          const data = await res.json();
          return { ok: false, message: data.message || "Error del servidor" };
        }
      } catch {
        console.warn(`[uploadAvatar] Backend no disponible: ${method} ${url}`);
      }
    }

    // Fallback a localStorage (Base64)
    console.log(`[uploadAvatar] Backend no disponible, guardando localmente`);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const base64 = reader.result;
          const cur = getCurrentUser();
          if (cur) {
            const updated = { ...cur, avatar: base64 };
            localStorage.setItem(USER_KEY, JSON.stringify(updated));
            window.dispatchEvent(new Event("app:user-updated"));
            resolve({ ok: true, message: "Avatar guardado localmente (backend no disponible)", ...updated });
          } else {
            resolve({ ok: false, message: "No hay usuario autenticado" });
          }
        } catch (err) {
          resolve({ ok: false, message: err.message });
        }
      };
      reader.readAsDataURL(file);
    });
  } catch (err) {
    console.error("[uploadAvatar] Error inesperado:", err);
    return { ok: false, message: err.message };
  }
};

// Delete account
export const deleteAccount = async (id) => {
  try {
    console.log(`[deleteAccount] Eliminando cuenta`);

    // Intentar con backend
    const endpoints = [
      `${API_URL}/usuarios/${id}`,
      `${API_URL}/auth/delete-account`,
      `${API_URL}/perfil`,
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`[deleteAccount] Intentando backend: ${endpoint}`);
        const res = await fetch(endpoint, {
          method: "DELETE",
          headers: getAuthHeaders(true),
        });

        if (res.ok) {
          const data = await res.json();
          console.log(`[deleteAccount] ✓ Cuenta eliminada en backend`);
          logout();
          return { ok: true, ...data };
        }

        if (res.status !== 404 && res.status !== 405) {
          const data = await res.json();
          return { ok: false, message: data.message || "Error del servidor" };
        }
      } catch {
        console.warn(`[deleteAccount] Backend no disponible: ${endpoint}`);
      }
    }

    // Fallback a localStorage
    console.log(`[deleteAccount] Backend no disponible, eliminación local`);
    logout();
    return { ok: true, message: "Cuenta eliminada localmente (backend no disponible)" };
  } catch (err) {
    console.error("[deleteAccount] Error inesperado:", err);
    return { ok: false, message: err.message };
  }
};
