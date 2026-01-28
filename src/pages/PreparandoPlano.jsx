import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { Target, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function PreparandoPlano() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('nome') || 'Usuário';
  const profileId = urlParams.get('id');
  const profile = urlParams.get('perfil');

  useEffect(() => {
    // Animar a barra de progresso
    const duration = 3000; // 3 segundos
    const steps = 60;
    const interval = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        // Redirecionar para a página de resultado
        navigate(createPageUrl('Resultado') + `?id=${profileId}&perfil=${profile}&nome=${encodeURIComponent(userName)}`);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [navigate, userName, profileId, profile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl mb-6 shadow-xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Target className="w-10 h-10 text-amber-500" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {userName}, estamos preparando
          </h1>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <p className="text-lg text-amber-400 font-medium">
              seu plano personalizado
            </p>
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full px-4"
        >
          <Progress value={progress} className="h-2 bg-slate-700" />
          <p className="text-slate-400 text-sm mt-3">
            Analisando suas respostas e montando sua estratégia...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}