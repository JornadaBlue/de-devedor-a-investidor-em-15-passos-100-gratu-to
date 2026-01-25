import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Clock, Target, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const dayContent = {
  1: {
    phase: 'Estancar',
    title: 'Identifique seus vazamentos',
    duration: '5 min',
    intro: 'Hoje vamos descobrir para onde está indo seu dinheiro sem você perceber.',
    content: `O primeiro passo para organizar suas finanças é **identificar os vazamentos invisíveis** — aqueles gastos pequenos que parecem inofensivos mas que, somados, fazem uma diferença enorme no fim do mês.

Pense em assinaturas que você não usa, compras por impulso, taxas bancárias desnecessárias, ou aquele café diário que poderia ser semanal.

**Sua tarefa de hoje:**
Abra seu extrato bancário e do cartão de crédito dos últimos 30 dias. Identifique pelo menos 3 gastos que você poderia ter evitado ou reduzido.`,
    tasks: [
      'Revisar extrato bancário dos últimos 30 dias',
      'Revisar fatura do cartão de crédito',
      'Anotar 3 gastos que poderiam ser evitados',
    ],
  },
  2: {
    phase: 'Estancar',
    title: 'Organize seu cartão de crédito',
    duration: '5 min',
    intro: 'O cartão pode ser aliado ou vilão — depende de como você usa.',
    content: `O cartão de crédito é uma das principais armadilhas financeiras. **Rotativo e parcelamentos** podem transformar uma compra pequena em uma bola de neve.

Hoje vamos organizar sua relação com o cartão.

**Regras de ouro:**
- Use o cartão como forma de pagamento, não como extensão da sua renda
- Pague sempre o valor total da fatura
- Evite parcelamentos acima de 3x

**Sua tarefa de hoje:**
Liste todos os seus cartões e o limite/fatura de cada um. Cancele os que não usa.`,
    tasks: [
      'Listar todos os cartões que possui',
      'Anotar limite e fatura atual de cada um',
      'Decidir quais cartões manter ou cancelar',
    ],
  },
  3: {
    phase: 'Estancar',
    title: 'Separe o dinheiro do mês',
    duration: '5 min',
    intro: 'Aprenda a técnica dos potes para nunca mais ficar no vermelho.',
    content: `Uma das técnicas mais simples e eficientes para organizar suas finanças é **separar o dinheiro em categorias** assim que receber.

**A regra 50-30-20:**
- 50% para necessidades (moradia, alimentação, transporte)
- 30% para desejos (lazer, compras não essenciais)
- 20% para objetivos (reserva, investimentos, quitação de dívidas)

**Sua tarefa de hoje:**
Calcule sua renda mensal líquida e divida nas três categorias. Anote os valores.`,
    tasks: [
      'Calcular sua renda líquida mensal',
      'Dividir usando a regra 50-30-20',
      'Anotar o valor de cada categoria',
    ],
  },
  4: {
    phase: 'Estancar',
    title: 'Mapeie suas dívidas',
    duration: '5 min',
    intro: 'Conhecer o inimigo é o primeiro passo para vencê-lo.',
    content: `Se você tem dívidas, é fundamental saber exatamente **quanto deve, para quem e a qual taxa de juros**.

**Priorize assim:**
1. Dívidas com juros mais altos primeiro (cartão, cheque especial)
2. Depois financiamentos e empréstimos
3. Por último, dívidas sem juros

**Sua tarefa de hoje:**
Liste todas as suas dívidas com: credor, valor total, parcela mensal e taxa de juros.`,
    tasks: [
      'Listar todas as dívidas',
      'Anotar valor total de cada uma',
      'Identificar a taxa de juros de cada dívida',
    ],
  },
  5: {
    phase: 'Criar Sobra',
    title: 'Crie sua rotina financeira semanal',
    duration: '5 min',
    intro: 'Consistência é mais importante que perfeição.',
    content: `A partir de hoje, você vai criar uma **rotina financeira semanal** de apenas 10 minutos.

**Sua rotina semanal:**
- Domingo: revisar gastos da semana
- Terça: verificar saldo e próximos vencimentos
- Sexta: planejar gastos do fim de semana

**Sua tarefa de hoje:**
Defina um horário fixo para sua revisão semanal e coloque um lembrete no celular.`,
    tasks: [
      'Escolher dia e horário para revisão semanal',
      'Criar lembrete no celular',
      'Fazer primeira revisão da semana',
    ],
  },
  6: {
    phase: 'Criar Sobra',
    title: 'Defina sua regra de gastos',
    duration: '5 min',
    intro: 'Regras simples evitam decisões ruins.',
    content: `Criar **regras pessoais** para gastos evita que você tome decisões por impulso.

**Exemplos de regras:**
- "Compras acima de R$100, espero 24h para decidir"
- "Delivery no máximo 2x por semana"
- "Antes de comprar, pergunto: preciso ou quero?"

**Sua tarefa de hoje:**
Crie 3 regras pessoais de gastos que façam sentido para sua realidade.`,
    tasks: [
      'Identificar seu maior ponto fraco de gastos',
      'Criar 3 regras pessoais',
      'Escrever as regras em lugar visível',
    ],
  },
  7: {
    phase: 'Criar Sobra',
    title: 'Comece sua primeira reserva',
    duration: '5 min',
    intro: 'Qualquer valor é melhor que nenhum valor.',
    content: `Hoje você vai dar o primeiro passo para criar sua **reserva de emergência**.

**Meta inicial:** 1 mês de gastos essenciais
**Meta ideal:** 6 meses de gastos essenciais

Não importa se você só consegue guardar R$50 por mês. O importante é começar.

**Sua tarefa de hoje:**
Defina um valor fixo (mesmo que pequeno) para transferir todo mês para uma conta separada.`,
    tasks: [
      'Calcular valor dos gastos essenciais mensais',
      'Definir valor mensal para reserva',
      'Criar conta ou cofre separado para reserva',
    ],
  },
  8: {
    phase: 'Criar Sobra',
    title: 'Automatize suas finanças',
    duration: '5 min',
    intro: 'O que é automático, acontece.',
    content: `**Automatizar transferências** é a melhor forma de garantir que você vai guardar dinheiro.

**O que automatizar:**
- Transferência para reserva logo após receber o salário
- Pagamento de contas fixas
- Investimentos mensais (quando chegar a hora)

**Sua tarefa de hoje:**
Configure pelo menos uma transferência automática para sua reserva.`,
    tasks: [
      'Acessar o app do banco',
      'Configurar transferência automática para reserva',
      'Definir data (preferencialmente dia do pagamento)',
    ],
  },
  9: {
    phase: 'Criar Sobra',
    title: 'Revise e ajuste',
    duration: '5 min',
    intro: 'Planos precisam de ajustes — isso é normal.',
    content: `Chegou a hora de **revisar tudo** que você fez até aqui e fazer os ajustes necessários.

**Perguntas para reflexão:**
- As regras que criei estão funcionando?
- Estou conseguindo separar o dinheiro como planejei?
- Preciso ajustar algum valor ou categoria?

**Sua tarefa de hoje:**
Faça uma revisão geral e ajuste o que não está funcionando.`,
    tasks: [
      'Revisar gastos desde o dia 1',
      'Verificar se as regras estão sendo seguidas',
      'Fazer ajustes necessários no plano',
    ],
  },
  10: {
    phase: 'Base Internacional',
    title: 'Por que investir fora do Brasil',
    duration: '5 min',
    intro: 'Diversificar geograficamente é proteger seu patrimônio.',
    content: `Investir internacionalmente não é só para ricos. É uma forma inteligente de **diversificar e proteger** seu patrimônio.

**Motivos para investir fora:**
- Proteção contra instabilidade econômica local
- Acesso a empresas globais de alto crescimento
- Diversificação de moedas (dólar, euro)

**Importante:** Isso não significa abandonar investimentos no Brasil, mas sim equilibrar.

**Sua tarefa de hoje:**
Pesquise e anote 3 vantagens de diversificar internacionalmente.`,
    tasks: [
      'Ler conteúdo sobre investimentos internacionais',
      'Anotar 3 vantagens da diversificação global',
      'Refletir se isso faz sentido para você',
    ],
  },
  11: {
    phase: 'Base Internacional',
    title: 'Entenda os riscos',
    duration: '5 min',
    intro: 'Todo investimento tem riscos — conheça os principais.',
    content: `Antes de investir em qualquer coisa, você precisa entender os **riscos envolvidos**.

**Riscos de investimentos internacionais:**
- Variação cambial (dólar sobe e desce)
- Risco político e econômico de outros países
- Custos de transferência e conversão

**Proteção:**
O segredo é nunca colocar todo seu dinheiro em um só lugar ou tipo de investimento.

**Sua tarefa de hoje:**
Liste 3 riscos que mais te preocupam e pesquise como mitigá-los.`,
    tasks: [
      'Listar seus 3 maiores receios sobre investir',
      'Pesquisar formas de reduzir cada risco',
      'Anotar suas conclusões',
    ],
  },
  12: {
    phase: 'Base Internacional',
    title: 'Conheça as opções',
    duration: '5 min',
    intro: 'Existem várias formas de investir internacionalmente.',
    content: `Você não precisa abrir conta em banco gringo para investir fora. Existem **opções acessíveis**:

**Principais formas:**
- **ETFs internacionais** na B3 (ex: IVVB11)
- **BDRs** (ações estrangeiras negociadas no Brasil)
- **Corretoras internacionais** (para quem quer mais opções)

Cada opção tem prós e contras. O importante é conhecer antes de escolher.

**Sua tarefa de hoje:**
Pesquise o que são ETFs internacionais e BDRs.`,
    tasks: [
      'Pesquisar o que são ETFs internacionais',
      'Entender o que são BDRs',
      'Anotar qual opção parece mais interessante',
    ],
  },
  13: {
    phase: 'Base Internacional',
    title: 'Visão de longo prazo',
    duration: '5 min',
    intro: 'Investimento é maratona, não corrida de 100 metros.',
    content: `O maior erro de quem começa a investir é querer **resultados rápidos**. Investimento sério é de longo prazo.

**Mindset correto:**
- Pense em 5, 10, 20 anos
- Ignore notícias de curto prazo
- Invista regularmente, independente do cenário

**Seu maior aliado:** tempo + consistência.

**Sua tarefa de hoje:**
Defina um objetivo financeiro de longo prazo (10+ anos).`,
    tasks: [
      'Definir um objetivo para 10+ anos',
      'Calcular quanto precisaria investir por mês',
      'Anotar seu plano de longo prazo',
    ],
  },
  14: {
    phase: 'Base Internacional',
    title: 'Seus próximos passos',
    duration: '5 min',
    intro: 'Parabéns! Você chegou ao fim da jornada inicial.',
    content: `Você completou os **14 dias da Rota Internacional**! 🎉

**O que você conquistou:**
- Organizou suas finanças
- Criou hábitos saudáveis com dinheiro
- Entendeu a base para investir internacionalmente

**Próximos passos:**
1. Continue sua rotina financeira semanal
2. Mantenha sua reserva crescendo
3. Quando estiver pronto, comece a investir aos poucos

**Sua tarefa final:**
Escreva um resumo do que aprendeu e seus objetivos para os próximos meses.`,
    tasks: [
      'Escrever resumo do aprendizado',
      'Definir 3 objetivos para os próximos 3 meses',
      'Celebrar sua conquista! 🎉',
    ],
  },
};

