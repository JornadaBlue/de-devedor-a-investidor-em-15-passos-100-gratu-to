import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import HeroSection from '../components/landing/HeroSection';

export default function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(createPageUrl('Quiz'));
  };

  return <HeroSection onStart={handleStart} />;
}