import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import QuizForm from '../components/quiz/QuizForm';

export default function Quiz() {
  const navigate = useNavigate();

  const calculateProfile = (answers) => {
    // Perfil C: Devedor - termina em falta OU tem dívidas
    if (answers.como_termina_mes === 'falta' || answers.possui_dividas === true) {
      return 'C';
    }
    // Perfil B: Organizado sem estratégia - termina em zero e não investe fora
    if (answers.como_termina_mes === 'zero' && answers.ja_investe !== 'fora') {
      return 'B';
    }
    // Perfil A: Base pronta - termina em sobra
    return 'A';
  };

  const handleComplete = async (answers) => {
    const profile = calculateProfile(answers);
    
    // Save to database
    const userProfile = await base44.entities.UserProfile.create({
      ...answers,
      perfil: profile,
      progresso: [],
      data_inicio: new Date().toISOString().split('T')[0],
    });

    // Navigate to result page with profile info
    navigate(createPageUrl('Resultado') + `?id=${userProfile.id}&perfil=${profile}&nome=${encodeURIComponent(answers.nome)}`);
  };

  return <QuizForm onComplete={handleComplete} />;
}