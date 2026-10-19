// ============================================================
// config/api.js
// Configuração da URL da API (back-end).
// Para usar outro endereço, crie um arquivo .env na raiz do
// front com:  VITE_API_URL=http://meu-servidor:8080/v1/dialoga
// ============================================================
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/v1/dialoga'
