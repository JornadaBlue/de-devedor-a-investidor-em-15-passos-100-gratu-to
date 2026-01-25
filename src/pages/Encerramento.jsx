import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowRight, MessageCircle, Calendar, CheckCircle, Star } from 'lucide-react';

export default function Encerramento() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('nome') || 'Usuário';

  const achievements = [
    'Organizou suas finanças pessoais',
    'Criou hábitos financeiros saudáveis',
    'Entendeu os fundamentos de investimento internacional',
    'Está preparado para os próximos passos',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Celebration */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl mb-6 shadow-2xl shadow-amber-500/30"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Parabéns, {userName}! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-300"
          >
            Você completou a <span className="text-amber-400 font-semibold">Rota Internacional 14D</span>
          </motion.p>
        </div>

        {/* Achievements Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-2xl mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900">O que você conquistou</h2>
          </div>

          <div className="space-y-4 mb-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100"
              >
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-700">{achievement}</span>
              </motion.div>
            ))}
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800">Agora você tem</span> organização, clareza e base para seguir com mais segurança. O próximo passo é continuar aplicando o que aprendeu e, quando estiver pronto, dar os próximos passos no mundo dos investimentos.
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-4"
        >
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-900 font-semibold py-7 text-lg rounded-2xl shadow-lg shadow-amber-500/20"
            onClick={() => window.open('https://wa.me/5500000000000?text=Olá! Completei a Rota Internacional 14D e quero saber mais sobre acompanhamento contínuo.', '_blank')}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Quero acompanhamento contínuo
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full bg-white/10 border-2 border-white/20 text-white hover:bg-white/20 font-semibold py-7 text-lg rounded-2xl"
            onClick={() => window.open('https://wa.me/5500000000000?text=Olá! Completei a Rota Internacional 14D e gostaria de falar com a Déia.', '_blank')}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Quero falar com a Déia
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-8"
        >
          <p className="text-slate-500 text-sm">
            Criado por <span className="text-amber-400 font-medium">Jhony Bosio</span>
          </p>
          <p className="text-slate-600 text-xs mt-1">Assessor de Investimentos</p>
        </motion.div>
      </motion.div>
    </div>
  );
}