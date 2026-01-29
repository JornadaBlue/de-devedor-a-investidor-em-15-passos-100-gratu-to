import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function JourneyCard({ profile }) {
  const navigate = useNavigate();
  const completedSteps = profile.progresso?.length || 0;
  const progress = Math.round((completedSteps / 15) * 100);

  const handleClick = () => {
    navigate(createPageUrl('Dashboard') + `?id=${profile.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-lg transition-all border-2 border-emerald-200 h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Jornada dos 15 Passos
            </h3>
            <p className="text-sm text-slate-500">
              {completedSteps} de 15 completos
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-600">Progresso</span>
            <span className="font-semibold text-emerald-600">{progress}%</span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </div>
        </div>

        <p className="text-sm text-slate-600">
          Continue sua jornada de devedor a investidor com passos práticos e organizados.
        </p>
      </Card>
    </motion.div>
  );
}