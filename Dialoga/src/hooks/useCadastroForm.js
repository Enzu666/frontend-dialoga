// ============================================================
// hooks/useCadastroForm.js
// Lógica do cadastro em 2 passos (a tela só cuida do visual):
//   passo 1 -> tipo de conta, nome, e-mail, celular
//   passo 2 -> senha e confirmação (e envio para a API)
// Depois de criar a conta, já faz o login e vai para a área do usuário.
// ============================================================
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { cadastrarRequest } from '../services/cadastroService'
import { rotaInicialPorNivel } from '../utils/rotasPorNivel'
import {
  validarCadastroDados,
  validarCadastroSenha,
  mascararCelular,
  mascararCpf,
  limparCpf,
} from '../utils/validators'

const VALORES_INICIAIS = {
  tipo: 'paciente',
  nome: '',
  email: '',
  celular: '',
  cpf: '',
  crp: '',
  senha: '',
  confirmarSenha: '',
}

export function useCadastroForm() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [passo, setPasso] = useState(1)
  const [valores, setValores] = useState(VALORES_INICIAIS)
  const [errosCampos, setErrosCampos] = useState({})
  const [erroGeral, setErroGeral] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)

  // Atualiza um campo (aplicando máscara quando existir) e limpa o erro dele
  function alterarCampo(campo, valor) {
    if (campo === 'celular') valor = mascararCelular(valor)
    if (campo === 'cpf') valor = mascararCpf(valor)
    setValores((v) => ({ ...v, [campo]: valor }))
    setErrosCampos((e) => ({ ...e, [campo]: undefined }))
    setErroGeral('')
  }

  // Passo 1 -> passo 2
  function continuar(evento) {
    evento.preventDefault()
    const erros = validarCadastroDados(valores)
    setErrosCampos(erros)
    if (Object.keys(erros).length === 0) setPasso(2)
  }

  function voltar() {
    setErrosCampos({})
    setErroGeral('')
    setPasso(1)
  }

  // Passo 2: cria a conta
  async function enviar(evento) {
    evento.preventDefault()
    const erros = validarCadastroSenha(valores)
    setErrosCampos(erros)
    if (Object.keys(erros).length > 0) return

    setCarregando(true)
    setErroGeral('')
    try {
      const dados = {
        nome_completo: valores.nome.trim(),
        email: valores.email.trim(),
        celular: valores.celular,
        senha: valores.senha,
      }
      if (valores.tipo === 'profissional') {
        dados.cpf = limparCpf(valores.cpf)
        dados.crp = valores.crp.trim()
      }

      await cadastrarRequest(valores.tipo, dados)

      // Conta criada: entra direto
      const { nivel } = await login(dados.email, dados.senha)
      navigate(rotaInicialPorNivel(nivel) ?? '/login', { replace: true })
    } catch (erro) {
      setErroGeral(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  return {
    passo,
    valores,
    errosCampos,
    erroGeral,
    carregando,
    mostrarSenha,
    alterarCampo,
    alternarSenha: () => setMostrarSenha((m) => !m),
    continuar,
    voltar,
    enviar,
  }
}
