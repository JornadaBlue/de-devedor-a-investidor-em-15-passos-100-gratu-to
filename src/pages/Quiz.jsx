import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import QuizForm from '../components/quiz/QuizForm';

export default function Quiz() {
  const navigate = useNavigate();

  const calculateProfile = (answers) => {
    // Perfil C: Endividado e desorganizado - termina em falta E tem dívidas
    if (answers.como_termina_mes === 'falta' && answers.possui_dividas === true) {
      return 'C';
    }
    
    // Perfil D: Sem dívidas mas sem sobra - termina em zero OU falta, mas SEM dívidas
    if ((answers.como_termina_mes === 'zero' || answers.como_termina_mes === 'falta') && answers.possui_dividas === false) {
      return 'D';
    }
    
    // Perfil E: Investidor ansioso e inconsistente - já investe mas tem dificuldade em manter estratégia
    if (answers.ja_investe !== 'nunca' && answers.como_termina_mes === 'sobra' && answers.maior_dor === 'medo_investir') {
      return 'E';
    }
    
    // Perfil B: Organizado e iniciando investimentos - termina em sobra mas ainda não investe fora ou está iniciando
    if (answers.como_termina_mes === 'sobra' && (answers.ja_investe === 'nunca' || answers.ja_investe === 'brasil')) {
      return 'B';
    }
    
    // Perfil A: Investidor básico buscando otimização - termina em sobra e já investe
    if (answers.como_termina_mes === 'sobra' && answers.ja_investe === 'fora') {
      return 'A';
    }
    
    // Default: Perfil D (sem dívidas mas precisa organizar)
    return 'D';
  };

  const handleComplete = async (answers) => {
    try {
      console.log('handleComplete chamado com:', answers);
      const profile = calculateProfile(answers);
      console.log('Perfil calculado:', profile);
      
      // Save to database
      console.log('Salvando no banco de dados...');
      const userProfile = await base44.entities.UserProfile.create({
        ...answers,
        perfil: profile,
        progresso: [],
        data_inicio: new Date().toISOString().split('T')[0],
      });
      console.log('Perfil salvo:', userProfile);

      // Navigate to loading page first
      const nextUrl = createPageUrl('PreparandoPlano') + `?id=${userProfile.id}&perfil=${profile}&nome=${encodeURIComponent(answers.nome)}`;
      console.log('Navegando para:', nextUrl);
      navigate(nextUrl);
    } catch (error) {
      console.error('Erro ao completar quiz:', error);
      alert('Erro ao salvar suas respostas. Por favor, tente novamente.');
    }
  };

  return <QuizForm onComplete={handleComplete} />;
}