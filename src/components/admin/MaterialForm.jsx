import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function MaterialForm({ material, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: material?.titulo || '',
    descricao: material?.descricao || '',
    link_conteudo: material?.link_conteudo || '',
    mes_referencia: material?.mes_referencia || '',
    data_publicacao: material?.data_publicacao || new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {material ? 'Editar Material' : 'Novo Material'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ex: Estratégias de Investimento para 2026"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descreva o conteúdo deste material"
              required
              className="mt-1 h-24"
            />
          </div>

          <div>
            <Label htmlFor="link_conteudo">Link do Conteúdo</Label>
            <Input
              id="link_conteudo"
              type="url"
              value={formData.link_conteudo}
              onChange={(e) => setFormData({ ...formData, link_conteudo: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="mt-1"
            />
            <p className="text-xs text-slate-500 mt-1">
              Link para PDF, vídeo ou outro recurso
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mes_referencia">Mês de Referência *</Label>
              <Input
                id="mes_referencia"
                type="month"
                value={formData.mes_referencia}
                onChange={(e) => setFormData({ ...formData, mes_referencia: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="data_publicacao">Data de Publicação *</Label>
              <Input
                id="data_publicacao"
                type="date"
                value={formData.data_publicacao}
                onChange={(e) => setFormData({ ...formData, data_publicacao: e.target.value })}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
              {material ? 'Salvar Alterações' : 'Criar Material'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}