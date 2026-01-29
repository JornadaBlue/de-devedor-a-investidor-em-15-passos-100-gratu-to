import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import MaterialForm from '../components/admin/MaterialForm';
import MaterialList from '../components/admin/MaterialList';

export default function AdminClube() {
  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return user;
    },
  });

  const { data: materials = [], isLoading } = useQuery({
    queryKey: ['conteudoClube'],
    queryFn: () => base44.entities.ConteudoClube.list('-data_publicacao'),
  });

  // Verificar se o usuário é admin
  if (user && user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-lg">
          <p className="text-slate-700 mb-4">Acesso restrito a administradores</p>
          <Link to={createPageUrl('Home')}>
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMaterial(null);
  };

  const handleSave = async (data) => {
    try {
      if (editingMaterial) {
        await base44.entities.ConteudoClube.update(editingMaterial.id, data);
      } else {
        await base44.entities.ConteudoClube.create(data);
      }
      queryClient.invalidateQueries({ queryKey: ['conteudoClube'] });
      handleCloseForm();
    } catch (error) {
      alert('Erro ao salvar: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este material?')) return;
    
    try {
      await base44.entities.ConteudoClube.delete(id);
      queryClient.invalidateQueries({ queryKey: ['conteudoClube'] });
    } catch (error) {
      alert('Erro ao excluir: ' + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to={createPageUrl('Home')}>
              <Button variant="ghost" size="sm" className="mb-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">
              Gerenciar Materiais do Clube
            </h1>
            <p className="text-slate-600 mt-1">
              Adicione e gerencie os conteúdos mensais do clube
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Material
          </Button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <MaterialForm
            material={editingMaterial}
            onSave={handleSave}
            onCancel={handleCloseForm}
          />
        )}

        {/* Materials List */}
        <MaterialList
          materials={materials}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}