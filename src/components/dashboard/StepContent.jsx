import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Clock, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stepsContent = {
  1: {
    phase: 'Diagnóstico',
    title: 'Encare sua realidade financeira',
    duration: '3 min',
    intro: 'O primeiro passo é olhar de frente para sua situação atual.',
    content: `Antes de qualquer mudança, você precisa saber exatamente onde está. Muita gente evita olhar para os números por medo, mas isso só piora a situação.

**Hoje você vai:**
Fazer um raio-x rápido da sua vida financeira. Sem julgamento, apenas clareza.`,
    tasks: [
      'Anote sua renda mensal líquida',
      'Liste seus 5 maiores gastos mensais',
      'Calcule quanto sobra (ou falta) no fim do mês',
    ],
  },
  2: {
    phase: 'Diagnóstico',
    title: 'Identifique os vazamentos',
    duration: '3 min',
    intro: 'Pequenos gastos repetidos drenam seu dinheiro sem você perceber.',
    content: `Vazamentos são aqueles gastos que parecem pequenos mas que, somados, fazem uma diferença enorme. Assinaturas esquecidas, delivery frequente, compras por impulso.

**A regra é simples:**
Se você não usa ou não precisa, está vazando dinheiro.`,
    tasks: [
      'Revise suas assinaturas (streaming, apps, etc)',
      'Olhe os últimos 30 dias do cartão de crédito',
      'Identifique 3 gastos que poderia eliminar',
    ],
  },
  3: {
    phase: 'Diagnóstico',
    title: 'Mapeie suas dívidas',
    duration: '3 min',
    intro: 'Conhecer o inimigo é metade da batalha.',
    content: `Se você tem dívidas, precisa saber exatamente quanto deve, para quem e a qual taxa de juros. Isso não é para se assustar, é para ter controle.

**Priorize assim:**
1. Dívidas com juros altos (cartão, cheque especial)
2. Financiamentos e empréstimos
3. Dívidas sem juros`,
    tasks: [
      'Liste todas as suas dívidas',
      'Anote o valor total e a parcela mensal de cada',
      'Identifique qual tem a maior taxa de juros',
    ],
  },
  4: {
    phase: 'Organização',
    title: 'Crie seu orçamento simples',
    duration: '3 min',
    intro: 'Orçamento não é prisão, é liberdade.',
    content: `Um orçamento simples te dá controle sobre seu dinheiro. A regra 50-30-20 é um bom começo:

**50%** → Necessidades (moradia, alimentação, transporte)
**30%** → Desejos (lazer, compras não essenciais)
**20%** → Objetivos (reserva, quitação de dívidas)

Ajuste os percentuais conforme sua realidade.`,
    tasks: [
      'Divida sua renda usando a regra 50-30-20',
      'Ajuste os valores para sua realidade',
      'Defina um limite máximo para gastos variáveis',
    ],
  },
  5: {
    phase: 'Organização',
    title: 'Separe suas contas',
    duration: '3 min',
    intro: 'Dinheiro misturado é dinheiro perdido.',
    content: `Ter uma conta só para tudo dificulta o controle. O ideal é separar:

**Conta corrente:** gastos do dia a dia
**Conta reserva:** dinheiro para emergências
**Conta investimentos:** quando estiver pronto

Não precisa abrir várias contas - pode usar "potes" virtuais.`,
    tasks: [
      'Defina como vai separar seu dinheiro',
      'Crie uma conta ou cofre separado para reserva',
      'Automatize transferência assim que receber',
    ],
  },
  6: {
    phase: 'Organização',
    title: 'Elimine ou renegocie dívidas',
    duration: '5 min',
    intro: 'Dívida cara é âncora que te puxa para baixo.',
    content: `Com suas dívidas mapeadas, é hora de agir. A estratégia:

**1. Dívidas pequenas:** quite de uma vez se possível
**2. Dívidas grandes:** renegocie taxas menores
**3. Cartão de crédito:** NUNCA pague só o mínimo

Ligue para os credores e negocie. Eles preferem receber menos do que não receber.`,
    tasks: [
      'Identifique dívidas que pode quitar agora',
      'Pesquise condições de renegociação',
      'Faça pelo menos uma ligação de negociação',
    ],
  },
  7: {
    phase: 'Organização',
    title: 'Crie regras pessoais',
    duration: '3 min',
    intro: 'Regras simples evitam decisões ruins.',
    content: `Quando você tem regras claras, não precisa gastar energia decidindo no momento. Exemplos:

• "Compras acima de R$100, espero 24h"
• "Delivery no máximo 1x por semana"
• "Antes de comprar: preciso ou quero?"

Suas regras devem ser simples e fáceis de seguir.`,
    tasks: [
      'Identifique seu maior ponto fraco de gastos',
      'Crie 3 regras pessoais de gastos',
      'Escreva em um lugar que vai ver todo dia',
    ],
  },
  8: {
    phase: 'Construção',
    title: 'Comece sua reserva de emergência',
    duration: '3 min',
    intro: 'Reserva não é luxo, é necessidade básica.',
    content: `A reserva de emergência te protege de imprevistos sem precisar se endividar.

**Meta inicial:** 1 mês de gastos essenciais
**Meta ideal:** 6 meses de gastos essenciais

Comece com qualquer valor. R$50, R$100, o que der. O importante é começar.`,
    tasks: [
      'Calcule quanto são seus gastos essenciais mensais',
      'Defina sua meta de reserva (comece com 1 mês)',
      'Determine quanto vai guardar por mês',
    ],
  },
  9: {
    phase: 'Construção',
    title: 'Automatize suas finanças',
    duration: '3 min',
    intro: 'O que é automático, acontece.',
    content: `Automatizar é a melhor forma de garantir que você vai seguir o plano. Configure:

• Transferência automática para reserva (logo após o salário)
• Pagamento automático de contas fixas
• Alerta de limite de gastos no cartão`,
    tasks: [
      'Configure transferência automática para reserva',
      'Ative débito automático das contas fixas',
      'Defina alerta de gastos no cartão',
    ],
  },
  10: {
    phase: 'Construção',
    title: 'Crie sua rotina financeira',
    duration: '3 min',
    intro: '10 minutos por semana mudam tudo.',
    content: `Uma rotina simples de revisão mantém você no controle:

**Domingo (5 min):** revisar gastos da semana
**Quarta (3 min):** verificar saldo e próximos vencimentos
**Sexta (2 min):** planejar gastos do fim de semana`,
    tasks: [
      'Escolha dia e horário para sua revisão semanal',
      'Coloque lembrete no celular',
      'Faça sua primeira revisão agora',
    ],
  },
  11: {
    phase: 'Mentalidade',
    title: 'Entenda juros compostos',
    duration: '3 min',
    intro: 'Juros trabalham para você ou contra você.',
    content: `Juros compostos são "juros sobre juros". Quando você deve, eles te afundam. Quando você investe, eles te enriquecem.

**Na dívida:** R$1.000 no cartão (12% ao mês) vira R$3.900 em 1 ano
**No investimento:** R$500/mês por 20 anos (10% ao ano) vira R$380.000

A diferença entre rico e pobre muitas vezes é só entender isso.`,
    tasks: [
      'Calcule quanto suas dívidas custariam em 1 ano',
      'Simule quanto teria em 10 anos investindo R$200/mês',
      'Reflita: os juros estão trabalhando para ou contra você?',
    ],
  },
  12: {
    phase: 'Mentalidade',
    title: 'Defina seus objetivos',
    duration: '3 min',
    intro: 'Dinheiro sem propósito some.',
    content: `Você poupa e investe PARA alguma coisa. Pode ser:

**Curto prazo (até 1 ano):** viagem, troca de celular
**Médio prazo (1-5 anos):** entrada do carro, curso
**Longo prazo (5+ anos):** casa própria, aposentadoria

Ter objetivos claros te motiva a continuar.`,
    tasks: [
      'Defina 1 objetivo de curto prazo',
      'Defina 1 objetivo de médio prazo',
      'Defina 1 objetivo de longo prazo',
    ],
  },
  13: {
    phase: 'Próximos Passos',
    title: 'Conheça as opções de investimento',
    duration: '3 min',
    intro: 'Investir não é só para ricos.',
    content: `Com suas finanças organizadas, é hora de conhecer as opções:

**Renda Fixa:** CDB, Tesouro Direto, LCI/LCA (mais seguro)
**Renda Variável:** Ações, ETFs, FIIs (mais risco, mais retorno)

Para começar, renda fixa é o caminho. Ações vêm depois.`,
    tasks: [
      'Pesquise o que é Tesouro Direto',
      'Entenda a diferença entre CDB e poupança',
      'Anote suas dúvidas para pesquisar depois',
    ],
  },
  14: {
    phase: 'Próximos Passos',
    title: 'Abra sua conta em corretora',
    duration: '5 min',
    intro: 'Sem conta em corretora, você não investe.',
    content: `Banco cobra taxas altas. Corretora oferece mais opções e menores custos.

**Corretoras confiáveis:** XP, Rico, Clear, NuInvest, BTG
Todas são reguladas pela CVM e seu dinheiro fica protegido.

Abrir conta é grátis e leva 5 minutos.`,
    tasks: [
      'Escolha uma corretora',
      'Abra sua conta (é grátis)',
      'Explore a plataforma sem investir ainda',
    ],
  },
  15: {
    phase: 'Próximos Passos',
    title: 'Faça seu primeiro investimento',
    duration: '5 min',
    intro: 'O primeiro passo é sempre o mais difícil.',
    content: `Você chegou aqui! Agora é hora de colocar em prática.

**Sugestão para começar:**
Tesouro Selic - rende mais que poupança, é seguro e você pode resgatar quando quiser. Mínimo de R$30.

Não espere ter muito dinheiro. Comece com pouco e vá aumentando.`,
    tasks: [
      'Transfira um valor pequeno para a corretora',
      'Faça seu primeiro investimento em Tesouro Selic',
      'Celebre! Você agora é um investidor 🎉',
    ],
  },
};

