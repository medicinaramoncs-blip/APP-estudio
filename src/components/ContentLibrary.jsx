import React, { useState } from 'react';
import { pathologyTopics } from '../data/content';
import { ChevronDown, ChevronUp, ChevronRight, BookOpen, FileText, Layers } from 'lucide-react';

export default function ContentLibrary() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [expandedSection, setExpandedSection] = useState('essays');

  const hasTopics = pathologyTopics.length > 0;

  const getTopicColor = (id) => topicColors[id] || 'from-gray-500 to-gray-600';

  const topicColors = {
    generalidades: 'from-blue-500 to-cyan-500',
    'tecnicas-histologicas': 'from-cyan-500 to-sky-500',
    'citologia': 'from-teal-500 to-emerald-500',
    'adaptacion-celular': 'from-emerald-500 to-teal-500',
    'lesion-muerte-celular': 'from-lime-500 to-green-500',
    inflamacion: 'from-rose-500 to-red-500',
    reparacion: 'from-orange-500 to-amber-500',
    'hemodinamicos': 'from-amber-500 to-yellow-500',
    neoplasias: 'from-purple-500 to-violet-500',
    autopsia: 'from-slate-500 to-zinc-500'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
        <BookOpen className="w-4 h-4" />
        <span>Biblioteca</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Contenido</span>
      </div>

      {!hasTopics ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Sin temas</h3>
          <p className="text-slate-400">Agrega topics en content.js</p>
        </div>
      ) : (
        <>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h2 className="text-sm font-medium text-slate-400 mb-3">Seleccionar Tema</h2>
            <div className="flex flex-wrap gap-2">
              {pathologyTopics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedTopic?.id === topic.id
                      ? `bg-gradient-to-r ${getTopicColor(topic.id)} text-white shadow-lg`
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {topic.title}
                </button>
              ))}
            </div>
          </div>

          {selectedTopic && (
            <>
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
                      <p className="text-xs text-slate-400">{selectedTopic.essays?.length || 0} preguntas disponibles</p>
                    </div>
                  </div>
                  {expandedSection === 'essays' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {expandedSection === 'essays' && (
                  <div className="p-5 space-y-3 border-t border-white/10">
                    {selectedTopic.essays?.length > 0 ? selectedTopic.essays.map((essay, idx) => (
                      <div key={essay.id} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <p className="text-slate-300 text-sm"><span className="text-purple-400 font-semibold">{idx + 1}.</span> {essay.question}</p>
                      </div>
                    )) : <p className="text-slate-500 text-center py-4">No hay essays en este tema</p>}
                  </div>
                )}
              </div>

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
                      <span className="font-semibold text-white">Flashcards</span>
                      <p className="text-xs text-slate-400">{selectedTopic.flashcards?.length || 0} tarjetas disponibles</p>
                    </div>
                  </div>
                  {expandedSection === 'flashcards' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                {expandedSection === 'flashcards' && (
                  <div className="p-5 grid md:grid-cols-2 gap-3 border-t border-white/10">
                    {selectedTopic.flashcards?.length > 0 ? selectedTopic.flashcards.map((card, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-xl">
                        <p className="text-white font-medium">{card.term}</p>
                        <p className="text-slate-400 text-sm mt-1">{card.definition}</p>
                      </div>
                    )) : <p className="text-slate-500 text-center py-4">No hay flashcards en este tema</p>}
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