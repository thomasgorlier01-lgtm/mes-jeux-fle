const JEUX = [
  {
    "titre": "Qui est-ce ? Les douleurs",
    "description": "Lis les trois douleurs et retrouve le bon personnage parmi les quinze portraits.",
    "categorie": "Le corps et les douleurs",
    "niveau": "Débutant",
    "emoji": "🩹",
    "couleur": "corp",
    "bulle1": "🤕",
    "bulle2": "✓",
    "url": "../qui-est-ce-douleurs/"
  },
  {
    "titre": "Corps de monstres",
    "description": "Retourne les cartes en classe ou écoute dix descriptions avec trois cœurs en autonomie.",
    "categorie": "Le corps, le visage et les accessoires",
    "niveau": "Débutant",
    "emoji": "👾",
    "couleur": "corp",
    "bulle1": "👥",
    "bulle2": "🔊",
    "url": "../qui-est-ce-monstres/"
  },
  {
    "titre": "L’atelier des visages",
    "description": "Écoute ou lis la description et crée le visage de Léo ou Lina : traits, couleurs et accessoires, en trois niveaux.",
    "categorie": "Le visage et les couleurs",
    "niveau": "Débutant",
    "emoji": "🙂",
    "couleur": "corp",
    "bulle1": "👀",
    "bulle2": "🎨",
    "url": "../atelier-visages/?visages=5"
  }
];
const games=document.getElementById('games'),player=document.getElementById('player'),frame=document.getElementById('frame'),playertitle=document.getElementById('playertitle'),extern=document.getElementById('extern');
function closeGame(){player.classList.remove('open');frame.removeAttribute('src');document.body.style.overflow='';}
function openGame(jeu){playertitle.textContent=jeu.titre;extern.href=jeu.url;frame.src=jeu.url;player.classList.add('open');document.body.style.overflow='hidden';history.pushState({game:true},'',location.pathname+location.search+'#jeu');}
document.getElementById('back').addEventListener('click',()=>{closeGame();history.replaceState(null,'',location.pathname+location.search);});
window.addEventListener('popstate',closeGame);
    function createCard(jeu) {
      const card = document.createElement('a');
      card.className = 'game'; card.href = jeu.url;
      if (!jeu.dossier) card.addEventListener('click', e=>{e.preventDefault();openGame(jeu);});
      // La navigation se fait dans la même fenêtre : pratique pour l'iPad.
      const art = document.createElement('div'); art.className = 'art ' + (jeu.couleur || 'corp');
      const ch = document.createElement('span'); ch.className = 'character'; ch.textContent = jeu.emoji || '🎯'; art.append(ch);
      for(const [i, e] of [jeu.bulle1,jeu.bulle2].entries()){
        if(e){const bubble=document.createElement('span');bubble.className='bubble '+(i===0?'one':'two');bubble.textContent=e;art.append(bubble)}
      }
      const details = document.createElement('div');details.className='details';
      const content = document.createElement('div');content.className='details-content';
      const tag = document.createElement('span');tag.className='tag';tag.textContent=jeu.categorie;
      const h = document.createElement('h3');h.textContent=jeu.titre;
      const p = document.createElement('p');p.textContent=jeu.description;
      const arrow = document.createElement('span');arrow.className='arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='→';
      content.append(tag,h,p);details.append(content,arrow);card.append(art,details);games.append(card);
    }

JEUX.forEach(createCard);
