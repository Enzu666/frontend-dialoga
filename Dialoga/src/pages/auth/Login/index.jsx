import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

export default function Login() {
  // Pega a função de login que criamos no AuthContext
  const { login } = useAuth()

  // useNavigate dá uma função para trocar de página "por código"
  // (diferente do NavLink, que é um link clicável)
  const navigate = useNavigate()

  // Estados: guardam o que o usuário digita e a mensagem de erro
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  // Roda quando o usuário envia o formulário
  async function handleSubmit(e) {
    e.preventDefault() // impede o navegador de recarregar a página ao enviar o form
    setErro('')        // limpa erro antigo

    try {
      // Chama o login do contexto. Se a senha estiver errada, ele lança erro (cai no catch).
      const { nivel } = await login(email, senha)

      // Decide para onde ir conforme o tipo de usuário:
      // 2 = paciente, 1 = profissional. (0 = admin: ainda sem área, por isso cai no else)
      if (nivel === 2) navigate('/paciente')
      else if (nivel === 1) navigate('/profissional')
      else setErro('Este tipo de usuário ainda não tem área no site.')

    } catch (err) {
      // Mostra na tela a mensagem que o backend mandou (ex.: "usuário não autorizado")
      setErro(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      {/* value + onChange: o campo sempre reflete o estado, e o estado
          atualiza a cada tecla digitada (padrão do React chamado "input controlado") */}
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      {/* Só mostra o parágrafo se existir mensagem de erro */}
      {erro && <p>{erro}</p>}

      <button type="submit">Entrar</button>
    </form>
  )
}