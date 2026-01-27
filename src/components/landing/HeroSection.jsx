import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection({ onStart }) {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-amber-500/5 to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-300 text-sm font-medium tracking-wide">
              De Devedor a Investidor
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            15 passos para ir de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Devedor a Investidor
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Um plano simples para organizar seu dinheiro, criar sobra e começar a investir em ações e ETFs no Brasil.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Wallet, text: 'Organize sua vida financeira' },
              { icon: Shield, text: 'Elimine vazamentos invisíveis' },
              { icon: TrendingUp, text: 'Comece a investir com segurança' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 px-5 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <feature.icon className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-slate-200 text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={onStart}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-900 font-semibold px-10 py-7 text-lg rounded-2xl shadow-2xl shadow-amber-500/20 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/30"
            >
              Começar diagnóstico
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full"
            >
              <span className="text-emerald-400 font-bold text-base">✓ Gratuito</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-200 font-medium text-base">3 minutos</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-200 font-medium text-base">Sem compromisso</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Author signature */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-slate-500 text-sm">
          Criado por <span className="text-amber-400 font-medium">Jhony Bosio</span>
        </p>
        <p className="text-slate-600 text-xs mt-1">Assessor de Investimentos</p>
      </div>
    </section>
  );
}