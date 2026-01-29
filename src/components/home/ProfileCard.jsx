import React from 'react';
import { motion } from 'framer-motion';
import { User, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const profileData = {
  A: {
    title: 'Devedor Iniciante',
    color: 'bg-red-100 text-red-700',
    description: 'Você está começando a organizar suas finanças e sair das dívidas.'
  },
  B: {
    title: 'Organizador',
    color: 'bg-orange-100 text-orange-700',
    description: 'Você está no caminho certo para equilibrar suas contas.'
  },
  C: {
    title: 'Equilibrado',
    color: 'bg-yellow-100 text-yellow-700',
    description: 'Suas finanças estão organizadas e você está pronto para investir.'
  },
  D: {
    title: 'Investidor Inicial',
    color: 'bg-green-100 text-green-700',
    description: 'Você já investe e busca melhorar sua estratégia.'
  },
  E: {
    title: 'Investidor Avançado',
    color: 'bg-blue-100 text-blue-700',
    description: 'Você tem experiência e busca diversificação avançada.'
  }
};

export default function ProfileCard({ profile }) {
  const perfil = profileData[profile.perfil] || profileData.A;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer"
    >
      <Card className="p-6 bg-white hover:shadow-lg transition-all border-2 border-slate-200 h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Seu Perfil
            </h3>
            <p className="text-sm text-slate-500">Perfil {profile.perfil}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>

        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${perfil.color}`}>
            {perfil.title}
          </span>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          {perfil.description}
        </p>
      </Card>
    </motion.div>
  );
}