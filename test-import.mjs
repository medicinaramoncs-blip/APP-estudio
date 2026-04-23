import { pathologyTopics } from './src/data/content.js';
console.log('[v0] Topics loaded:', pathologyTopics.length);
pathologyTopics.forEach(t => console.log('[v0] Topic:', t.id, t.essays.length, 'essays'));
