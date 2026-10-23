// ============================================================
// pages/auth/Cadastro
// Tela de criação de conta em 2 passos:
//   1) Seus dados  (tipo de conta, nome, e-mail, celular)
//   2) Senha
// A lógica (validação, API) está em hooks/useCadastroForm.js
// Se o usuário já estiver logado, vai direto para a área dele.
// ============================================================
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { rotaInicialPorNivel } from '../../../utils/rotasPorNivel'
import { useCadastroForm } from '../../../hooks/useCadastroForm'
import TextField from '../../../components/TextField'
import Button from '../../../components/Button'
import iconeEmail from '../../../assets/auth/icon_email.png'
import iconeCadeado from '../../../assets/auth/icon_cadeado.png'
import iconeOlho from '../../../assets/auth/icon_olho.png'
import iconeNome from '../../../assets/auth/IconNome.png'
import iconeTelefone from '../../../assets/auth/IconTelefone.png'

// Ícone de documento (CPF/CRP): ainda não existe png na pasta assets, então fica em SVG
const props = {
  width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: '#7C6B8A',
  strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
}
const IconeDocumento = (
  <svg {...props}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></svg>
)


const PASSOS = ['Seus dados', 'Senha']

export default function Cadastro() {
  const { auth } = useAuth()
  const f = useCadastroForm()

  const rota = auth && rotaInicialPorNivel(auth.nivel)
  if (rota) return <Navigate to={rota} replace />

  const ehProfissional = f.valores.tipo === 'profissional'

  return (
    <main className="flex justify-center min-h-svh py-8 px-4 bg-fundo-suave">
      <div className="w-full max-w-[440px] flex flex-col gap-5">
        {/* Indicador de passos */}
        <ol className="flex items-center gap-2" aria-label="Etapas do cadastro">
          {PASSOS.map((nome, i) => {
            const numero = i + 1
            const ativo = numero === f.passo
            const feito = numero < f.passo
            return (
              <li
                key={nome}
                className={`flex items-center gap-2 text-[12px] ${
                  ativo ? 'text-texto font-semibold' : feito ? 'text-secundaria' : 'text-secundaria-alfa-50'
                }`}
              >
                <span
                  className={`grid place-items-center w-6 h-6 rounded-full text-[11px] font-bold ${
                    ativo || feito ? 'bg-primaria text-branco' : 'bg-borda text-secundaria'
                  }`}
                >
                  {feito ? '✓' : numero}
                </span>
                <span>{nome}</span>
                {numero < PASSOS.length && <span className="w-9 h-px bg-borda-forte" aria-hidden="true" />}
              </li>
            )
          })}
        </ol>

        <section className="p-6 bg-branco border border-borda rounded-2xl shadow-[0_4px_12px_var(--color-sombra)]">
          {f.passo === 1 ? (
            <form onSubmit={f.continuar} noValidate>
              <h1 className="text-[20px] font-extrabold text-texto">Criar conta</h1>
              <p className="mt-1 text-[13px] text-secundaria">Informe seus dados pessoais</p>

              <div className="flex flex-col gap-4 mt-5">
                {/* Tipo de conta */}
                <div className="flex flex-col gap-1.5 text-left">
                  <span className="text-[11px] font-bold text-texto" id="rotulo-tipo">Tipo de conta</span>
                  <div className="grid grid-cols-[1fr_1fr] gap-3" role="radiogroup" aria-labelledby="rotulo-tipo">
                    {[['paciente', 'Paciente'], ['profissional', 'Profissional']].map(([valor, texto]) => (
                      <button
                        key={valor}
                        type="button"
                        role="radio"
                        aria-checked={f.valores.tipo === valor}
                        className={`h-11 rounded-[10px] text-[12px] font-semibold leading-[normal] cursor-pointer transition-[background,border-color] duration-200 ease-[ease] hover:bg-fundo-suave-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaria ${
                          f.valores.tipo === valor
                            ? 'bg-fundo-card border-2 border-primaria text-primaria'
                            : 'bg-branco border border-borda text-secundaria'
                        }`}
                        onClick={() => f.alterarCampo('tipo', valor)}
                      >
                        {texto}
                      </button>
                    ))}
                  </div>
                </div>

                <TextField
                  label="Nome completo"
                  name="nome"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  icone={iconeNome}
                  value={f.valores.nome}
                  onChange={(e) => f.alterarCampo('nome', e.target.value)}
                  erro={f.errosCampos.nome}
                />

                <TextField
                  label="E-mail"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  icone={iconeEmail}
                  value={f.valores.email}
                  onChange={(e) => f.alterarCampo('email', e.target.value)}
                  erro={f.errosCampos.email}
                />

                <TextField
                  label="Celular"
                  type="tel"
                  name="celular"
                  autoComplete="tel"
                  placeholder="(11) 99999-9999"
                  icone={iconeTelefone}
                  value={f.valores.celular}
                  onChange={(e) => f.alterarCampo('celular', e.target.value)}
                  erro={f.errosCampos.celular}
                />

                {/* O back exige CPF e CRP para profissionais */}
                {ehProfissional && (
                  <>
                    <TextField
                      label="CPF"
                      name="cpf"
                      inputMode="numeric"
                      placeholder="000.000.000-00"
                      icone={IconeDocumento}
                      value={f.valores.cpf}
                      onChange={(e) => f.alterarCampo('cpf', e.target.value)}
                      erro={f.errosCampos.cpf}
                    />
                    <TextField
                      label="CRP"
                      name="crp"
                      placeholder="06/123456"
                      icone={IconeDocumento}
                      value={f.valores.crp}
                      onChange={(e) => f.alterarCampo('crp', e.target.value)}
                      erro={f.errosCampos.crp}
                    />
                  </>
                )}

                <Button type="submit">Continuar</Button>
              </div>
            </form>
          ) : (
            <form onSubmit={f.enviar} noValidate>
              <h1 className="text-[20px] font-extrabold text-texto">Crie sua senha</h1>
              <p className="mt-1 text-[13px] text-secundaria">Ela será usada para entrar na sua conta</p>

              <div className="flex flex-col gap-4 mt-5">
                {['senha', 'confirmarSenha'].map((campo) => (
                  <TextField
                    key={campo}
                    label={campo === 'senha' ? 'Senha' : 'Confirmar senha'}
                    type={f.mostrarSenha ? 'text' : 'password'}
                    name={campo}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    icone={iconeCadeado}
                    value={f.valores[campo]}
                    onChange={(e) => f.alterarCampo(campo, e.target.value)}
                    erro={f.errosCampos[campo]}
                    acao={
                      campo === 'senha' && (
                        <button
                          type="button"
                          className="flex p-0 border-0 bg-transparent cursor-pointer"
                          onClick={f.alternarSenha}
                          aria-label={f.mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                        >
                          <img className="w-4 h-4" src={iconeOlho} alt="" style={{ opacity: f.mostrarSenha ? 1 : 0.6 }} />
                        </button>
                      )
                    }
                  />
                ))}

                {f.erroGeral && <p className="px-3 py-2.5 border border-erro-borda rounded-lg bg-erro-fundo text-[12px] text-erro" role="alert">{f.erroGeral}</p>}

                <Button type="submit" carregando={f.carregando}>
                  {f.carregando ? 'Criando conta...' : 'Criar conta'}
                </Button>
                <Button type="button" variante="contorno" onClick={f.voltar} disabled={f.carregando}>
                  Voltar
                </Button>
              </div>
            </form>
          )}
        </section>

        <p className="text-center text-[12px] text-secundaria">
          Já tem conta? <Link className="text-primaria font-bold no-underline hover:underline" to="/login">Entrar</Link>
        </p>
      </div>
    </main>
  )
}