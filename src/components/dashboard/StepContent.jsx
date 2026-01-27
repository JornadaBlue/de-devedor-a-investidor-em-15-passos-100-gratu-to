import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Clock, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stepsContent = {
  1: {
    phase: 'Diagnóstico',
    title: 'Raio X Financeiro em 30 Minutos',
    duration: '3 min',
    intro: 'Não existe planejamento sem clareza.',
    content: `Você precisa saber exatamente para onde o dinheiro vai. Muita gente evita olhar para os números, mas isso só piora a situação.

**Hoje você vai:**
Fazer um raio-x completo da sua vida financeira. Sem julgamento, apenas clareza.`,
    tasks: [
      'Listar todas as rendas do mês',
      'Listar todos os gastos fixos',
      'Listar todos os gastos variáveis',
    ],
  },
  2: {
    phase: 'Diagnóstico',
    title: 'Identificando Vazamentos de Dinheiro',
    duration: '3 min',
    intro: 'Pequenos gastos recorrentes sabotam o mês.',
    content: `Vazamentos são gastos que parecem pequenos mas que, somados, fazem diferença enorme. Assinaturas esquecidas, delivery frequente, compras por impulso.

**A regra é simples:**
Se você não usa ou não precisa, está vazando dinheiro.`,
    tasks: [
      'Assinaturas pouco usadas',
      'Compras por impulso',
      'Gastos automáticos esquecidos',
    ],
  },
  3: {
    phase: 'Diagnóstico',
    title: 'Uso Inteligente do Crédito',
    duration: '3 min',
    intro: 'Crédito não é renda extra e pode virar armadilha.',
    content: `Cartão de crédito mal usado é um dos maiores vilões financeiros. Ele não aumenta seu poder de compra, apenas adia o pagamento.

**Regra de ouro:**
Se não pode pagar à vista, não pode comprar parcelado.`,
    tasks: [
      'Cartões ativos',
      'Limites totais',
      'Parcelamentos em andamento',
    ],
  },
  4: {
    phase: 'Organização',
    title: 'Criando Sobra Todo Mês',
    duration: '3 min',
    intro: 'Investir só começa quando sobra dinheiro.',
    content: `Se você gasta tudo que ganha, nunca vai investir. Criar sobra é o segredo para começar.

**A fórmula:**
Renda - Gastos = Sobra (e não Renda - Sobra = Gastos)

Comece com qualquer valor. R$50, R$100, o que der.`,
    tasks: [
      'Definir um valor mínimo de sobra',
      'Ajustar gastos ao novo valor',
      'Tratar sobra como compromisso',
    ],
  },
  5: {
    phase: 'Organização',
    title: 'Reserva de Emergência Sem Complicação',
    duration: '3 min',
    intro: 'Reserva não é investimento, é proteção.',
    content: `A reserva de emergência te protege de imprevistos sem precisar se endividar. Não é para render muito, é para estar disponível quando precisar.

**Meta inicial:** 3 meses de gastos essenciais
**Meta ideal:** 6 meses de gastos essenciais

Guarde em aplicação segura e de fácil resgate.`,
    tasks: [
      'Definir quanto representa 3 a 6 meses de gastos',
      'Separar esse dinheiro do dia a dia',
      'Não usar para consumo',
    ],
  },
  6: {
    phase: 'Organização',
    title: 'Separando Curto, Médio e Longo Prazo',
    duration: '3 min',
    intro: 'Misturar objetivos gera decisões ruins.',
    content: `Cada dinheiro tem uma função. Misturar tudo é o erro mais comum.

**Curto prazo:** gastos do dia a dia (conta corrente)
**Médio prazo:** objetivos próximos (viagem, celular)
**Longo prazo:** futuro financeiro (investimentos)

Cada objetivo tem um lugar diferente.`,
    tasks: [
      'Gastos do dia a dia',
      'Objetivos próximos',
      'Futuro financeiro',
    ],
  },
  7: {
    phase: 'Mentalidade',
    title: 'Mentalidade de Investidor',
    duration: '3 min',
    intro: 'Investir é diferente de apostar.',
    content: `Muita gente perde dinheiro porque não entende a diferença entre investir e apostar.

**Investir:** paciência, estudo, constância
**Apostar:** promessa rápida, ansiedade, aposta

Investidor pensa em anos. Apostador quer multiplicar em meses.`,
    tasks: [
      'Evitar promessas rápidas',
      'Pensar no longo prazo',
      'Priorizar constância',
    ],
  },
  8: {
    phase: 'Mentalidade',
    title: 'O Que São Ações',
    duration: '3 min',
    intro: 'Ações não são um cassino.',
    content: `Quando você compra uma ação, você vira sócio de uma empresa. Você lucra quando a empresa cresce e distribui lucros.

**Não confunda:**
Ação não é aposta. É participação em negócios reais.

O preço varia, mas o foco é no resultado de longo prazo.`,
    tasks: [
      'Ação representa participação em empresas',
      'Preço varia',
      'Resultados vêm no tempo',
    ],
  },
  9: {
    phase: 'Mentalidade',
    title: 'O Que São ETFs',
    duration: '3 min',
    intro: 'ETFs são forma prática de diversificação.',
    content: `Um ETF reúne vários ativos em um só produto. Em vez de comprar 10 ações separadas, você compra um ETF que já tem essas 10 ações.

**Vantagem:**
Você diversifica com pouco dinheiro. Reduz o risco de concentração.

Facilita muito para quem está começando.`,
    tasks: [
      'Um ETF reúne vários ativos',
      'Reduz concentração',
      'Facilita começar',
    ],
  },
  10: {
    phase: 'Mentalidade',
    title: 'Erros Comuns de Iniciantes',
    duration: '3 min',
    intro: 'Aprenda com os erros dos outros.',
    content: `A maioria dos iniciantes comete os mesmos erros. Você pode evitá-los.

**Os erros clássicos:**
• Começar a investir sem reserva de emergência
• Copiar dicas de "gurus" sem entender
• Mudar de estratégia a cada notícia ruim

Investimento é maratona, não sprint.`,
    tasks: [
      'Começar sem reserva',
      'Copiar dicas',
      'Mudar toda hora de estratégia',
    ],
  },
  11: {
    phase: 'Próximos Passos',
    title: 'Começando Pequeno e Consistente',
    duration: '3 min',
    intro: 'Valor baixo não invalida o hábito.',
    content: `Muita gente espera ter "dinheiro suficiente" para começar. Isso é um erro. O hábito importa mais que o valor.

**A verdade:**
R$100 por mês investidos com constância superam R$1.000 investidos uma vez só.

Comece com o que você tem hoje.`,
    tasks: [
      'Definir valor mensal possível',
      'Priorizar constância',
      'Ignorar comparação com outros',
    ],
  },
  12: {
    phase: 'Próximos Passos',
    title: 'Organização Mensal em 15 Minutos',
    duration: '3 min',
    intro: '10 minutos por semana mudam tudo.',
    content: `Você não precisa gastar horas por semana cuidando do dinheiro. Uma rotina simples de 15 minutos por mês é suficiente.

**Rotina mensal:**
• Revisar gastos
• Conferir sobra
• Ajustar próximos passos

Escolha um dia fixo e mantenha o hábito.`,
    tasks: [
      'Revisar gastos',
      'Conferir sobra',
      'Ajustar próximos passos',
    ],
  },
  13: {
    phase: 'Próximos Passos',
    title: 'Informação Financeira Com Critério',
    duration: '3 min',
    intro: 'Excesso de informação gera paralisia.',
    content: `Redes sociais estão cheias de "dicas de ouro" e promessas milagrosas. A maioria é ruído que só te confunde.

**Como filtrar:**
• Evitar excesso de notícias
• Priorizar fontes confiáveis
• Não agir no calor do momento

Informação de qualidade é melhor que quantidade.`,
    tasks: [
      'Evitar excesso de notícias',
      'Priorizar fontes confiáveis',
      'Não agir no calor do momento',
    ],
  },
  14: {
    phase: 'Próximos Passos',
    title: 'Quando Buscar Ajuda Profissional',
    duration: '3 min',
    intro: 'Reconhecer limites pessoais é inteligência.',
    content: `Você pode aprender sozinho, mas há momentos em que ajuda profissional acelera resultados e evita erros caros.

**Quando procurar apoio:**
• Patrimônio crescente
• Falta de tempo
• Objetivos mais complexos

Assessor de investimentos é diferente de gerente de banco.`,
    tasks: [
      'Patrimônio crescente',
      'Falta de tempo',
      'Objetivos mais complexos',
    ],
  },
  15: {
    phase: 'Próximos Passos',
    title: 'Próximo Nível do Jogo Financeiro',
    duration: '3 min',
    intro: 'Você tem agora uma base sólida.',
    content: `Parabéns por chegar até aqui. Você saiu do zero e construiu fundamentos que a maioria nunca tem.

**O que você conquistou:**
• Organização vem antes do investimento
• Constância vence pressa
• Educação protege patrimônio

Continue evoluindo. O jogo está só começando.`,
    tasks: [
      'Organização vem antes do investimento',
      'Constância vence pressa',
      'Educação protege patrimônio',
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