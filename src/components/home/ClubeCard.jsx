import React from 'react';
import { motion } from 'framer-motion';
import { Users, ChevronRight, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ClubeCard({ profile }) {
  const navigate = useNavigate();
  const isMember = profile.eh_membro_clube;

  const handleClick = () => {
    if (isMember) {
      navigate(createPageUrl('Clube') + `?id=${profile.id}`);
    } else {
      // Redirecionar para página de assinatura
      window.location.href = 'https://pay.hotmart.com/A104123950F';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card className={`p-6 hover:shadow-lg transition-all border-2 h-full ${
        isMember 
          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            isMember ? 'bg-blue-100' : 'bg-slate-100'
          }`}>
            {isMember ? (
              <Users className="w-6 h-6 text-blue-600" />
            ) : (
              <Lock className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Clube de Membros
            </h3>
            <p className="text-sm text-slate-500">
              {isMember ? 'Você é membro' : 'Ainda não é membro'}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>

        {isMember ? (
          <p className="text-sm text-slate-600">
            Acesse conteúdos exclusivos mensais da Blue3 Investimentos.
          </p>
        ) : (
          <div>
            <p className="text-sm text-slate-600 mb-3">
              Junte-se ao clube por R$27/mês e receba análises e conteúdos exclusivos.
            </p>
            <span className="text-xs text-blue-600 font-semibold">
              Clique para assinar →
            </span>
          </div>
        )}
      </Card>
    </motion.div>
  );
}