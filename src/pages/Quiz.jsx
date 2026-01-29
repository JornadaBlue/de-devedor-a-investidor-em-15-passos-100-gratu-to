import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import QuizForm from '../components/quiz/QuizForm';

export default function Quiz() {
  const navigate = useNavigate();
  
  // Verifica se há respostas salvas após login
  React.useEffect(() => {
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers);
      handleComplete(answers);
    }
  }, []);

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
      // Verifica se o usuário está autenticado
      const isAuthenticated = await base44.auth.isAuthenticated();
      
      if (!isAuthenticated) {
        // Salva as respostas no localStorage para recuperar após login
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
        
        // Redireciona para login
        base44.auth.redirectToLogin(window.location.href);
        return;
      }
      
      const profile = calculateProfile(answers);
      
      const dataToSave = {
        nome: answers.nome,
        idade: parseInt(answers.idade),
        como_termina_mes: answers.como_termina_mes,
        maior_dor: answers.maior_dor,
        possui_dividas: answers.possui_dividas,
        ja_investe: answers.ja_investe,
        objetivo_principal: answers.objetivo_principal,
        comprometimento: answers.comprometimento,
        patrimonio_investido: answers.patrimonio_investido,
        objetivo_longo_prazo: answers.objetivo_longo_prazo,
        renda_mensal: answers.renda_mensal,
        perfil: profile,
        progresso: [],
        data_inicio: new Date().toISOString().split('T')[0],
      };
      
      const userProfile = await base44.entities.UserProfile.create(dataToSave);
      
      // Limpa as respostas salvas
      localStorage.removeItem('quizAnswers');
      
      const nextUrl = createPageUrl('PreparandoPlano') + `?id=${userProfile.id}&perfil=${profile}&nome=${encodeURIComponent(answers.nome)}`;
      navigate(nextUrl);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar: ' + error.message);
    }
  };

  return <QuizForm onComplete={handleComplete} />;
}