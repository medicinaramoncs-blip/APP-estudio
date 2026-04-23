import React, { useState } from 'react';
import { pathologyTopics } from '../data/content';
import { RotateCcw, Check, ChevronLeft, ChevronRight, Trophy, Flame, ChevronRight as ChevronRightIcon } from 'lucide-react';

export default function Flashcards() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState(new Set());
  const [showStats, setShowStats] = useState(false);

  const cards = selectedTopic?.flashcards || [];
  const currentCard = cards[currentIndex];
  const hasTopics = pathologyTopics.length > 0;
  const hasContent = cards.length > 0;

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const handleMarkKnown = () => {
    if (currentCard) {
      setKnownCards(new Set([...knownCards, currentCard.term]));
      handleNext();
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setKnownCards(new Set());
    setShowStats(false);
  };

  const progress = hasContent ? ((currentIndex + 1) / cards.length) * 100 : 0;
  const knownCount = knownCards.size;
  const streak = hasContent ? Math.min(knownCount, cards.length) : 0;

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

  const getTopicColor = (id) => topicColors[id] || 'from-gray-500 to-gray-600';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
        <Trophy className="w-4 h-4" />
        <span>Minijuego</span>
        <ChevronRightIcon className="w-4 h-4" />
        <span className="text-white">Flashcards</span>
      </div>

      {!hasTopics ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <Trophy className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Sin temas</h3>
          <p className="text-slate-400">Agrega topics en.content.js</p>
        </div>
      ) : (
        <>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-slate-400">Seleccionar Tema</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-white flex items-center gap-1 text-sm">
                <RotateCcw className="w-4 h-4" /> Reiniciar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {pathologyTopics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => { setSelectedTopic(topic); setCurrentIndex(0); setFlipped(false); setKnownCards(new Set()); }}
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
              <Trophy className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Contenido en construcción</h3>
              <p className="text-slate-400">Agrega flashcards en.content.js</p>
            </div>
          ) : (
            <>
              <div className="relative">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-400">Tarjeta {currentIndex + 1} de {cards.length}</span>
                  <div className="flex items-center gap-4">
                    {streak > 0 && (
                      <div className="flex items-center gap-1 text-orange-400">
                        <Flame className="w-4 h-4" />
                        <span className="text-sm font-medium">{streak}</span>
                      </div>
                    )}
                    <button onClick={() => setShowStats(!showStats)} className="text-sm text-slate-400 hover:text-white flex items-center gap-1">
                      <Trophy className="w-4 h-4" /> {knownCount}/{cards.length}
                    </button>
                  </div>
                </div>

                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
                  <div 
                    className={`h-full bg-gradient-to-r ${getTopicColor(selectedTopic?.id)} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div 
                  className="cursor-pointer"
                  onClick={() => setFlipped(!flipped)}
                >
                  <div className={`relative min-h-[280px] rounded-3xl p-8 flex items-center justify-center border transition-all duration-500 backdrop-blur-sm ${
                    flipped 
                      ? `bg-gradient-to-br ${getTopicColor(selectedTopic?.id)}/20 border-purple-500/50` 
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <div className="absolute top-4 right-4 text-slate-500 text-xs">Toca para voltear</div>
                    
                    {!flipped ? (
                      <div className="text-center">
                        <p className="text-3xl font-bold text-white">{currentCard?.term}</p>
                        <p className="text-slate-500 mt-4 text-sm">Toca la tarjeta para ver la definición</p>
                      </div>
                    ) : (
                      <div className="text-center max-w-md">
                        <p className="text-lg font-semibold text-white mb-3">{currentCard?.term}</p>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-4" />
                        <p className="text-slate-200 leading-relaxed">{currentCard?.definition}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <button onClick={handlePrev} disabled={currentIndex === 0} className="p-3 bg-white/5 rounded-xl text-white disabled:opacity-30 hover:bg-white/10 transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={handleMarkKnown} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2">
                    <Check className="w-5 h-5" /> ¡La domino!
                  </button>
                  <button onClick={handleNext} disabled={currentIndex === cards.length - 1} className="p-3 bg-white/5 rounded-xl text-white disabled:opacity-30 hover:bg-white/10 transition-colors">
                    <ChevronRightIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {showStats && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" /> Progreso en {selectedTopic?.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cards.map((card, idx) => (
                      <span 
                        key={idx} 
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          knownCards.has(card.term) 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-white/5 text-slate-400 border border-white/10'
                        }`}
                      >
                        {knownCards.has(card.term) && <Check className="w-3 h-3 inline mr-1" />}
                        {card.term}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}