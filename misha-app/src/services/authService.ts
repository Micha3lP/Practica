import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  sub: string;
  role: string;
  jti: string;
  exp: number;
  iss: string;
  aud: string;
}

export const authService = {
  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post('https://localhost:7008/api/Auth/login', {
        username,
        password,
      });

      if (response.status === 200 && response.data.token) {
        // Almacenar el token en localStorage
        localStorage.setItem('authToken', response.data.token);
        return true;
      }

      return false; // Login fallido
    } catch (error) {
      console.error('Error en la autenticación:', error);
      return false;
    }
  },

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('authToken');
  },

  getRole (): string | null {
  const token = localStorage.getItem('authToken'); // Obtener el token desde localStorage
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token); // Decodificar el token
      return decoded.role; // Retornar el rol del usuario
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
  return null;
  }
};