export default function DayContent({ day, onComplete, onBack, isCompleted }) {
  const content = dayContent[day];
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
      case 'Estancar': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Criar Sobra': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Base Internacional': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-slate-100 z-10">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar ao plano</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-2xl">
        {/* Day header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getPhaseColor(content.phase)}`}>
              {content.phase}
            </span>
            <span className="flex items-center gap-1 text-slate-500 text-sm">
              <Clock className="w-4 h-4" />
              {content.duration}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Dia {day}: {content.title}
          </h1>
          <p className="text-lg text-slate-600">{content.intro}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
          <div className="prose prose-slate max-w-none">
            {content.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-slate-700 leading-relaxed mb-4">
                {paragraph.split('**').map((part, i) => 
                  i % 2 === 0 ? part : <strong key={i} className="text-slate-900">{part}</strong>
                )}
              </p>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-slate-900">Tarefas do dia</h2>
          </div>
          <div className="space-y-3">
            {content.tasks.map((task, index) => (
              <motion.button
                key={index}
                onClick={() => toggleTask(index)}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                  completedTasks.includes(index)
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  completedTasks.includes(index)
                    ? 'bg-emerald-500'
                    : 'border-2 border-slate-300'
                }`}>
                  {completedTasks.includes(index) && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className={completedTasks.includes(index) ? 'text-slate-500 line-through' : 'text-slate-700'}>
                  {task}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Complete button */}
        <Button
          onClick={() => onComplete(day)}
          disabled={!allTasksCompleted}
          size="lg"
          className={`w-full py-7 text-lg rounded-2xl font-semibold transition-all ${
            allTasksCompleted
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {allTasksCompleted ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Concluir Dia {day}
            </>
          ) : (
            <>
              <Circle className="w-5 h-5 mr-2" />
              Complete todas as tarefas
            </>
          )}
        </Button>
      </div>
    </div>
  );
}