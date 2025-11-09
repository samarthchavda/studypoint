let logoutTimer = null;

export function startSession(store) {
  // store: redux store with dispatch and getState
  const auth = JSON.parse(localStorage.getItem('auth') || 'null');
  if (!auth || !auth.expiresAt) return;

  const remaining = auth.expiresAt - Date.now();
  if (remaining <= 0) {
    // already expired
    store.dispatch({ type: 'auth/removeToken' });
    return;
  }

  // clear any existing
  if (logoutTimer) clearTimeout(logoutTimer);

  logoutTimer = setTimeout(() => {
    store.dispatch({ type: 'auth/removeToken' });
    // You may also want to redirect to login; keep UI code responsible for that
  }, remaining);
}

export function createSession(dispatch, tokenString) {
  // This will be called when user logs in - tokenString is raw JWT
  const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes
  const stored = { value: tokenString, expiresAt };
  localStorage.setItem('auth', JSON.stringify(stored));
  // start timer using a small store-like object
  startSession({ dispatch });
}

export function clearSession() {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
    logoutTimer = null;
  }
  localStorage.removeItem('auth');
}

export function getAuthValue() {
  try {
    const auth = JSON.parse(localStorage.getItem('auth') || 'null');
    if (!auth) return null;
    if (auth.expiresAt && auth.expiresAt > Date.now()) return auth.value;
    // expired
    localStorage.removeItem('auth');
    return null;
  } catch (e) {
    return null;
  }
}
