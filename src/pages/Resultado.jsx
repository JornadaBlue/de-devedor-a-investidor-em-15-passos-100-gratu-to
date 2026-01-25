import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ProfileResult from '../components/result/ProfileResult';

export default function Resultado() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const profile = urlParams.get('perfil') || 'B';
  const userName = urlParams.get('nome') || 'Usuário';
  const profileId = urlParams.get('id');

  const handleStartPlan = () => {
    navigate(createPageUrl('Dashboard') + `?id=${profileId}`);
  };

  return (
    <ProfileResult
      profile={profile}
      userName={userName}
      onStartPlan={handleStartPlan}
    />
  );
}