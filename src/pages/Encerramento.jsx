import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Trophy, CheckCircle, Star, Sparkles, 
  FileText, Users, TrendingUp, ArrowRight,
  Shield, Zap, Clock, Gift
} from 'lucide-react';

export default function Encerramento() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('nome') || 'Usuário';
  const profileId = urlParams.get('id');

  const [showUpsell, setShowUpsell] = useState(false);

  const achievements = [
    'Fez o diagnóstico completo da sua vida financeira',
    'Organizou suas dívidas e criou um orçamento',
    'Montou sua reserva de emergência',
    'Entendeu os fundamentos de investimentos',
    'Está pronto para dar os próximos passos',
  ];

  const planFeatures = [
    { icon: FileText, text: 'Plano personalizado baseado no seu perfil e em suas respostas' },
    { icon: Shield, text: 'Estratégia de investimento para iniciantes' },
    { icon: Zap, text: 'Acesso imediato na área logada' },
    { icon: Users, text: 'Acesso a comunidade exclusiva no Telegram' },
  ];

  const upsellFeatures = [
    { icon: TrendingUp, text: 'Recomendações de ações e ETFs todo 5º dia útil' },
    { icon: Users, text: 'Comunidade exclusiva de investidores' },
    { icon: Star, text: 'Análises feitas por profissionais da Blue3 Investimentos' },
    { icon: Clock, text: 'Suporte prioritário para dúvidas' },
  ];

  const handleBuyPlan = () => {
    // Redirecionar para checkout Hotmart
    window.location.href = 'https://pay.hotmart.com/H104116853S';
  };

  const handleBuyUpsell = () => {
    // Aqui vai a integração com Stripe (subscription)
    alert('Integração com Stripe será configurada. Assinatura: R$27/mês');
  };

  const handleSkipUpsell = () => {
    // Redirecionar para área logada ou página de confirmação
    alert('Obrigado! Você receberá seu plano personalizado em breve.');
  };

  if (showUpsell) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
              <Gift className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-sm font-medium">Oferta Especial</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Quer acelerar seus resultados?
            </h1>
            <p className="text-slate-400">
              Receba recomendações de um profissional certificado
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xl mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-500">Assinatura mensal</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900">R$27</span>
                  <span className="text-slate-500">/mês</span>
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Blue3 Investimentos
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {upsellFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-slate-700">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 rounded-xl mb-6">
              <p className="text-sm text-blue-800">
                <strong>Todo 5º dia útil</strong> você recebe por email as recomendações de ações e ETFs analisadas pela equipe da Blue3, escritório de assessoria do qual sou sócio.
              </p>
            </div>

            <Button
              onClick={handleBuyUpsell}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-6 rounded-xl shadow-lg"
            >
              Quero receber as recomendações
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <button
            onClick={handleSkipUpsell}
            className="w-full text-center text-slate-400 hover:text-slate-300 text-sm py-3 transition-colors"
          >
            Não, obrigado. Quero apenas o plano personalizado.
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        {/* Celebration */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl mb-4 shadow-xl shadow-amber-500/30"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Parabéns, {userName}! 🎉
          </h1>
          <p className="text-slate-400">
            Você completou os 15 passos da jornada
          </p>
        </div>

        {/* Achievements */}
        <div className="bg-white/5 backdrop-blur rounded-2xl p-5 mb-6 border border-white/10">
          <p className="text-sm text-slate-400 mb-3">O que você conquistou:</p>
          <div className="space-y-2">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-sm text-slate-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Offer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-6 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600">Oferta Exclusiva</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Seu Plano Personalizado
          </h2>
          <p className="text-slate-600 text-sm mb-4">
            Jhony Bosio vai preparar um plano detalhado e personalizado para você sair das dívidas ou se organizar melhor e começar a investir.
          </p>

          <div className="space-y-3 mb-6">
            {planFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm text-slate-700">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl mb-6">
            <div>
              <p className="text-sm text-slate-500">Investimento único</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900">R$17</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 line-through">R$97</p>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                82% OFF
              </span>
            </div>
          </div>

          <Button
            onClick={() => {
              handleBuyPlan();
              setShowUpsell(true);
            }}
            size="lg"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-900 font-semibold py-6 rounded-xl shadow-lg shadow-amber-500/20"
          >
            Quero meu plano personalizado
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-center text-xs text-slate-400 mt-4">
            Pagamento seguro via Hotmart • Acesso imediato
          </p>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            Criado por <span className="text-amber-400 font-medium">Jhony Bosio</span>
          </p>
          <p className="text-slate-600 text-xs">Assessor de Investimentos • Blue3 Investimentos</p>
        </div>
      </motion.div>
    </div>
  );
}