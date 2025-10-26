import { useState } from 'react';

export default function useAuth() {
  const [user, setUser] = useState(null);
  return { user, login: () => setUser({ name: 'User' }), logout: () => setUser(null) };
}
