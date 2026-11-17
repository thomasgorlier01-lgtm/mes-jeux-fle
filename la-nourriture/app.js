const JEUX = [
      {
        titre: 'Le pique nique en famille',
        description: 'Écoute les mots, retrouve les objets et prépare les sandwichs de la famille.',
        categorie: 'Jeu 1',
        niveau: 'Débutant',
        emoji: '🥪',
        couleur: 'vest',
        bulle1: '🔊',
        bulle2: '✓',
        url: '../pique-nique-famille/?nourriture=1'
      },
      {
        titre: 'Au marché',
        description: 'Écoute les fruits, associe les mots aux cagettes et prépare dix paniers avec les bonnes quantités.',
        categorie: 'Jeu 2',
        niveau: 'Débutant',
        emoji: '🧺',
        couleur: 'vest',
        bulle1: '🍎',
        bulle2: '🔊',
        url: '../marche-fruits/?nourriture=1'
      },
      {
        titre: 'Au café',
        description: 'Écoute les huit boissons, puis sers les deux parents pendant cinq tournées.',
        categorie: 'Jeu 3',
        niveau: 'Débutant',
        emoji: '☕',
        couleur: 'vest',
        bulle1: '🥛',
        bulle2: '🔊',
        url: '../cafe-boissons/?nourriture=1'
      },
      {
        titre: 'A la cantine',
        description: 'Écoute la commande des enfants et prépare dix plateaux complets : un plat, un dessert et une boisson.',
        categorie: 'Jeu 4',
        niveau: 'Débutant',
        emoji: '🍽️',
        couleur: 'vest',
        bulle1: '🥦',
        bulle2: '🔊',
        url: '../cantine-menus/?nourriture=1'
      },
      {
        titre: 'A table',
        description: 'Lis la commande de Léo ou Lina et prépare son plateau : repas, desserts et boissons en trois niveaux.',
        categorie: 'Jeu 5',
        niveau: 'Débutant',
        emoji: '🍽️',
        couleur: 'vest',
        bulle1: '🥕',
        bulle2: '✓',
        url: '../atelier-repas/?nourriture=1'
      },
      {
        titre: 'Je compose ma salade',
        description: 'Reconnais les quantités puis compose ta salade : un peu de, beaucoup de, mais pas de.',
        categorie: 'Jeu 6',
        niveau: 'Débutant',
        emoji: '🥗',
        couleur: 'vest',
        bulle1: '🔊',
        bulle2: '✓',
        url: '../compose-salade/'
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
