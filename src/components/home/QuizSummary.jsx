import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const labels = {
  como_termina_mes: { sobra: 'Sobra dinheiro', zero: 'Fecha no zero', falta: 'Falta dinheiro' },
  maior_dor: {
    cartao: 'Controle de cartão',
    dividas: 'Dívidas',
    desorganizacao: 'Desorganização',
    medo_investir: 'Medo de investir'
  },
  ja_investe: { nunca: 'Nunca investiu', brasil: 'Investe no Brasil', fora: 'Investe fora' },
  renda_mensal: {
    ate_3k: 'Até R$3.000',
    '3k_7k': 'R$3.000 - R$7.000',
    '7k_15k': 'R$7.000 - R$15.000',
    acima_15k: 'Acima de R$15.000'
  }
};

export default function QuizSummary({ profile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer"
    >
      <Card className="p-6 bg-white hover:shadow-lg transition-all border-2 border-slate-200 h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
            <ClipboardList className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Diagnóstico Financeiro
            </h3>
            <p className="text-sm text-slate-500">Suas respostas do quiz</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>

        <div className="space-y-2">
          <div className="text-sm">
            <span className="text-slate-500">Fim do mês:</span>{' '}
            <span className="font-medium text-slate-700">
              {labels.como_termina_mes[profile.como_termina_mes]}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-slate-500">Maior dificuldade:</span>{' '}
            <span className="font-medium text-slate-700">
              {labels.maior_dor[profile.maior_dor]}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-slate-500">Possui dívidas:</span>{' '}
            <span className="font-medium text-slate-700">
              {profile.possui_dividas ? 'Sim' : 'Não'}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-slate-500">Renda mensal:</span>{' '}
            <span className="font-medium text-slate-700">
              {labels.renda_mensal[profile.renda_mensal]}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}