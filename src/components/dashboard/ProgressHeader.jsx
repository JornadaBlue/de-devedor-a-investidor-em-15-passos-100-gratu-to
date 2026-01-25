import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Flame } from 'lucide-react';

export default function ProgressHeader({ userName, completedDays, totalDays, currentStreak }) {
  const progress = (completedDays / totalDays) * 100;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 md:p-8 rounded-3xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Greeting */}
        <div>
          <p className="text-slate-400 text-sm mb-1">Bem-vindo de volta,</p>
          <h1 className="text-2xl md:text-3xl font-bold">{userName}</h1>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-sm">
              <span className="font-bold">{completedDays}</span>/{totalDays} dias
            </span>
          </div>
          {currentStreak > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-xl">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm">
                <span className="font-bold">{currentStreak}</span> dias seguidos
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-400">Progresso geral</span>
          <span className="text-amber-400 font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Completion message */}
      {completedDays === totalDays && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-3"
        >
          <Trophy className="w-6 h-6 text-emerald-400" />
          <div>
            <p className="font-semibold text-emerald-300">Parabéns! Você completou o plano! 🎉</p>
            <p className="text-sm text-emerald-400/80">Agora é hora de dar os próximos passos.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}