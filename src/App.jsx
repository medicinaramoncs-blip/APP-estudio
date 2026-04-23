import React, { useState } from 'react';
import { BookOpen, Brain, Library, Home, Sparkles } from 'lucide-react';
import { pathologyTopics } from './data/content';
import EssayTrainer from './components/EssayTrainer';
import Flashcards from './components/Flashcards';
import ContentLibrary from './components/ContentLibrary';

export default function App() {
  console.log('[v0] App rendering, pathologyTopics:', pathologyTopics?.length);
  const [view, setView] = useState('home');

  const renderView = () => {
    switch(view) {
      case 'essay': return <EssayTrainer />;
      case 'flashcards': return <Flashcards />;
      case 'library': return <ContentLibrary />;
      default: return <HomeView onNavigate={setView} />;
    }
  };

  const topicCount = pathologyTopics.length;
  const essayCount = pathologyTopics.reduce((acc, t) => acc + t.essays.length, 0);
  const cardCount = pathologyTopics.reduce((acc, t) => acc + t.flashcards.length, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0a0a0f] to-[#0a0a0f]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
      
      <nav className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            Patología Hub
          </h1>
          <div className="flex gap-1 bg-white/5 p-1 rounded-2xl">
            <NavBtn icon={<Home />} label="Inicio" active={view === 'home'} onClick={() => setView('home')} />
            <NavBtn icon={<Brain />} label="Ensayo" active={view === 'essay'} onClick={() => setView('essay')} />
            <NavBtn icon={<Library />} label="Tarjetas" active={view === 'flashcards'} onClick={() => setView('flashcards')} />
            <NavBtn icon={<BookOpen />} label="Biblioteca" active={view === 'library'} onClick={() => setView('library')} />
          </div>
        </div>
      </nav>
      <main className="relative z-10 max-w-5xl mx-auto p-6">
        {renderView()}
      </main>
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/25' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {React.cloneElement(icon, { className: `w-4 h-4 ${active ? 'text-white' : ''}` })}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function HomeView({ onNavigate }) {
  const features = [
    { 
      title: "Entrenador de Ensayo", 
      desc: "Practica respuestas para exámenes escritos con feedback instantáneo", 
      icon: <Brain className="w-8 h-8" />, 
      onClick: () => onNavigate('essay'), 
      gradient: "from-rose-500 to-pink-600",
      shadow: "shadow-rose-500/25"
    },
    { 
      title: "Flashcards", 
      desc: "Minijuego de memorización con seguimiento de progreso", 
      icon: <Library className="w-8 h-8" />, 
      onClick: () => onNavigate('flashcards'), 
      gradient: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/25"
    },
    { 
      title: "Biblioteca", 
      desc: "Consulta todos los temas y conceptos del curso", 
      icon: <BookOpen className="w-8 h-8" />, 
      onClick: () => onNavigate('library'), 
      gradient: "from-sky-500 to-indigo-600",
      shadow: "shadow-sky-500/25"
    }
  ];

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 mb-6">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>Herramienta de estudio para Anatomía Patológica</span>
        </div>
        <h2 className="text-5xl font-bold text-white mb-4">
          Domina la <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Patología</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-xl mx-auto">
          Prepárate para tu examen con herramientas interactivas diseñadas para el aprendizaje efectivo
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <button 
            key={idx}
            onClick={feature.onClick}
            className="group p-8 bg-white/5 border border-white/10 rounded-3xl text-left transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:-translate-y-2"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform duration-300`}>
              <div className="text-white">{feature.icon}</div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-16 p-6 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-rose-900/30 border border-white/10 rounded-3xl">
          <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Contenido disponible</h3>
            <p className="text-slate-400">{topicCount} temas · {essayCount} ensayos · {cardCount} tarjetas</p>
          </div>
          <div className="flex -space-x-3">
            {pathologyTopics.map((topic, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 border-2 border-[#0a0a0f] flex items-center justify-center text-xs font-medium text-white" title={topic.title}>
                {topic.title[0]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
