import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, Target, Rocket, CheckCircle, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const profiles = {
  C: {
    icon: AlertTriangle,
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    title: 'Perfil Devedor',
    subtitle: 'Prioridade: Estancar o Sangramento',
    description: 'Hoje seu maior desafio é parar o sangramento financeiro. A boa notícia é que isso é totalmente reversível com método.',
    highlights: [
      'Identificar e eliminar vazamentos de dinheiro',
      'Reorganizar suas dívidas de forma estratégica',
      'Seguir os 15 passos para transformar sua situação',
    ],
    message: 'Nos próximos 15 passos, vamos focar em organizar suas finanças e criar uma base sólida para você respirar aliviado.',
  },
  B: {
    icon: Target,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    title: 'Perfil Organizado',
    subtitle: 'Prioridade: Criar Estratégia',
    description: 'Seu dinheiro já não é o problema. Falta direção e estratégia para avançar.',
    highlights: [
      'Otimizar seus gastos para criar sobra',
      'Definir metas financeiras claras',
      'Preparar a base para investir com segurança',
    ],
    message: 'Nos próximos 15 passos, vamos transformar sua organização em crescimento real, preparando você para investir.',
  },
  A: {
    icon: Rocket,
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    title: 'Perfil Investidor Básico',
    subtitle: 'Prioridade: Otimização e Crescimento',
    description: 'Você já deu um passo que muita gente ainda não deu: organizou sua vida financeira e começou a investir. Agora, o foco é sair do improviso e transformar consistência em crescimento real.\n\nUsuários com este mesmo perfil normalmente chegam aqui com uma base construída, mas ainda com dúvidas sobre diversificação, prazos e tomada de decisão. É exatamente nisso que vamos trabalhar.',
    highlights: [
      'Organizar seus objetivos financeiros de curto, médio e longo prazo',
      'Reduzir decisões impulsivas e aumentar consistência nos investimentos',
      'Estruturar uma estratégia simples e diversificada, adequada ao seu momento de vida',
    ],
    message: 'Pessoas que seguem esse método costumam perceber mais clareza, menos ansiedade e decisões mais racionais ao longo do tempo. Não é sobre correr mais rápido, é sobre caminhar na direção certa.\n\nNos próximos 15 passos, você vai aplicar o mesmo método que já está ajudando outros usuários a sair da organização básica e avançar para crescimento de patrimônio com disciplina.',
  },
  D: {
    icon: TrendingUp,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    title: 'Perfil Organizado sem Sobra',
    subtitle: 'Prioridade: Criar Sobra Mensal',
    description: 'Você não está endividado, mas seu dinheiro entra e some. Falta método para criar sobra.',
    highlights: [
      'Entender exatamente para onde o dinheiro vai',
      'Criar a primeira sobra mensal real',
      'Organizar a base para começar a investir',
    ],
    message: 'Nos próximos 15 passos, vamos criar método para você comandar o dinheiro que já ganha.',
  },
  E: {
    icon: Zap,
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    title: 'Perfil Investidor Ansioso',
    subtitle: 'Prioridade: Disciplina e Consistência',
    description: 'Você já investe, mas troca de estratégia com frequência e fica muito exposto ao noticiário.',
    highlights: [
      'Reduzir ruído e ansiedade nas decisões',
      'Criar regras claras para investir',
      'Parar de tomar decisões emocionais',
    ],
    message: 'Nos próximos 15 passos, vamos criar disciplina para você confiar em uma estratégia consistente.',
  },
};

export default function ProfileResult({ profile, userName, onStartPlan }) {
  const profileData = profiles[profile];
  const Icon = profileData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className={`inline-flex items-center justify-center w-20 h-20 ${profileData.bgColor} rounded-3xl mb-6`}
          >
            <Icon className={`w-10 h-10 ${profileData.iconColor}`} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            {userName}, seu diagnóstico está pronto
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full"
          >
            <span className="text-amber-300 font-medium">{profileData.title}</span>
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl"
        >
          <div className={`inline-block px-3 py-1 ${profileData.bgColor} ${profileData.borderColor} border rounded-full text-sm font-medium text-slate-700 mb-4`}>
            {profileData.subtitle}
          </div>

          <p className="text-xl text-slate-700 mb-8 leading-relaxed">
            {profileData.description}
          </p>

          <div className="space-y-4 mb-8">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              O que vamos trabalhar:
            </p>
            {profileData.highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-slate-700">{item}</p>
              </motion.div>
            ))}
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
            <p className="text-slate-600 text-sm leading-relaxed">
              💡 {profileData.message}
            </p>
          </div>

          <Button
            onClick={onStartPlan}
            size="lg"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-900 font-semibold py-7 text-lg rounded-2xl shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-amber-500/30"
          >
            Acessar os 15 passos
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center text-slate-500 text-sm mt-6"
        >
          100% gratuito • Conteúdo educacional • Sem pegadinhas
        </motion.p>
      </motion.div>
    </div>
  );
}