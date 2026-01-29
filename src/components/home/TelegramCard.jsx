import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function TelegramCard() {
  const handleClick = () => {
    window.open('https://t.me/+hDh1ck2UXsE4YzU0', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 hover:shadow-lg transition-all border-2 border-cyan-200 h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0">
            <MessageCircle className="w-6 h-6 text-cyan-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Comunidade Telegram
            </h3>
            <p className="text-sm text-slate-500">Grupo exclusivo</p>
          </div>
          <ExternalLink className="w-5 h-5 text-slate-400 shrink-0" />
        </div>

        <p className="text-sm text-slate-600 mb-3">
          Participe da comunidade exclusiva no Telegram para trocar experiências e aprender com outros membros.
        </p>
        
        <span className="text-xs text-cyan-600 font-semibold">
          Clique para entrar no grupo →
        </span>
      </Card>
    </motion.div>
  );
}