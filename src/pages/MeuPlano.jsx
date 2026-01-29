import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Lock, ArrowLeft, CheckCircle2, Circle, 
  Target, TrendingUp, Calendar, Award, Lightbulb,
  ChevronRight, ChevronDown, Sparkles, AlertCircle, BookOpen,
  Zap, Star, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function MeuPlano() {
  const navigate = useNavigate();

  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const user = await base44.auth.me();
      const profiles = await base44.entities.UserProfile.filter({
        created_by: user.email
      });
      return profiles[0];
    },
  });

  const { data: plano, isLoading: planoLoading } = useQuery({
    queryKey: ['plano', userProfile?.perfil],
    queryFn: async () => {
      if (!userProfile?.perfil) return null;
      const planos = await base44.entities.Plano.filter({
        perfil: userProfile.perfil
      });
      return planos[0];
    },
    enabled: !!userProfile?.perfil,
  });

  if (profileLoading || planoLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando seu plano...</p>
        </div>
      </div>
    );
  }

  // Usuário não tem plano personalizado
  if (!userProfile?.tem_plano_personalizado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white rounded-3xl p-8 text-center shadow-2xl"
        >
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">
            Conteúdo Exclusivo
          </h1>
          <p className="text-slate-600 mb-6">
            Este plano personalizado está disponível apenas para quem adquiriu o acesso premium.
          </p>
          <Button
            onClick={() => navigate(createPageUrl('Home'))}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </motion.div>
      </div>
    );
  }

  // Usuário tem acesso, mas plano não encontrado
  if (!plano) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-600">Plano não encontrado para o seu perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-slate-200 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-5xl">
          <button
            onClick={() => navigate(createPageUrl('Home'))}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Voltar</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-3xl blur-3xl -z-10" />
          
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-amber-400" />
                <span className="text-amber-400 font-semibold tracking-wide">Plano Exclusivo</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {plano.titulo}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-sm">Seu perfil: <span className="font-bold text-amber-400">Perfil {userProfile.perfil}</span></span>
                </div>
                <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-sm">Criado por <span className="font-bold">Jhony Bosio</span></span>
                </div>
              </div>
              
              <p className="text-slate-300 text-lg max-w-2xl">
                Este plano foi cuidadosamente elaborado com base no seu perfil financeiro e objetivos pessoais. Siga cada fase com atenção para maximizar seus resultados.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <PlanContent plano={plano} userProfile={userProfile} />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white"
        >
          <div className="mb-4">
            <Award className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Continue Sua Jornada</h3>
            <p className="text-slate-300">
              Este plano é seu guia. Revise regularmente e ajuste conforme necessário.
            </p>
          </div>
          
          <div className="pt-6 border-t border-white/10">
            <p className="text-slate-400 text-sm">
              Criado por <span className="text-amber-400 font-medium">Jhony Bosio</span>
            </p>
            <p className="text-slate-500 text-xs mt-1">Assessor de Investimentos • Blue3 Investimentos</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Componente para renderizar o conteúdo estruturado do plano
