// 📦 Importando o Axios — responsável por fazer requisições HTTP ao backend
import axios from "axios";

// 🌐 Criamos uma instância do Axios já configurada
// ✅ Assim todos os serviços usam a mesma baseURL automaticamente
// ✅ Facilita deploy: basta trocar essa baseURL pelo endereço do servidor
// ✅ Em dev: aponta para o backend rodando em Docker/localhost
const api = axios.create({
  baseURL: "http://localhost:5000/api", // 🚀 Endereço do backend Express
});

// ✅ Exportamos a instância para usar em qualquer lugar do frontend
export default api;
