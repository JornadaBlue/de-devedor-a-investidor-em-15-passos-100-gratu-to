import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Lock, ArrowLeft, CheckCircle2, Circle, 
  Target, TrendingUp, Calendar, Award, Lightbulb,
  ChevronRight, ChevronDown
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
            onClick={() => navigate(createPageUrl('Dashboard'))}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
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
          {/* Background decoration */}
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

        {/* Content - Passa o plano para o componente */}
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

// Componente para renderizar o conteúdo do plano de forma visual
function PlanContent({ plano, userProfile }) {
  const [expandedSections, setExpandedSections] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleCheckItem = (sectionIndex, itemIndex) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Parse do markdown para estrutura visual
  const parseContent = (markdown) => {
    const lines = markdown.split('\n');
    const sections = [];
    let currentSection = null;
    let currentSubsection = null;

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        if (currentSection) sections.push(currentSection);
        currentSection = {
          title: line.replace('## ', ''),
          type: 'section',
          content: [],
          subsections: []
        };
      } else if (line.startsWith('### ')) {
        if (currentSubsection) currentSection.subsections.push(currentSubsection);
        currentSubsection = {
          title: line.replace('### ', ''),
          items: []
        };
      } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const item = line.trim().substring(2);
        if (currentSubsection) {
          currentSubsection.items.push(item);
        } else if (currentSection) {
          currentSection.content.push({ type: 'list', text: item });
        }
      } else if (line.trim() && !line.startsWith('#')) {
        if (currentSubsection) {
          currentSubsection.items.push({ type: 'text', text: line.trim() });
        } else if (currentSection) {
          currentSection.content.push({ type: 'text', text: line.trim() });
        }
      }
    });

    if (currentSubsection) currentSection.subsections.push(currentSubsection);
    if (currentSection) sections.push(currentSection);

    return sections;
  };

  const sections = parseContent(plano.conteudo_markdown);

  const getSectionIcon = (index) => {
    const icons = [Target, TrendingUp, Calendar, Lightbulb, CheckCircle2, Award];
    const Icon = icons[index % icons.length];
    return Icon;
  };

  const getSectionColor = (index) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-emerald-500 to-emerald-600',
      'from-amber-500 to-amber-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => {
        const Icon = getSectionIcon(sectionIndex);
        const isExpanded = expandedSections[sectionIndex] !== false;

        return (
          <motion.div
            key={sectionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="w-full p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getSectionColor(sectionIndex)} flex items-center justify-center shrink-0 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 text-left">
                <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
              </div>
              
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-slate-400" />
              </motion.div>
            </button>

            {/* Section Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-slate-100"
                >
                  <div className="p-6 space-y-4">
                    {/* Content paragraphs */}
                    {section.content.map((item, idx) => (
                      <div key={idx}>
                        {item.type === 'text' && (
                          <p className="text-slate-700 leading-relaxed">{item.text}</p>
                        )}
                        {item.type === 'list' && (
                          <div className="flex items-start gap-3 ml-4">
                            <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-slate-700">{item.text}</p>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Subsections */}
                    {section.subsections.length > 0 && (
                      <div className="space-y-4 mt-6">
                        {section.subsections.map((subsection, subIdx) => (
                          <div key={subIdx} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-amber-500" />
                              {subsection.title}
                            </h3>
                            <div className="space-y-2">
                              {subsection.items.map((item, itemIdx) => {
                                const checkKey = `${sectionIndex}-${subIdx}-${itemIdx}`;
                                const isChecked = checkedItems[checkKey];
                                const itemText = typeof item === 'string' ? item : item.text;

                                return (
                                  <motion.button
                                    key={itemIdx}
                                    onClick={() => toggleCheckItem(sectionIndex, `${subIdx}-${itemIdx}`)}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all ${
                                      isChecked 
                                        ? 'bg-emerald-50 border-2 border-emerald-200' 
                                        : 'bg-white border-2 border-slate-200 hover:border-slate-300'
                                    }`}
                                  >
                                    <div className={`w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center ${
                                      isChecked 
                                        ? 'bg-emerald-500' 
                                        : 'border-2 border-slate-300'
                                    }`}>
                                      {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className={`text-left text-sm ${
                                      isChecked 
                                        ? 'text-slate-500 line-through' 
                                        : 'text-slate-700'
                                    }`}>
                                      {itemText}
                                    </span>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}