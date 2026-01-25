import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Play, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DayCard({ day, title, description, isCompleted, isLocked, isCurrent, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLocked}
      whileHover={!isLocked ? { scale: 1.01 } : {}}
      whileTap={!isLocked ? { scale: 0.99 } : {}}
      className={cn(
        'w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4',
        isCompleted && 'bg-emerald-50 border-emerald-200',
        isCurrent && !isCompleted && 'bg-amber-50 border-amber-300 shadow-lg shadow-amber-100',
        isLocked && 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed',
        !isCompleted && !isCurrent && !isLocked && 'bg-white border-slate-200 hover:border-slate-300'
      )}
    >
      {/* Day indicator */}
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0',
        isCompleted && 'bg-emerald-500 text-white',
        isCurrent && !isCompleted && 'bg-amber-500 text-white',
        isLocked && 'bg-slate-200 text-slate-400',
        !isCompleted && !isCurrent && !isLocked && 'bg-slate-100 text-slate-600'
      )}>
        {isCompleted ? (
          <Check className="w-6 h-6" />
        ) : isLocked ? (
          <Lock className="w-5 h-5" />
        ) : (
          day
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            Dia {day}
          </span>
          {isCurrent && !isCompleted && (
            <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full">
              Hoje
            </span>
          )}
        </div>
        <h4 className={cn(
          'font-semibold truncate',
          isLocked ? 'text-slate-400' : 'text-slate-900'
        )}>
          {title}
        </h4>
        <p className={cn(
          'text-sm truncate',
          isLocked ? 'text-slate-300' : 'text-slate-500'
        )}>
          {description}
        </p>
      </div>

      {/* Action */}
      <div className="shrink-0">
        {!isLocked && !isCompleted && (
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
            <Play className="w-4 h-4 text-white ml-0.5" />
          </div>
        )}
        {isCompleted && (
          <ChevronRight className="w-5 h-5 text-emerald-500" />
        )}
      </div>
    </motion.button>
  );
}