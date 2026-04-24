import React, { useState } from 'react';
import { pathologyTopics } from '../data/content';
import { ChevronDown, ChevronUp, ChevronRight, BookOpen, FileText, Layers, Search, BarChart3 } from 'lucide-react';

export default function ContentLibrary() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [expandedSection, setExpandedSection] = useState('essays');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnswer, setShowAnswer] = useState({});

  const hasTopics = pathologyTopics.length > 0;

  const topicColors = {
    'generalidades': 'from-blue-500 to-cyan-500',
    'adaptacion-celular': 'from-emerald-500 to-teal-500',
    'neoplasia': 'from-purple-500 to-violet-500',
    'trastornos-hemodinamicos': 'from-rose-500 to-red-500'
  };

  const getTopicColor = (id) => topicColors[id] || 'from-gray-500 to-gray-600';

  // Estadísticas totales
  const totalEssays = pathologyTopics.reduce((acc, t) => acc + (t.essays?.length || 0), 0);
  const totalFlashcards = pathologyTopics.reduce((acc, t) => acc + (t.flashcards?.length || 0), 0);

  // Filtrar contenido por búsqueda
  const filteredEssays = selectedTopic?.essays?.filter(e => 
    e.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.modelAnswer.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredFlashcards = selectedTopic?.flashcards?.filter(c => 
    c.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.definition.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const toggleAnswer = (id) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
        <BookOpen className="w-4 h-4" />
        <span>Biblioteca</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Contenido Completo</span>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <BarChart3 className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{pathologyTopics.length}</p>
          <p className="text-xs text-slate-400">Temas</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <FileText className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{totalEssays}</p>
          <p className="text-xs text-slate-400">Ensayos</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <Layers className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{totalFlashcards}</p>
          <p className="text-xs text-slate-400">Flashcards</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <BookOpen className="w-6 h-6 text-rose-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{totalEssays + totalFlashcards}</p>
          <p className="text-xs text-slate-400">Total Items</p>
        </div>
      </div>

      {!hasTopics ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Sin temas</h3>
          <p className="text-slate-400">Agrega topics en content.js</p>
        </div>
      ) : (
        <>
          {/* Selector de Temas con tarjetas */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h2 className="text-sm font-medium text-slate-400 mb-4">Seleccionar Tema</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {pathologyTopics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => { setSelectedTopic(topic); setSearchTerm(''); setShowAnswer({}); }}
                  className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                    selectedTopic?.id === topic.id
                      ? `bg-gradient-to-r ${getTopicColor(topic.id)} text-white shadow-lg border-transparent`
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <p className="font-semibold">{topic.title}</p>
                  <p className={`text-xs mt-1 ${selectedTopic?.id === topic.id ? 'text-white/80' : 'text-slate-500'}`}>
                    {topic.essays?.length || 0} ensayos · {topic.flashcards?.length || 0} tarjetas
                  </p>
                  {topic.description && (
                    <p className={`text-xs mt-2 line-clamp-2 ${selectedTopic?.id === topic.id ? 'text-white/70' : 'text-slate-500'}`}>
                      {topic.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {selectedTopic && (
            <>
              {/* Buscador */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder={`Buscar en ${selectedTopic.title}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
                />
              </div>

              {/* Sección de Ensayos */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'essays' ? '' : 'essays')}
                  className="w-full p-5 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${getTopicColor(selectedTopic.id)}`}>
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold text-white">Preguntas de Ensayo</span>
                      <p className="text-xs text-slate-400">
                        {searchTerm ? `${filteredEssays.length} resultados` : `${selectedTopic.essays?.length || 0} preguntas disponibles`}
                      </p>
                    </div>
                  </div>
                  {expandedSection === 'essays' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {expandedSection === 'essays' && (
                  <div className="p-5 space-y-4 border-t border-white/10">
                    {filteredEssays.length > 0 ? filteredEssays.map((essay, idx) => (
                      <div key={essay.id} className="bg-white/5 rounded-xl overflow-hidden">
                        <div className="p-4">
                          <p className="text-white font-medium">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r ${getTopicColor(selectedTopic.id)} text-xs font-bold mr-2`}>
                              {idx + 1}
                            </span>
                            {essay.question}
                          </p>
                          <button
                            onClick={() => toggleAnswer(essay.id)}
                            className="mt-3 text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                          >
                            {showAnswer[essay.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            {showAnswer[essay.id] ? 'Ocultar respuesta' : 'Ver respuesta modelo'}
                          </button>
                        </div>
                        {showAnswer[essay.id] && (
                          <div className="p-4 bg-emerald-500/10 border-t border-emerald-500/20">
                            <p className="text-xs text-emerald-400 font-semibold mb-2">RESPUESTA MODELO:</p>
                            <p className="text-slate-300 text-sm leading-relaxed">{essay.modelAnswer}</p>
                          </div>
                        )}
                      </div>
                    )) : (
                      <p className="text-slate-500 text-center py-4">
                        {searchTerm ? 'No se encontraron ensayos con ese término' : 'No hay ensayos en este tema'}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Sección de Flashcards */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'flashcards' ? '' : 'flashcards')}
                  className="w-full p-5 flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${getTopicColor(selectedTopic.id)}`}>
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold text-white">Flashcards / Términos</span>
                      <p className="text-xs text-slate-400">
                        {searchTerm ? `${filteredFlashcards.length} resultados` : `${selectedTopic.flashcards?.length || 0} tarjetas disponibles`}
                      </p>
                    </div>
                  </div>
                  {expandedSection === 'flashcards' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {expandedSection === 'flashcards' && (
                  <div className="p-5 grid md:grid-cols-2 gap-3 border-t border-white/10">
                    {filteredFlashcards.length > 0 ? filteredFlashcards.map((card, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5">
                        <p className={`text-transparent bg-clip-text bg-gradient-to-r ${getTopicColor(selectedTopic.id)} font-semibold`}>
                          {card.term}
                        </p>
                        <p className="text-slate-400 text-sm mt-2 leading-relaxed">{card.definition}</p>
                      </div>
                    )) : (
                      <p className="text-slate-500 text-center py-4 col-span-2">
                        {searchTerm ? 'No se encontraron flashcards con ese término' : 'No hay flashcards en este tema'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
