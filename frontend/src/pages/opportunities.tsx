import Head from 'next/head'
import { useState } from 'react'
import Layout from '@/components/Layout'

interface Opportunity {
  id: string
  title: string
  organization: string
  description: string
  category: string
  skills: string[]
  commitment: string
  location: string
}

// Dados mockados para exemplo
const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Desenvolvedor Frontend Voluntário',
    organization: 'ONG Tech4Good',
    description: 'Procuramos um desenvolvedor frontend para ajudar no desenvolvimento do nosso site institucional.',
    category: 'Desenvolvimento',
    skills: ['React', 'TypeScript', 'CSS'],
    commitment: '10 horas/semana',
    location: 'Remoto'
  },
  {
    id: '2',
    title: 'Tradutor de Conteúdo',
    organization: 'Educação Digital',
    description: 'Precisamos de voluntários para traduzir conteúdo educacional para português.',
    category: 'Tradução',
    skills: ['Português', 'Inglês', 'Espanhol'],
    commitment: '5 horas/semana',
    location: 'Remoto'
  },
  {
    id: '3',
    title: 'Mentor de Programação',
    organization: 'CodeMentor',
    description: 'Procuramos mentores para ajudar iniciantes em programação.',
    category: 'Educação',
    skills: ['JavaScript', 'Python', 'Mentoria'],
    commitment: '8 horas/semana',
    location: 'Remoto'
  }
]

export default function Opportunities() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = ['Todos', 'Desenvolvimento', 'Tradução', 'Educação', 'Marketing', 'Design']

  const filteredOpportunities = mockOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todos' || 
      opportunity.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Layout>
      <Head>
        <title>Oportunidades - Link do Bem</title>
        <meta name="description" content="Encontre oportunidades de voluntariado digital" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Oportunidades de Voluntariado</h1>
          <p className="mt-2 text-gray-600">
            Encontre a oportunidade perfeita para fazer a diferença
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar oportunidades..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="input-field"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOpportunities.map(opportunity => (
            <div key={opportunity.id} className="card">
              <h3 className="text-xl font-semibold text-gray-900">{opportunity.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{opportunity.organization}</p>
              <p className="mt-4 text-gray-600">{opportunity.description}</p>
              <div className="mt-4">
                <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                  {opportunity.category}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Habilidades necessárias:</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {opportunity.skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>{opportunity.commitment}</span>
                <span>{opportunity.location}</span>
              </div>
              <div className="mt-6">
                <button className="btn-primary w-full">
                  Candidatar-se
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma oportunidade encontrada.</p>
          </div>
        )}
      </div>
    </Layout>
  )
} 