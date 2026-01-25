import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, User, Phone, Mail, TrendingDown, Target, Clock, PiggyBank, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const questions = [
  {
    id: 'personal',
    title: 'Vamos começar pelo básico',
    subtitle: 'Precisamos de algumas informações para personalizar seu plano',
    type: 'personal',
  },
  {
    id: 'como_termina_mes',
    title: 'Como você termina o mês?',
    subtitle: 'Seja honesto — é o primeiro passo para mudar',
    type: 'single',
    options: [
      { value: 'sobra', label: 'Sobra dinheiro', icon: '💰', description: 'Consigo guardar todo mês' },
      { value: 'zero', label: 'Fica no zero', icon: '⚖️', description: 'Nem sobra nem falta' },
      { value: 'falta', label: 'Falta dinheiro', icon: '😰', description: 'Sempre aperto no fim do mês' },
    ],
  },
  {
    id: 'maior_dor',
    title: 'Qual sua maior dor financeira?',
    subtitle: 'Identifique o que mais te incomoda hoje',
    type: 'single',
    options: [
      { value: 'cartao', label: 'Cartão de crédito', icon: '💳', description: 'Sempre no limite ou rotativo' },
      { value: 'dividas', label: 'Dívidas acumuladas', icon: '📊', description: 'Prestações, empréstimos, etc' },
      { value: 'desorganizacao', label: 'Desorganização', icon: '🌀', description: 'Não sei para onde vai meu dinheiro' },
      { value: 'medo_investir', label: 'Medo de investir', icon: '😟', description: 'Quero mas tenho receio' },
    ],
  },
  {
    id: 'possui_dividas',
    title: 'Você possui dívidas hoje?',
    subtitle: 'Parcelas, empréstimos, financiamentos, cartão',
    type: 'single',
    options: [
      { value: true, label: 'Sim, possuo dívidas', icon: '📋', description: 'Tenho parcelas ou empréstimos' },
      { value: false, label: 'Não, estou sem dívidas', icon: '✅', description: 'Minhas contas estão em dia' },
    ],
  },
  {
    id: 'ja_investe',
    title: 'Você já investe?',
    subtitle: 'Qualquer tipo de investimento conta',
    type: 'single',
    options: [
      { value: 'nunca', label: 'Nunca investi', icon: '🌱', description: 'Ainda não comecei' },
      { value: 'brasil', label: 'Só no Brasil', icon: '🇧🇷', description: 'Poupança, CDB, ações BR' },
      { value: 'fora', label: 'Já investi fora', icon: '🌎', description: 'Dólar, ETFs, stocks' },
    ],
  },
  {
    id: 'objetivo_principal',
    title: 'Qual seu objetivo principal?',
    subtitle: 'O que você mais quer alcançar agora',
    type: 'single',
    options: [
      { value: 'sair_dividas', label: 'Sair das dívidas', icon: '🔓', description: 'Quitar e respirar aliviado' },
      { value: 'organizar_sobrar', label: 'Organizar e sobrar', icon: '📈', description: 'Ter controle e guardar' },
      { value: 'investir_fora', label: 'Investir fora', icon: '🚀', description: 'Diversificar internacionalmente' },
    ],
  },
  {
    id: 'tempo_disponivel',
    title: 'Quanto tempo você tem por dia?',
    subtitle: 'Para se dedicar ao plano de 14 dias',
    type: 'single',
    options: [
      { value: '3min', label: '3 minutos', icon: '⚡', description: 'Correria total' },
      { value: '5min', label: '5 minutos', icon: '☕', description: 'Consigo um tempinho' },
      { value: '10min', label: '10 minutos', icon: '🧘', description: 'Tenho disponibilidade' },
    ],
  },
];

export default function QuizForm({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    como_termina_mes: '',
    maior_dor: '',
    possui_dividas: null,
    ja_investe: '',
    objetivo_principal: '',
    tempo_disponivel: '',
  });
  const [errors, setErrors] = useState({});

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const validatePersonal = () => {
    const newErrors = {};
    if (!answers.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!answers.email.trim()) newErrors.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) newErrors.email = 'E-mail inválido';
    if (!answers.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentQuestion.type === 'personal') {
      if (!validatePersonal()) return;
    }
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSelect = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    // Auto advance after selection
    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        onComplete({ ...answers, [questionId]: value });
      }
    }, 300);
  };

  const canProceed = () => {
    if (currentQuestion.type === 'personal') {
      return answers.nome && answers.email && answers.whatsapp;
    }
    return answers[currentQuestion.id] !== '' && answers[currentQuestion.id] !== null;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500">Etapa {step + 1} de {questions.length}</span>
            <span className="text-sm font-medium text-amber-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center pt-24 pb-32 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                {currentQuestion.title}
              </h2>
              <p className="text-slate-500">{currentQuestion.subtitle}</p>
            </div>

            {currentQuestion.type === 'personal' ? (
              <div className="space-y-5">
                <div>
                  <Label className="text-slate-700 font-medium mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" /> Nome completo
                  </Label>
                  <Input
                    value={answers.nome}
                    onChange={(e) => setAnswers({ ...answers, nome: e.target.value })}
                    placeholder="Seu nome"
                    className={`h-14 text-lg border-2 ${errors.nome ? 'border-red-300' : 'border-slate-200'} focus:border-amber-400 rounded-xl`}
                  />
                  {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
                </div>
                <div>
                  <Label className="text-slate-700 font-medium mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> WhatsApp
                  </Label>
                  <Input
                    value={answers.whatsapp}
                    onChange={(e) => setAnswers({ ...answers, whatsapp: e.target.value })}
                    placeholder="(00) 00000-0000"
                    className={`h-14 text-lg border-2 ${errors.whatsapp ? 'border-red-300' : 'border-slate-200'} focus:border-amber-400 rounded-xl`}
                  />
                  {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
                </div>
                <div>
                  <Label className="text-slate-700 font-medium mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> E-mail
                  </Label>
                  <Input
                    type="email"
                    value={answers.email}
                    onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                    placeholder="seu@email.com"
                    className={`h-14 text-lg border-2 ${errors.email ? 'border-red-300' : 'border-slate-200'} focus:border-amber-400 rounded-xl`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <motion.button
                    key={option.value?.toString()}
                    onClick={() => handleSelect(currentQuestion.id, option.value)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4 ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-3xl">{option.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{option.label}</p>
                      <p className="text-sm text-slate-500">{option.description}</p>
                    </div>
                    {answers[currentQuestion.id] === option.value && (
                      <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0}
            className="text-slate-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          {currentQuestion.type === 'personal' && (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-900 font-semibold px-8"
            >
              Continuar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}