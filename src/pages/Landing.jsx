import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import HeroSection from '../components/landing/HeroSection';

export default function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(createPageUrl('Quiz'));
  };

  const handleLogin = async () => {
    const isAuthenticated = await base44.auth.isAuthenticated();
    
    if (isAuthenticated) {
      // Verifica se o usuário tem um perfil
      const user = await base44.auth.me();
      const profiles = await base44.entities.UserProfile.filter({ created_by: user.email });
      
      if (profiles.length > 0) {
        navigate(createPageUrl('Home'));
      } else {
        navigate(createPageUrl('Quiz'));
      }
    } else {
      base44.auth.redirectToLogin(window.location.origin);
    }
  };

  return <HeroSection onStart={handleStart} onLogin={handleLogin} />;
}