import React from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Calendar, FileText, ExternalLink } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function Clube() {
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const profiles = await base44.entities.UserProfile.filter({ created_by: user.email });
      return profiles[0] || null;
    },
    enabled: !!user?.email,
  });

  const { data: conteudos, isLoading: isLoadingConteudos } = useQuery({
    queryKey: ['conteudosClube'],
    queryFn: async () => {
      const conteudos = await base44.entities.ConteudoClube.list('-data_publicacao');
      return conteudos;
    },
    enabled: !!userProfile?.eh_membro_clube,
  });

  const isLoading = isLoadingProfile || isLoadingConteudos;
  const isMembro = userProfile?.eh_membro_clube === true;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isMembro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 rounded-2xl mb-6">
            <Lock className="w-10 h-10 text-amber-400" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Conteúdo Exclusivo
          </h1>
          <p className="text-slate-400 mb-6">
            Este conteúdo é exclusivo para membros do Clube Devedor a Investidor
          </p>

          <Button
            onClick={() => navigate(createPageUrl('Home'))}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate(createPageUrl('Home'))}
            variant="ghost"
            className="text-slate-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Clube Devedor a Investidor
          </h1>
          <p className="text-slate-400">
            Conteúdos mensais exclusivos para sua evolução financeira
          </p>
        </div>

        {/* Content List */}
        {!conteudos || conteudos.length === 0 ? (
          <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10 text-center">
            <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">
              Nenhum conteúdo disponível no momento. Novos materiais serão adicionados em breve!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {conteudos.map((conteudo) => (
              <motion.div
                key={conteudo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-amber-600" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-500">
                        {new Date(conteudo.data_publicacao).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                        {conteudo.mes_referencia}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {conteudo.titulo}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {conteudo.descricao}
                    </p>

                    {conteudo.link_conteudo && (
                      <a
                        href={conteudo.link_conteudo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-900 font-semibold rounded-lg transition-all"
                      >
                        Acessar conteúdo
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Novos conteúdos são adicionados mensalmente
          </p>
        </div>
      </div>
    </div>
  );
}