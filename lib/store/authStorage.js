export function readStoredAuth() {
  if (typeof window === "undefined") return { user: null, token: null };

  const storages = [window.localStorage, window.sessionStorage];
  let token = null;
  let user = null;
  for (const storage of storages) {
    token ||= storage.getItem("authToken");
    const rawUser = storage.getItem("authUser");
    if (!rawUser) continue;
    try {
      user ||= JSON.parse(rawUser);
    } catch {
      storage.removeItem("authUser");
    }
  }
  if (token && user) return { token, user };

  return { user: null, token: null };
}

export function saveStoredAuth(data, persistent = true) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("authToken");
  window.localStorage.removeItem("authUser");
  window.sessionStorage.removeItem("authToken");
  window.sessionStorage.removeItem("authUser");
  const storage = persistent ? window.localStorage : window.sessionStorage;
  storage.setItem("authToken", data.token);
  storage.setItem("authUser", JSON.stringify(data.user));
}

export function clearStoredAuth() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("authToken");
  window.localStorage.removeItem("authUser");
  window.sessionStorage.removeItem("authToken");
  window.sessionStorage.removeItem("authUser");
}
