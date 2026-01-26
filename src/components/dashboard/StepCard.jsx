import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StepCard({ step, title, description, isCompleted, isLocked, isCurrent, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLocked}
      whileHover={!isLocked ? { scale: 1.01 } : {}}
      whileTap={!isLocked ? { scale: 0.99 } : {}}
      className={cn(
        'w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3',
        isCompleted && 'bg-emerald-50 border-emerald-200',
        isCurrent && !isCompleted && 'bg-amber-50 border-amber-300 shadow-md',
        isLocked && 'bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed',
        !isCompleted && !isCurrent && !isLocked && 'bg-white border-slate-200 hover:border-slate-300'
      )}
    >
      {/* Step indicator */}
      <div className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0',
        isCompleted && 'bg-emerald-500 text-white',
        isCurrent && !isCompleted && 'bg-amber-500 text-white',
        isLocked && 'bg-slate-200 text-slate-400',
        !isCompleted && !isCurrent && !isLocked && 'bg-slate-100 text-slate-600'
      )}>
        {isCompleted ? (
          <Check className="w-5 h-5" />
        ) : isLocked ? (
          <Lock className="w-4 h-4" />
        ) : (
          step
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className={cn(
          'font-semibold text-sm truncate',
          isLocked ? 'text-slate-400' : 'text-slate-900'
        )}>
          {title}
        </h4>
        <p className={cn(
          'text-xs truncate',
          isLocked ? 'text-slate-300' : 'text-slate-500'
        )}>
          {description}
        </p>
      </div>

      {/* Arrow */}
      {!isLocked && (
        <ChevronRight className={cn(
          'w-5 h-5 shrink-0',
          isCompleted ? 'text-emerald-500' : 'text-slate-400'
        )} />
      )}
    </motion.button>
  );
}