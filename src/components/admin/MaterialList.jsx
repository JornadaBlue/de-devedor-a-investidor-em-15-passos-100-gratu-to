import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, ExternalLink, Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function MaterialList({ materials, onEdit, onDelete }) {
  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500 text-lg">Nenhum material cadastrado ainda</p>
        <p className="text-slate-400 text-sm">
          Clique em "Novo Material" para adicionar o primeiro conteúdo
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {materials.map((material, index) => (
        <motion.div
          key={material.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between pb-3">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{material.titulo}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(material.data_publicacao), 'dd MMM yyyy', { locale: ptBR })}
                  </span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                    {format(new Date(material.mes_referencia + '-01'), 'MMMM yyyy', { locale: ptBR })}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(material)}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(material.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-3">{material.descricao}</p>
              {material.link_conteudo && (
                <a
                  href={material.link_conteudo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700"
                >
                  <ExternalLink className="w-4 h-4" />
                  Acessar conteúdo
                </a>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}