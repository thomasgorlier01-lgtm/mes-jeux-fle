const JEUX = [
      {
        titre: 'Le pique nique en famille',
        description: 'Découvre les mots, prépare les sandwichs, puis commande à l’oral avec « Et toi ? ».',
        categorie: 'Jeu 1',
        niveau: 'Débutant',
        emoji: '🥪',
        couleur: 'vest',
        bulle1: '🔊',
        bulle2: '✓',
        url: '../pique-nique-famille/?et-toi=2'
      },
      {
        titre: 'Au marché',
        description: 'Découvre les fruits, prépare les paniers, puis fais tes propres achats à l’oral.',
        categorie: 'Jeu 2',
        niveau: 'Débutant',
        emoji: '🧺',
        couleur: 'vest',
        bulle1: '🍎',
        bulle2: '🔊',
        url: '../marche-fruits/?et-toi=2'
      },
      {
        titre: 'Au café',
        description: 'Découvre les boissons, sers les parents, puis choisis trois boissons pour les amis en terrasse.',
        categorie: 'Jeu 3',
        niveau: 'Débutant',
        emoji: '☕',
        couleur: 'vest',
        bulle1: '🥛',
        bulle2: '🔊',
        url: '../cafe-boissons/?et-toi=2'
      },
      {
        titre: 'A la cantine',
        description: 'Prépare les plateaux, puis choisis ton propre repas dans « Et toi ? », en classe.',
        categorie: 'Jeu 4',
        niveau: 'Débutant',
        emoji: '🍽️',
        couleur: 'vest',
        bulle1: '🥦',
        bulle2: '🔊',
        url: '../cantine-menus/?et-toi=2'
      },
      {
        titre: 'A table',
        description: 'Prépare les repas de Léo et Lina ou commande librement à l’oral avec « Et toi ? ».',
        categorie: 'Jeu 5',
        niveau: 'Débutant',
        emoji: '🍽️',
        couleur: 'vest',
        bulle1: '🥕',
        bulle2: '✓',
        url: '../atelier-repas/?et-toi=2'
      },
      {
        titre: 'Je compose ma salade',
        description: 'Reconnais les quantités, compose une salade, puis dis à ton camarade ce que tu veux.',
        categorie: 'Jeu 6',
        niveau: 'Débutant',
        emoji: '🥗',
        couleur: 'vest',
        bulle1: '🔊',
        bulle2: '✓',
        url: '../compose-salade/?et-toi=2'
      },
      {
        titre: 'Dans la cuisine',
        description: 'Glisse les objets ou place-les en deux clics. Travaille les positions avec 10 consignes au niveau 1 et 25 au niveau 2.',
        categorie: 'Jeu 7',
        niveau: 'Deux niveaux',
        emoji: '🍳',
        couleur: 'vest',
        bulle1: '🧺',
        bulle2: '🔊',
        url: '../la-cuisine/?cuisine=5'
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
