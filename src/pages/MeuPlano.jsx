import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { FileText, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function MeuPlano() {
  const navigate = useNavigate();

  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const user = await base44.auth.me();
      const profiles = await base44.entities.UserProfile.filter({
        created_by: user.email
      });
      return profiles[0];
    },
  });

  const { data: plano, isLoading: planoLoading } = useQuery({
    queryKey: ['plano', userProfile?.perfil],
    queryFn: async () => {
      if (!userProfile?.perfil) return null;
      const planos = await base44.entities.Plano.filter({
        perfil: userProfile.perfil
      });
      return planos[0];
    },
    enabled: !!userProfile?.perfil,
  });

  if (profileLoading || planoLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando seu plano...</p>
        </div>
      </div>
    );
  }

  // Usuário não tem plano personalizado
  if (!userProfile?.tem_plano_personalizado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-3xl p-8 text-center shadow-2xl"
        >
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">
            Conteúdo Exclusivo
          </h1>
          <p className="text-slate-600 mb-6">
            Este plano personalizado está disponível apenas para quem adquiriu o acesso premium.
          </p>
          <Button
            onClick={() => navigate(createPageUrl('Dashboard'))}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  // Usuário tem acesso, mas plano não encontrado
  if (!plano) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-600">Plano não encontrado para o seu perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(createPageUrl('Dashboard'))}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar ao Dashboard</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
            <FileText className="w-4 h-4 text-amber-600" />
            <span className="text-amber-700 text-sm font-medium">Plano Personalizado</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {plano.titulo}
          </h1>
          <p className="text-slate-600">
            Seu perfil: <span className="font-semibold text-amber-600">Perfil {userProfile.perfil}</span>
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
        >
          <ReactMarkdown
            className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-4 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2 prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900 prose-ul:my-4 prose-li:text-slate-700 prose-li:my-1"
          >
            {plano.conteudo_markdown}
          </ReactMarkdown>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Criado por <span className="text-amber-600 font-medium">Jhony Bosio</span>
          </p>
          <p className="text-slate-600 text-xs">Assessor de Investimentos • Blue3 Investimentos</p>
        </div>
      </div>
    </div>
  );
}