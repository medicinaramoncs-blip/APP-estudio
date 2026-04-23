# Patología Estudio Hub

App de estudio para Anatomía Patológica - Preparación para exámenes escritos.

## Para usar:

1. Descomprime el ZIP
2. Abre terminal en la carpeta
3. Ejecuta:
```bash
npm install
npm run dev
```
4. Abre http://localhost:5173

## Agregar contenido:

Edita `src/data/content.js` con el formato:

```javascript
export const pathologyTopics = [
  {
    id: "mi-tema",
    title: "1. Mi Tema",
    color: "blue",
    essays: [
      { id: 1, question: "Pregunta?", modelAnswer: "Respuesta modelo" }
    ],
    flashcards: [
      { term: "Término", definition: "Definición" }
    ],
    studyNotes: [],
    examPrompts: []
  }
];
```