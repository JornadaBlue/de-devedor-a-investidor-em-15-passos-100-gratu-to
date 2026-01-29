import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Loader2, Trophy } from 'lucide-react';
import StepCard from '../components/dashboard/StepCard';
import StepContent from '../components/dashboard/StepContent';

const steps = [
  { step: 1, title: 'Encare sua realidade', description: 'Raio-x financeiro', phase: 'diagnostico' },
  { step: 2, title: 'Identifique vazamentos', description: 'Gastos invisíveis', phase: 'diagnostico' },
  { step: 3, title: 'Mapeie suas dívidas', description: 'Conheça o inimigo', phase: 'diagnostico' },
  { step: 4, title: 'Crie seu orçamento', description: 'Regra 50-30-20', phase: 'organizacao' },
  { step: 5, title: 'Separe suas contas', description: 'Potes de dinheiro', phase: 'organizacao' },
  { step: 6, title: 'Elimine dívidas', description: 'Renegocie e quite', phase: 'organizacao' },
  { step: 7, title: 'Crie regras pessoais', description: 'Decisões automáticas', phase: 'organizacao' },
  { step: 8, title: 'Reserva de emergência', description: 'Sua rede de proteção', phase: 'construcao' },
  { step: 9, title: 'Automatize finanças', description: 'Piloto automático', phase: 'construcao' },
  { step: 10, title: 'Rotina financeira', description: '10 min por semana', phase: 'construcao' },
  { step: 11, title: 'Juros compostos', description: 'Seu maior aliado', phase: 'mentalidade' },
  { step: 12, title: 'Defina objetivos', description: 'Dinheiro com propósito', phase: 'mentalidade' },
  { step: 13, title: 'Opções de investimento', description: 'Renda fixa e variável', phase: 'proximos' },
  { step: 14, title: 'Abra conta em corretora', description: 'Seu portal de investimentos', phase: 'proximos' },
  { step: 15, title: 'Primeiro investimento', description: 'Você é um investidor!', phase: 'proximos' },
];

const phaseInfo = {
  diagnostico: { label: 'Diagnóstico', color: 'bg-orange-500' },
  organizacao: { label: 'Organização', color: 'bg-blue-500' },
  construcao: { label: 'Construção', color: 'bg-purple-500' },
  mentalidade: { label: 'Mentalidade', color: 'bg-pink-500' },
  proximos: { label: 'Próximos Passos', color: 'bg-emerald-500' },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const profileId = urlParams.get('id');
  
  const [selectedStep, setSelectedStep] = useState(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['userProfile', profileId],
    queryFn: async () => {
      if (!profileId) return null;
      const profiles = await base44.entities.UserProfile.filter({ id: profileId });
      return profiles[0] || null;
    },
    enabled: !!profileId,
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (step) => {
      if (!profileId) {
        throw new Error('Profile ID não encontrado');
      }
      
      // Busca o profile atualizado do cache/servidor
      const profiles = await base44.entities.UserProfile.filter({ id: profileId });
      const currentProfile = profiles[0];
      
      if (!currentProfile) {
        throw new Error('Profile não encontrado');
      }
      
      const currentProgress = currentProfile.progresso || [];
      const newProgress = [...currentProgress];
      
      if (!newProgress.includes(step)) {
        newProgress.push(step);
      }
      
      await base44.entities.UserProfile.update(currentProfile.id, { 
        progresso: newProgress 
      });
      
      return { newProgress, userName: currentProfile.nome };
    },
    onSuccess: async (data) => {
      // Refetch explícito
      await queryClient.refetchQueries({ queryKey: ['userProfile', profileId] });
      
      // Se completou todos os 15 passos, vai para encerramento
      if (data.newProgress && data.newProgress.length >= 15) {
        navigate(createPageUrl('Encerramento') + `?id=${profileId}&nome=${encodeURIComponent(data.userName || 'Usuário')}`);
      }
    },
    onError: (error) => {
      console.error('Erro ao atualizar progresso:', error);
    },
  });

  const completedSteps = profile?.progresso || [];
  const currentStep = completedSteps.length + 1;
  const progress = (completedSteps.length / 15) * 100;

  const handleCompleteStep = async (step) => {
    try {
      await updateProgressMutation.mutateAsync(step);
      // Espera um pouco para garantir que o refetch aconteceu
      setTimeout(() => {
        setSelectedStep(null);
      }, 500);
    } catch (error) {
      console.error('Erro ao completar passo:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (selectedStep) {
    return (
      <StepContent
        step={selectedStep}
        onComplete={handleCompleteStep}
        onBack={() => setSelectedStep(null)}
        isCompleted={completedSteps.includes(selectedStep)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 max-w-lg">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl mb-6">
          <div className="flex items-center justify-between mb-1">
            <p className="text-slate-400 text-sm">Olá, {profile?.nome || 'Usuário'}</p>
            <span className="px-2 py-1 bg-white/10 text-xs text-slate-300 rounded-full">Plano Gratuito</span>
          </div>
          <h1 className="text-xl font-bold mb-4">De Devedor a Investidor</h1>
          
          {/* Progress */}
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-400">{completedSteps.length} de 15 passos</span>
            <span className="text-amber-400 font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {completedSteps.length >= 15 && (
            <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-emerald-300 font-medium">Você completou todos os passos!</span>
            </div>
          )}
        </div>

        {/* Steps by phase */}
        {Object.entries(phaseInfo).map(([phaseKey, phaseData]) => {
          const phaseSteps = steps.filter(s => s.phase === phaseKey);
          return (
            <div key={phaseKey} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${phaseData.color}`} />
                <span className="text-sm font-semibold text-slate-700">{phaseData.label}</span>
              </div>
              <div className="space-y-2">
                {phaseSteps.map((s) => (
                  <StepCard
                    key={s.step}
                    step={s.step}
                    title={s.title}
                    description={s.description}
                    isCompleted={completedSteps.includes(s.step)}
                    isLocked={s.step > currentStep && !completedSteps.includes(s.step)}
                    isCurrent={s.step === currentStep}
                    onClick={() => {
                      if (s.step <= currentStep || completedSteps.includes(s.step)) {
                        setSelectedStep(s.step);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}