export default function StepContent({ step, onComplete, onBack, isCompleted }) {
  const content = stepsContent[step];
  const [completedTasks, setCompletedTasks] = useState(
    isCompleted ? content.tasks.map((_, i) => i) : []
  );

  const toggleTask = (index) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter(i => i !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  const allTasksCompleted = completedTasks.length === content.tasks.length;

  const getPhaseColor = (phase) => {
    switch (phase) {
      case 'Diagnóstico': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Organização': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Construção': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Mentalidade': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'Próximos Passos': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-slate-100 z-10">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Step header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPhaseColor(content.phase)}`}>
              {content.phase}
            </span>
            <span className="flex items-center gap-1 text-slate-500 text-xs">
              <Clock className="w-3 h-3" />
              {content.duration}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Passo {step}: {content.title}
          </h1>
          <p className="text-slate-600">{content.intro}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 mb-6">
          <div className="prose prose-slate prose-sm max-w-none">
            {content.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-slate-700 leading-relaxed mb-3 text-sm">
                {paragraph.split('**').map((part, i) => 
                  i % 2 === 0 ? part : <strong key={i} className="text-slate-900">{part}</strong>
                )}
              </p>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 mb-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">✅ Tarefas deste passo</h2>
          <div className="space-y-2">
            {content.tasks.map((task, index) => (
              <motion.button
                key={index}
                onClick={() => toggleTask(index)}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-3 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                  completedTasks.includes(index)
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  completedTasks.includes(index)
                    ? 'bg-emerald-500'
                    : 'border-2 border-slate-300'
                }`}>
                  {completedTasks.includes(index) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className={`text-sm ${completedTasks.includes(index) ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                  {task}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Complete button */}
        <Button
          onClick={() => onComplete(step)}
          disabled={!allTasksCompleted}
          size="lg"
          className={`w-full py-6 text-base rounded-xl font-semibold transition-all ${
            allTasksCompleted
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-white shadow-lg'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {allTasksCompleted ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              {step === 15 ? 'Finalizar Jornada' : `Concluir Passo ${step}`}
            </>
          ) : (
            <>
              <Circle className="w-5 h-5 mr-2" />
              Complete as tarefas
            </>
          )}
        </Button>
      </div>
    </div>
  );
}