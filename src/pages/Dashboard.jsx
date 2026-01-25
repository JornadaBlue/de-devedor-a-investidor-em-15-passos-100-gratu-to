import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import ProgressHeader from '../components/dashboard/ProgressHeader';
import DayCard from '../components/dashboard/DayCard';
import DayContent from '../components/dashboard/DayContent';

const dayPlan = [
  { day: 1, title: 'Identifique seus vazamentos', description: 'Descubra para onde vai seu dinheiro', phase: 'estancar' },
  { day: 2, title: 'Organize seu cartão de crédito', description: 'Transforme o vilão em aliado', phase: 'estancar' },
  { day: 3, title: 'Separe o dinheiro do mês', description: 'Técnica dos potes para nunca mais faltar', phase: 'estancar' },
  { day: 4, title: 'Mapeie suas dívidas', description: 'Conheça o inimigo para vencê-lo', phase: 'estancar' },
  { day: 5, title: 'Crie sua rotina financeira', description: '10 minutos por semana que mudam tudo', phase: 'sobra' },
  { day: 6, title: 'Defina sua regra de gastos', description: 'Regras simples evitam decisões ruins', phase: 'sobra' },
  { day: 7, title: 'Comece sua primeira reserva', description: 'Qualquer valor é melhor que nenhum', phase: 'sobra' },
  { day: 8, title: 'Automatize suas finanças', description: 'O que é automático, acontece', phase: 'sobra' },
  { day: 9, title: 'Revise e ajuste', description: 'Planos precisam de ajustes', phase: 'sobra' },
  { day: 10, title: 'Por que investir fora', description: 'Diversificar é proteger', phase: 'internacional' },
  { day: 11, title: 'Entenda os riscos', description: 'Conheça antes de investir', phase: 'internacional' },
  { day: 12, title: 'Conheça as opções', description: 'ETFs, BDRs e mais', phase: 'internacional' },
  { day: 13, title: 'Visão de longo prazo', description: 'Maratona, não corrida', phase: 'internacional' },
  { day: 14, title: 'Seus próximos passos', description: 'Continue a jornada', phase: 'internacional' },
];

export default function Dashboard() {
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const profileId = urlParams.get('id');
  
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeTab, setActiveTab] = useState('estancar');

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
    mutationFn: async (day) => {
      if (!profile) return;
      const newProgress = [...(profile.progresso || [])];
      if (!newProgress.includes(day)) {
        newProgress.push(day);
      }
      await base44.entities.UserProfile.update(profile.id, { progresso: newProgress });
      return newProgress;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', profileId] });
    },
  });

  const completedDays = profile?.progresso || [];
  const currentDay = completedDays.length + 1;

  const handleCompleteDay = (day) => {
    updateProgressMutation.mutate(day);
    setSelectedDay(null);
  };

  const getPhaseLabel = (phase) => {
    switch (phase) {
      case 'estancar': return 'Dias 1-4 • Estancar';
      case 'sobra': return 'Dias 5-9 • Criar Sobra';
      case 'internacional': return 'Dias 10-14 • Base Internacional';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (selectedDay) {
    return (
      <DayContent
        day={selectedDay}
        onComplete={handleCompleteDay}
        onBack={() => setSelectedDay(null)}
        isCompleted={completedDays.includes(selectedDay)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Progress Header */}
        <ProgressHeader
          userName={profile?.nome || 'Usuário'}
          completedDays={completedDays.length}
          totalDays={14}
          currentStreak={completedDays.length > 0 ? Math.min(completedDays.length, 14) : 0}
        />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="w-full bg-white border border-slate-200 p-1.5 rounded-2xl h-auto flex-wrap">
            <TabsTrigger
              value="estancar"
              className="flex-1 min-w-[100px] rounded-xl py-3 text-sm font-medium data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Estancar
            </TabsTrigger>
            <TabsTrigger
              value="sobra"
              className="flex-1 min-w-[100px] rounded-xl py-3 text-sm font-medium data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Criar Sobra
            </TabsTrigger>
            <TabsTrigger
              value="internacional"
              className="flex-1 min-w-[100px] rounded-xl py-3 text-sm font-medium data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              Internacional
            </TabsTrigger>
          </TabsList>

          {['estancar', 'sobra', 'internacional'].map((phase) => (
            <TabsContent key={phase} value={phase} className="mt-6">
              <p className="text-slate-500 text-sm mb-4 font-medium">
                {getPhaseLabel(phase)}
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {dayPlan
                  .filter((day) => day.phase === phase)
                  .map((day, index) => (
                    <DayCard
                      key={day.day}
                      day={day.day}
                      title={day.title}
                      description={day.description}
                      isCompleted={completedDays.includes(day.day)}
                      isLocked={day.day > currentDay && !completedDays.includes(day.day)}
                      isCurrent={day.day === currentDay}
                      onClick={() => {
                        if (day.day <= currentDay || completedDays.includes(day.day)) {
                          setSelectedDay(day.day);
                        }
                      }}
                    />
                  ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}