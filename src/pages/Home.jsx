import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Loader2 } from 'lucide-react';
import QuizSummary from '../components/home/QuizSummary';
import ProfileCard from '../components/home/ProfileCard';
import PlanCard from '../components/home/PlanCard';
import ClubeCard from '../components/home/ClubeCard';
import TelegramCard from '../components/home/TelegramCard';
import JourneyCard from '../components/home/JourneyCard';

export default function Home() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const { data: profile, isLoading } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      if (!user) return null;
      const profiles = await base44.entities.UserProfile.filter({ created_by: user.email });
      return profiles[0] || null;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Você ainda não completou o diagnóstico.</p>
          <a href="/" className="text-amber-600 hover:text-amber-700 font-medium">
            Fazer diagnóstico agora
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Olá, {profile.nome}! 👋
          </h1>
          <p className="text-slate-600">
            Bem-vindo à sua área personalizada
          </p>
        </div>

        {/* Grid de 6 seções */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <QuizSummary profile={profile} />
          <ProfileCard profile={profile} />
          <PlanCard profile={profile} />
          <ClubeCard profile={profile} />
          <TelegramCard />
          <JourneyCard profile={profile} />
        </div>
      </div>
    </div>
  );
}