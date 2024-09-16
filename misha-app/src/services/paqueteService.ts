import apiClient from './apiClient';

export interface Paquete {
  id: number;
  nombre: string;
  descripcion: string;
}

const obtenerPaquetes = async (): Promise<Paquete[]> => {
  const response = await apiClient.get('/Paquetes'); // Usando apiClient en lugar de axios
  return response.data;
};

const crearPaquete = async (paqueteData: Omit<Paquete, 'id'>): Promise<Paquete> => {
  const response = await apiClient.post('/Paquetes', paqueteData); // Usando apiClient en lugar de axios
  return response.data;
};

const actualizarPaquete = async (id: number, paqueteData: Omit<Paquete, 'id'>): Promise<Paquete> => {
  const response = await apiClient.put(`/Paquetes/${id}`, paqueteData); // Usando apiClient en lugar de axios
  return response.data;
};

const eliminarPaquete = async (id: number): Promise<void> => {
  await apiClient.delete(`/Paquetes/${id}`); // Usando apiClient en lugar de axios
};


const paqueteService = {
  obtenerPaquetes,
  crearPaquete,
  actualizarPaquete,
  eliminarPaquete,
};

export default paqueteService;
