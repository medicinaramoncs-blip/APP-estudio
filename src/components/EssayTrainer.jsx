import React, { useState } from 'react';
import { pathologyTopics } from '../data/content';
import { ChevronRight, CheckCircle2, Lightbulb, RotateCcw, BookOpen, PenLine } from 'lucide-react';

export default function EssayTrainer() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentEssay, setCurrentEssay] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hasTopics = pathologyTopics.length > 0;
  const hasContent = selectedTopic?.essays?.length > 0;

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setCurrentEssay(topic.essays[0]);
    setUserAnswer('');
    setShowModel(false);
    setSubmitted(false);
  };

  const handleNext = () => {
    if (!selectedTopic || !currentEssay) return;
    const currentIndex = selectedTopic.essays.findIndex(e => e.id === currentEssay.id);
    const nextEssay = selectedTopic.essays[currentIndex + 1];
    if (nextEssay) {
      setCurrentEssay(nextEssay);
      setUserAnswer('');
      setShowModel(false);
      setSubmitted(false);
    } else {
      alert('¡Has completado todos los ensayos de este tema!');
    }
  };

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
        <span className="text-white">Entrenador de Ensayo</span>
      </div>

      {!hasTopics ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <PenLine className="w-12 h-12 text-slate-500 mx-auto mb-4" />
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
                  onClick={() => handleTopicChange(topic)}
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

          {!hasContent ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <PenLine className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Contenido en construcción</h3>
              <p className="text-slate-400">Agrega essays en content.js</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${getTopicColor(selectedTopic?.id)}`}>
                    <PenLine className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">{selectedTopic?.title}</span>
                    <div className="text-xs text-slate-500">Pregunta {selectedTopic.essays.indexOf(currentEssay) + 1}/{selectedTopic.essays.length}</div>
                  </div>
                </div>
                <button onClick={() => { setUserAnswer(''); setShowModel(false); setSubmitted(false); }} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">
                {currentEssay?.question}
              </h3>

              <textarea
                className="w-full h-56 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 focus:bg-white/10 outline-none resize-none transition-all"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Escribe tu respuesta de desarrollo aquí... (pista: incluye definición, mecanismos, clasificación y ejemplos)"
                disabled={submitted}
              />

              <div className="flex gap-3 mt-5">
                {!submitted ? (
                  <button
                    onClick={() => setSubmitted(true)}
                    disabled={!userAnswer.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-rose-500/25"
                  >
                    Entregar Respuesta
                  </button>
                ) : (
                  <button
                    onClick={() => { if (currentEssay) { setShowModel(true); setSubmitted(false); } }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Ver Respuesta Modelo
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  Siguiente <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {showModel && currentEssay && (
                <div className="mt-6 p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl">
                  <h4 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Respuesta Modelo
                  </h4>
                  <p className="text-slate-200 leading-relaxed">{currentEssay.modelAnswer}</p>
                </div>
              )}

              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-5">
                <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Tips para el examen escrito
                </h4>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-amber-400" /> Siempre incluye definición del concepto</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-amber-400" /> Explica los mecanismos fisiopatológicos</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-amber-400" /> Da ejemplos clínicos relevantes</li>
                  <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-amber-400" /> Usa clasificación cuando exista</li>
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}