function PlanContent({ plano, userProfile }) {
  const [expandedModules, setExpandedModules] = useState({});
  const [completedMissions, setCompletedMissions] = useState({});

  const toggleModule = (index) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleMission = (key) => {
    setCompletedMissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Se o plano tem estrutura nova (JSON)
  if (plano.boas_vindas || plano.modulos) {
    return (
      <div className="space-y-8">
        {/* Boas-vindas */}
        {plano.boas_vindas && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {plano.boas_vindas.titulo || 'Bem-vindo à sua jornada'}
                </h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {plano.boas_vindas.texto}
                </p>
              </div>
            </div>
            
            {plano.boas_vindas.diagnostico && (
              <div className="mt-6 p-4 bg-white/70 rounded-xl border border-amber-300">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900 mb-1">Seu Diagnóstico</p>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {plano.boas_vindas.diagnostico}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Módulos */}
        {plano.modulos?.map((modulo, modIndex) => {
          const isExpanded = expandedModules[modIndex] !== false;
          const IconComponent = getIconComponent(modulo.icone);
          
          return (
            <motion.div
              key={modIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: modIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
            >
              {/* Module Header */}
              <button
                onClick={() => toggleModule(modIndex)}
                className="w-full p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${modulo.cor || 'from-blue-500 to-blue-600'} flex items-center justify-center shrink-0 shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 text-left">
                  <h2 className="text-xl font-bold text-slate-900">{modulo.titulo}</h2>
                  {modulo.situacao_problema && (
                    <p className="text-sm text-slate-600 mt-1">{modulo.situacao_problema}</p>
                  )}
                </div>
                
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                </motion.div>
              </button>

              {/* Module Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-100"
                  >
                    <div className="p-6 space-y-6">
                      {modulo.unidades?.map((unidade, uIndex) => (
                        <div key={uIndex} className="space-y-4">
                          {unidade.titulo && (
                            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-amber-500" />
                              {unidade.titulo}
                            </h3>
                          )}
                          
                          {unidade.conteudo?.map((item, iIndex) => (
                            <ContentBlock 
                              key={iIndex} 
                              item={item} 
                              moduleIndex={modIndex}
                              unitIndex={uIndex}
                              itemIndex={iIndex}
                              isCompleted={completedMissions[`${modIndex}-${uIndex}-${iIndex}`]}
                              onToggle={() => toggleMission(`${modIndex}-${uIndex}-${iIndex}`)}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Encerramento */}
        {plano.encerramento && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Você Chegou ao Fim, mas é só o Começo
              </h2>
            </div>

            {plano.encerramento.pergunta_poderosa && (
              <div className="bg-white/70 rounded-xl p-6 mb-6 border border-purple-300">
                <p className="text-lg font-medium text-purple-900 mb-2">
                  💭 Reflita sobre isso:
                </p>
                <p className="text-slate-700 italic leading-relaxed">
                  "{plano.encerramento.pergunta_poderosa}"
                </p>
              </div>
            )}

            {plano.encerramento.citacao && (
              <div className="bg-white/70 rounded-xl p-6 mb-6 border-l-4 border-amber-500">
                <p className="text-slate-700 italic mb-2">
                  "{plano.encerramento.citacao.texto}"
                </p>
                <p className="text-sm text-slate-600 font-medium">
                  — {plano.encerramento.citacao.autor}
                </p>
              </div>
            )}

            {plano.encerramento.mensagem_final && (
              <p className="text-slate-700 leading-relaxed text-center whitespace-pre-line">
                {plano.encerramento.mensagem_final}
              </p>
            )}
          </motion.div>
        )}
      </div>
    );
  }

  // Fallback para planos antigos (markdown)
  return <LegacyMarkdownContent conteudo={plano.conteudo_markdown} />;
}

// Componente para renderizar cada tipo de bloco de conteúdo
function ContentBlock({ item, moduleIndex, unitIndex, itemIndex, isCompleted, onToggle }) {
  if (item.tipo === 'paragrafo') {
    return (
      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
        {item.texto}
      </p>
    );
  }

  if (item.tipo === 'destaque') {
    const styles = {
      saiba_mais: { bg: 'bg-blue-50', border: 'border-blue-300', icon: Info, iconColor: 'text-blue-600', title: 'Saiba Mais' },
      atencao: { bg: 'bg-amber-50', border: 'border-amber-300', icon: AlertCircle, iconColor: 'text-amber-600', title: 'Atenção' },
      dica: { bg: 'bg-green-50', border: 'border-green-300', icon: Lightbulb, iconColor: 'text-green-600', title: 'Dica' }
    };
    const style = styles[item.estilo] || styles.saiba_mais;
    const Icon = style.icon;

    return (
      <div className={`${style.bg} rounded-xl p-4 border ${style.border}`}>
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 ${style.iconColor} shrink-0 mt-0.5`} />
          <div>
            <p className={`text-sm font-semibold ${style.iconColor} mb-1`}>{style.title}</p>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {item.texto}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (item.tipo === 'infografico') {
    return (
      <div className="bg-slate-50 rounded-xl p-6 border-2 border-dashed border-slate-300">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">📊 Infográfico Sugerido</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.descricao}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (item.tipo === 'missao') {
    return (
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`w-full text-left rounded-xl p-5 transition-all ${
          isCompleted 
            ? 'bg-emerald-50 border-2 border-emerald-300' 
            : 'bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 hover:border-orange-300'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
            isCompleted ? 'bg-emerald-500' : 'bg-orange-500'
          }`}>
            {isCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-white" />
            ) : (
              <Zap className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-orange-600 bg-orange-200 px-2 py-0.5 rounded-full">
                MISSÃO NÍVEL {item.nivel || 1}
              </span>
            </div>
            <h4 className={`font-bold mb-2 ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
              {item.titulo}
            </h4>
            <p className={`text-sm leading-relaxed ${isCompleted ? 'text-slate-500' : 'text-slate-700'}`}>
              {item.descricao}
            </p>
          </div>
        </div>
      </motion.button>
    );
  }

  if (item.tipo === 'cta') {
    return (
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <ChevronRight className="w-6 h-6" />
          <h4 className="font-bold text-lg">Ação Imediata</h4>
        </div>
        <p className="leading-relaxed mb-4">{item.texto}</p>
        {item.acao && (
          <div className="text-sm bg-white/20 rounded-lg px-4 py-2 inline-block">
            {item.acao}
          </div>
        )}
      </div>
    );
  }

  if (item.tipo === 'lista') {
    return (
      <ul className="space-y-2 ml-4">
        {item.itens?.map((listItem, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <span className="text-slate-700">{listItem}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (item.tipo === 'glossario') {
    return (
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-slate-900 mb-1">
              {item.titulo || 'Glossário'}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.texto}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Helper para mapear ícones
function getIconComponent(iconName) {
  const icons = {
    target: Target,
    trending: TrendingUp,
    calendar: Calendar,
    award: Award,
    lightbulb: Lightbulb,
    sparkles: Sparkles,
    star: Star,
    zap: Zap
  };
  return icons[iconName] || Target;
}

// Fallback para planos antigos em markdown
function LegacyMarkdownContent({ conteudo }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <p className="text-slate-700 whitespace-pre-line leading-relaxed">
        {conteudo}
      </p>
    </div>
  );
}