import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PlanCard({ profile }) {
  const navigate = useNavigate();
  const hasAccess = profile.tem_plano_personalizado;

  const handleClick = () => {
    if (hasAccess) {
      navigate(createPageUrl('MeuPlano') + `?id=${profile.id}`);
    } else {
      // Redirecionar para página de compra
      window.location.href = 'https://pay.hotmart.com/H104116853S';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card className={`p-6 hover:shadow-lg transition-all border-2 h-full ${
        hasAccess 
          ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            hasAccess ? 'bg-amber-100' : 'bg-slate-100'
          }`}>
            {hasAccess ? (
              <FileText className="w-6 h-6 text-amber-600" />
            ) : (
              <Lock className="w-6 h-6 text-slate-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Plano Personalizado
            </h3>
            <p className="text-sm text-slate-500">
              {hasAccess ? 'Acesse seu plano' : 'Ainda não adquirido'}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>

        {hasAccess ? (
          <p className="text-sm text-slate-600">
            Seu plano detalhado baseado no seu perfil e respostas está disponível.
          </p>
        ) : (
          <div>
            <p className="text-sm text-slate-600 mb-3">
              Adquira seu plano detalhado e personalizado por apenas R$17.
            </p>
            <span className="text-xs text-amber-600 font-semibold">
              Clique para adquirir →
            </span>
          </div>
        )}
      </Card>
    </motion.div>
  );
}