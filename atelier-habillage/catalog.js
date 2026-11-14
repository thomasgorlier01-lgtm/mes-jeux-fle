// Illustrations peintes validées et accessoires.
export default {
  "palette": {
    "rouge": "#BF635B",
    "vert": "#7E9B68",
    "violet": "#8E78AB",
    "rose": "#D291AD",
    "jaune": "#D8BB69",
    "marron": "#8C6853",
    "bleu": "#638EB5"
  },
  "silhouettes": [
    {
      "id": "garcon",
      "nom": "Garcon",
      "image": "assets/silhouettes/garcon.png",
      "dimensions": [
        1280,
        1920
      ],
      "corps": "corps_peint_v3"
    },
    {
      "id": "fille",
      "nom": "Fille",
      "image": "assets/silhouettes/fille.png",
      "dimensions": [
        1280,
        1920
      ],
      "corps": "corps_peint_v3"
    }
  ],
  "categories": [
    {
      "id": "tshirt",
      "nom": "T-shirt",
      "emplacement": "haut",
      "z": 30,
      "preview": "assets/vignettes/apercu_tshirt.webp?fit=2",
      "previewColor": "#D8BFA2"
    },
    {
      "id": "pull",
      "nom": "Pull",
      "emplacement": "haut",
      "z": 30,
      "preview": "assets/vignettes/apercu_pull_v3.webp",
      "previewColor": "#B5CCB3"
    },
    {
      "id": "chemise",
      "nom": "Chemise",
      "emplacement": "haut",
      "z": 30,
      "preview": "assets/vignettes/apercu_chemise_v3.webp",
      "previewColor": "#B4C9DB"
    },
    {
      "id": "veste",
      "nom": "Veste ouverte",
      "emplacement": "veste",
      "z": 60,
      "preview": "assets/vignettes/apercu_veste_v3.webp",
      "previewColor": "#D6B5C6"
    },
    {
      "id": "pantalon",
      "nom": "Pantalon",
      "emplacement": "bas",
      "z": 20,
      "preview": "assets/vignettes/apercu_pantalon.webp",
      "previewColor": "#C0B8D4"
    },
    {
      "id": "short",
      "nom": "Short",
      "emplacement": "bas",
      "z": 20,
      "preview": "assets/vignettes/apercu_short.webp",
      "previewColor": "#DCCC9F"
    },
    {
      "id": "jupe",
      "nom": "Jupe",
      "emplacement": "bas",
      "z": 20,
      "preview": "assets/vignettes/apercu_jupe.webp",
      "previewColor": "#B2CEC6"
    },
    {
      "id": "robe",
      "nom": "Robe",
      "emplacement": "robe",
      "z": 35,
      "preview": "assets/vignettes/apercu_robe.webp?fit=2",
      "previewColor": "#DDB5AB"
    },
    {
      "id": "chaussettes",
      "nom": "Chaussettes",
      "emplacement": "chaussettes",
      "z": 10,
      "preview": "assets/vignettes/apercu_chaussettes.webp",
      "previewColor": "#C2D3E0"
    },
    {
      "id": "baskets",
      "nom": "Baskets",
      "emplacement": "chaussures",
      "z": 50,
      "preview": "assets/vignettes/apercu_baskets.webp",
      "previewColor": "#C7B5CF"
    },
    {
      "id": "sandales",
      "nom": "Sandales",
      "emplacement": "chaussures",
      "z": 50,
      "preview": "assets/vignettes/apercu_sandales.webp",
      "previewColor": "#D7C9AB"
    },
    {
      "id": "bottes",
      "nom": "Bottes",
      "emplacement": "chaussures",
      "z": 50,
      "preview": "assets/vignettes/apercu_bottes.webp",
      "previewColor": "#BAC8AD"
    },
    {
      "id": "casquette",
      "nom": "Casquette",
      "emplacement": "coiffure",
      "z": 70,
      "preview": "assets/vignettes/apercu_casquette.webp",
      "previewColor": "#AFCBCD"
    },
    {
      "id": "chapeau_classique",
      "nom": "Chapeau",
      "emplacement": "coiffure",
      "z": 70,
      "preview": "assets/vignettes/apercu_chapeau_classique.webp",
      "previewColor": "#B8BDDA"
    },
    {
      "id": "bonnet",
      "nom": "Bonnet",
      "emplacement": "coiffure",
      "z": 70,
      "preview": "assets/vignettes/apercu_bonnet.webp",
      "previewColor": "#D3B6D3"
    },
    {
      "id": "lunettes",
      "nom": "Lunettes",
      "emplacement": "lunettes",
      "z": 80,
      "preview": "assets/vignettes/apercu_lunettes.webp",
      "previewColor": "#B3CBC0"
    },
    {
      "id": "gants",
      "nom": "Gants",
      "emplacement": "gants",
      "z": 65,
      "preview": "assets/vignettes/apercu_gants.webp",
      "previewColor": "#D6BAAD"
    }
  ],
  "elements": [
    {
      "id": "tshirt_rouge",
      "categorie": "tshirt",
      "nom": "T-shirt",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/tshirt_rouge.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/tshirt_rouge.webp?fit=2"
    },
    {
      "id": "tshirt_vert",
      "categorie": "tshirt",
      "nom": "T-shirt",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/tshirt_vert.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/tshirt_vert.webp?fit=2"
    },
    {
      "id": "tshirt_violet",
      "categorie": "tshirt",
      "nom": "T-shirt",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/tshirt_violet.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/tshirt_violet.webp?fit=2"
    },
    {
      "id": "tshirt_rose",
      "categorie": "tshirt",
      "nom": "T-shirt",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/tshirt_rose.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/tshirt_rose.webp?fit=2"
    },
    {
      "id": "tshirt_jaune",
      "categorie": "tshirt",
      "nom": "T-shirt",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/tshirt_jaune.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/tshirt_jaune.webp?fit=2"
    },
    {
      "id": "tshirt_marron",
      "categorie": "tshirt",
      "nom": "T-shirt",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/tshirt_marron.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/tshirt_marron.webp?fit=2"
    },
    {
      "id": "tshirt_bleu",
      "categorie": "tshirt",
      "nom": "T-shirt",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/tshirt_bleu.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/tshirt_bleu.webp?fit=2"
    },
    {
      "id": "pull_rouge",
      "categorie": "pull",
      "nom": "Pull",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/pull_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pull_rouge.webp"
    },
    {
      "id": "pull_vert",
      "categorie": "pull",
      "nom": "Pull",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/pull_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pull_vert.webp"
    },
    {
      "id": "pull_violet",
      "categorie": "pull",
      "nom": "Pull",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/pull_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pull_violet.webp"
    },
    {
      "id": "pull_rose",
      "categorie": "pull",
      "nom": "Pull",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/pull_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pull_rose.webp"
    },
    {
      "id": "pull_jaune",
      "categorie": "pull",
      "nom": "Pull",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/pull_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pull_jaune.webp"
    },
    {
      "id": "pull_marron",
      "categorie": "pull",
      "nom": "Pull",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/pull_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pull_marron.webp"
    },
    {
      "id": "pull_bleu",
      "categorie": "pull",
      "nom": "Pull",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/pull_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pull_bleu.webp"
    },
    {
      "id": "chemise_rouge",
      "categorie": "chemise",
      "nom": "Chemise",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/chemise_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chemise_rouge.webp"
    },
    {
      "id": "chemise_vert",
      "categorie": "chemise",
      "nom": "Chemise",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/chemise_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chemise_vert.webp"
    },
    {
      "id": "chemise_violet",
      "categorie": "chemise",
      "nom": "Chemise",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/chemise_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chemise_violet.webp"
    },
    {
      "id": "chemise_rose",
      "categorie": "chemise",
      "nom": "Chemise",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/chemise_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chemise_rose.webp"
    },
    {
      "id": "chemise_jaune",
      "categorie": "chemise",
      "nom": "Chemise",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/chemise_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chemise_jaune.webp"
    },
    {
      "id": "chemise_marron",
      "categorie": "chemise",
      "nom": "Chemise",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/chemise_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chemise_marron.webp"
    },
    {
      "id": "chemise_bleu",
      "categorie": "chemise",
      "nom": "Chemise",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "haut",
      "z": 30,
      "image": "assets/vetements/chemise_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chemise_bleu.webp"
    },
    {
      "id": "veste_rouge",
      "categorie": "veste",
      "nom": "Veste ouverte",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "veste",
      "z": 60,
      "image": "assets/vetements/veste_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/veste_rouge.webp"
    },
    {
      "id": "veste_vert",
      "categorie": "veste",
      "nom": "Veste ouverte",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "veste",
      "z": 60,
      "image": "assets/vetements/veste_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/veste_vert.webp"
    },
    {
      "id": "veste_violet",
      "categorie": "veste",
      "nom": "Veste ouverte",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "veste",
      "z": 60,
      "image": "assets/vetements/veste_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/veste_violet.webp"
    },
    {
      "id": "veste_rose",
      "categorie": "veste",
      "nom": "Veste ouverte",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "veste",
      "z": 60,
      "image": "assets/vetements/veste_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/veste_rose.webp"
    },
    {
      "id": "veste_jaune",
      "categorie": "veste",
      "nom": "Veste ouverte",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "veste",
      "z": 60,
      "image": "assets/vetements/veste_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/veste_jaune.webp"
    },
    {
      "id": "veste_marron",
      "categorie": "veste",
      "nom": "Veste ouverte",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "veste",
      "z": 60,
      "image": "assets/vetements/veste_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/veste_marron.webp"
    },
    {
      "id": "veste_bleu",
      "categorie": "veste",
      "nom": "Veste ouverte",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "veste",
      "z": 60,
      "image": "assets/vetements/veste_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/veste_bleu.webp"
    },
    {
      "id": "pantalon_rouge",
      "categorie": "pantalon",
      "nom": "Pantalon",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/pantalon_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pantalon_rouge.webp"
    },
    {
      "id": "pantalon_vert",
      "categorie": "pantalon",
      "nom": "Pantalon",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/pantalon_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pantalon_vert.webp"
    },
    {
      "id": "pantalon_violet",
      "categorie": "pantalon",
      "nom": "Pantalon",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/pantalon_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pantalon_violet.webp"
    },
    {
      "id": "pantalon_rose",
      "categorie": "pantalon",
      "nom": "Pantalon",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/pantalon_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pantalon_rose.webp"
    },
    {
      "id": "pantalon_jaune",
      "categorie": "pantalon",
      "nom": "Pantalon",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/pantalon_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pantalon_jaune.webp"
    },
    {
      "id": "pantalon_marron",
      "categorie": "pantalon",
      "nom": "Pantalon",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/pantalon_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pantalon_marron.webp"
    },
    {
      "id": "pantalon_bleu",
      "categorie": "pantalon",
      "nom": "Pantalon",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/pantalon_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/pantalon_bleu.webp"
    },
    {
      "id": "short_rouge",
      "categorie": "short",
      "nom": "Short",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/short_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/short_rouge.webp"
    },
    {
      "id": "short_vert",
      "categorie": "short",
      "nom": "Short",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/short_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/short_vert.webp"
    },
    {
      "id": "short_violet",
      "categorie": "short",
      "nom": "Short",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/short_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/short_violet.webp"
    },
    {
      "id": "short_rose",
      "categorie": "short",
      "nom": "Short",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/short_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/short_rose.webp"
    },
    {
      "id": "short_jaune",
      "categorie": "short",
      "nom": "Short",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/short_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/short_jaune.webp"
    },
    {
      "id": "short_marron",
      "categorie": "short",
      "nom": "Short",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/short_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/short_marron.webp"
    },
    {
      "id": "short_bleu",
      "categorie": "short",
      "nom": "Short",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/short_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/short_bleu.webp"
    },
    {
      "id": "jupe_rouge",
      "categorie": "jupe",
      "nom": "Jupe",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/jupe_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/jupe_rouge.webp"
    },
    {
      "id": "jupe_vert",
      "categorie": "jupe",
      "nom": "Jupe",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/jupe_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/jupe_vert.webp"
    },
    {
      "id": "jupe_violet",
      "categorie": "jupe",
      "nom": "Jupe",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/jupe_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/jupe_violet.webp"
    },
    {
      "id": "jupe_rose",
      "categorie": "jupe",
      "nom": "Jupe",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/jupe_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/jupe_rose.webp"
    },
    {
      "id": "jupe_jaune",
      "categorie": "jupe",
      "nom": "Jupe",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/jupe_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/jupe_jaune.webp"
    },
    {
      "id": "jupe_marron",
      "categorie": "jupe",
      "nom": "Jupe",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/jupe_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/jupe_marron.webp"
    },
    {
      "id": "jupe_bleu",
      "categorie": "jupe",
      "nom": "Jupe",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "bas",
      "z": 20,
      "image": "assets/vetements/jupe_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/jupe_bleu.webp"
    },
    {
      "id": "robe_rouge",
      "categorie": "robe",
      "nom": "Robe",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "robe",
      "z": 35,
      "image": "assets/vetements/robe_rouge.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/robe_rouge.webp?fit=2"
    },
    {
      "id": "robe_vert",
      "categorie": "robe",
      "nom": "Robe",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "robe",
      "z": 35,
      "image": "assets/vetements/robe_vert.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/robe_vert.webp?fit=2"
    },
    {
      "id": "robe_violet",
      "categorie": "robe",
      "nom": "Robe",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "robe",
      "z": 35,
      "image": "assets/vetements/robe_violet.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/robe_violet.webp?fit=2"
    },
    {
      "id": "robe_rose",
      "categorie": "robe",
      "nom": "Robe",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "robe",
      "z": 35,
      "image": "assets/vetements/robe_rose.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/robe_rose.webp?fit=2"
    },
    {
      "id": "robe_jaune",
      "categorie": "robe",
      "nom": "Robe",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "robe",
      "z": 35,
      "image": "assets/vetements/robe_jaune.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/robe_jaune.webp?fit=2"
    },
    {
      "id": "robe_marron",
      "categorie": "robe",
      "nom": "Robe",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "robe",
      "z": 35,
      "image": "assets/vetements/robe_marron.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/robe_marron.webp?fit=2"
    },
    {
      "id": "robe_bleu",
      "categorie": "robe",
      "nom": "Robe",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "robe",
      "z": 35,
      "image": "assets/vetements/robe_bleu.png?fit=2",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/robe_bleu.webp?fit=2"
    },
    {
      "id": "chaussettes_rouge",
      "categorie": "chaussettes",
      "nom": "Chaussettes",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "chaussettes",
      "z": 10,
      "image": "assets/vetements/chaussettes_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chaussettes_rouge.webp"
    },
    {
      "id": "chaussettes_vert",
      "categorie": "chaussettes",
      "nom": "Chaussettes",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "chaussettes",
      "z": 10,
      "image": "assets/vetements/chaussettes_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chaussettes_vert.webp"
    },
    {
      "id": "chaussettes_violet",
      "categorie": "chaussettes",
      "nom": "Chaussettes",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "chaussettes",
      "z": 10,
      "image": "assets/vetements/chaussettes_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chaussettes_violet.webp"
    },
    {
      "id": "chaussettes_rose",
      "categorie": "chaussettes",
      "nom": "Chaussettes",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "chaussettes",
      "z": 10,
      "image": "assets/vetements/chaussettes_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chaussettes_rose.webp"
    },
    {
      "id": "chaussettes_jaune",
      "categorie": "chaussettes",
      "nom": "Chaussettes",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "chaussettes",
      "z": 10,
      "image": "assets/vetements/chaussettes_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chaussettes_jaune.webp"
    },
    {
      "id": "chaussettes_marron",
      "categorie": "chaussettes",
      "nom": "Chaussettes",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "chaussettes",
      "z": 10,
      "image": "assets/vetements/chaussettes_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chaussettes_marron.webp"
    },
    {
      "id": "chaussettes_bleu",
      "categorie": "chaussettes",
      "nom": "Chaussettes",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "chaussettes",
      "z": 10,
      "image": "assets/vetements/chaussettes_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chaussettes_bleu.webp"
    },
    {
      "id": "baskets_rouge",
      "categorie": "baskets",
      "nom": "Baskets",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/baskets_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/baskets_rouge.webp"
    },
    {
      "id": "baskets_vert",
      "categorie": "baskets",
      "nom": "Baskets",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/baskets_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/baskets_vert.webp"
    },
    {
      "id": "baskets_violet",
      "categorie": "baskets",
      "nom": "Baskets",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/baskets_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/baskets_violet.webp"
    },
    {
      "id": "baskets_rose",
      "categorie": "baskets",
      "nom": "Baskets",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/baskets_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/baskets_rose.webp"
    },
    {
      "id": "baskets_jaune",
      "categorie": "baskets",
      "nom": "Baskets",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/baskets_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/baskets_jaune.webp"
    },
    {
      "id": "baskets_marron",
      "categorie": "baskets",
      "nom": "Baskets",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/baskets_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/baskets_marron.webp"
    },
    {
      "id": "baskets_bleu",
      "categorie": "baskets",
      "nom": "Baskets",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/baskets_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/baskets_bleu.webp"
    },
    {
      "id": "sandales_rouge",
      "categorie": "sandales",
      "nom": "Sandales",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/sandales_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/sandales_rouge.webp"
    },
    {
      "id": "sandales_vert",
      "categorie": "sandales",
      "nom": "Sandales",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/sandales_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/sandales_vert.webp"
    },
    {
      "id": "sandales_violet",
      "categorie": "sandales",
      "nom": "Sandales",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/sandales_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/sandales_violet.webp"
    },
    {
      "id": "sandales_rose",
      "categorie": "sandales",
      "nom": "Sandales",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/sandales_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/sandales_rose.webp"
    },
    {
      "id": "sandales_jaune",
      "categorie": "sandales",
      "nom": "Sandales",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/sandales_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/sandales_jaune.webp"
    },
    {
      "id": "sandales_marron",
      "categorie": "sandales",
      "nom": "Sandales",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/sandales_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/sandales_marron.webp"
    },
    {
      "id": "sandales_bleu",
      "categorie": "sandales",
      "nom": "Sandales",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/sandales_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/sandales_bleu.webp"
    },
    {
      "id": "bottes_rouge",
      "categorie": "bottes",
      "nom": "Bottes",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/bottes_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bottes_rouge.webp"
    },
    {
      "id": "bottes_vert",
      "categorie": "bottes",
      "nom": "Bottes",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/bottes_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bottes_vert.webp"
    },
    {
      "id": "bottes_violet",
      "categorie": "bottes",
      "nom": "Bottes",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/bottes_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bottes_violet.webp"
    },
    {
      "id": "bottes_rose",
      "categorie": "bottes",
      "nom": "Bottes",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/bottes_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bottes_rose.webp"
    },
    {
      "id": "bottes_jaune",
      "categorie": "bottes",
      "nom": "Bottes",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/bottes_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bottes_jaune.webp"
    },
    {
      "id": "bottes_marron",
      "categorie": "bottes",
      "nom": "Bottes",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/bottes_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bottes_marron.webp"
    },
    {
      "id": "bottes_bleu",
      "categorie": "bottes",
      "nom": "Bottes",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "chaussures",
      "z": 50,
      "image": "assets/vetements/bottes_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bottes_bleu.webp"
    },
    {
      "id": "casquette_rouge",
      "categorie": "casquette",
      "nom": "Casquette",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/casquette_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/casquette_rouge.webp"
    },
    {
      "id": "casquette_vert",
      "categorie": "casquette",
      "nom": "Casquette",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/casquette_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/casquette_vert.webp"
    },
    {
      "id": "casquette_violet",
      "categorie": "casquette",
      "nom": "Casquette",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/casquette_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/casquette_violet.webp"
    },
    {
      "id": "casquette_rose",
      "categorie": "casquette",
      "nom": "Casquette",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/casquette_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/casquette_rose.webp"
    },
    {
      "id": "casquette_jaune",
      "categorie": "casquette",
      "nom": "Casquette",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/casquette_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/casquette_jaune.webp"
    },
    {
      "id": "casquette_marron",
      "categorie": "casquette",
      "nom": "Casquette",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/casquette_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/casquette_marron.webp"
    },
    {
      "id": "casquette_bleu",
      "categorie": "casquette",
      "nom": "Casquette",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/casquette_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/casquette_bleu.webp"
    },
    {
      "id": "chapeau_classique_rouge",
      "categorie": "chapeau_classique",
      "nom": "Chapeau",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/chapeau_classique_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chapeau_classique_rouge.webp"
    },
    {
      "id": "chapeau_classique_vert",
      "categorie": "chapeau_classique",
      "nom": "Chapeau",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/chapeau_classique_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chapeau_classique_vert.webp"
    },
    {
      "id": "chapeau_classique_violet",
      "categorie": "chapeau_classique",
      "nom": "Chapeau",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/chapeau_classique_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chapeau_classique_violet.webp"
    },
    {
      "id": "chapeau_classique_rose",
      "categorie": "chapeau_classique",
      "nom": "Chapeau",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/chapeau_classique_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chapeau_classique_rose.webp"
    },
    {
      "id": "chapeau_classique_jaune",
      "categorie": "chapeau_classique",
      "nom": "Chapeau",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/chapeau_classique_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chapeau_classique_jaune.webp"
    },
    {
      "id": "chapeau_classique_marron",
      "categorie": "chapeau_classique",
      "nom": "Chapeau",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/chapeau_classique_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chapeau_classique_marron.webp"
    },
    {
      "id": "chapeau_classique_bleu",
      "categorie": "chapeau_classique",
      "nom": "Chapeau",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/chapeau_classique_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/chapeau_classique_bleu.webp"
    },
    {
      "id": "bonnet_rouge",
      "categorie": "bonnet",
      "nom": "Bonnet",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/bonnet_rouge.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bonnet_rouge.webp"
    },
    {
      "id": "bonnet_vert",
      "categorie": "bonnet",
      "nom": "Bonnet",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/bonnet_vert.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bonnet_vert.webp"
    },
    {
      "id": "bonnet_violet",
      "categorie": "bonnet",
      "nom": "Bonnet",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/bonnet_violet.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bonnet_violet.webp"
    },
    {
      "id": "bonnet_rose",
      "categorie": "bonnet",
      "nom": "Bonnet",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/bonnet_rose.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bonnet_rose.webp"
    },
    {
      "id": "bonnet_jaune",
      "categorie": "bonnet",
      "nom": "Bonnet",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/bonnet_jaune.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bonnet_jaune.webp"
    },
    {
      "id": "bonnet_marron",
      "categorie": "bonnet",
      "nom": "Bonnet",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/bonnet_marron.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bonnet_marron.webp"
    },
    {
      "id": "bonnet_bleu",
      "categorie": "bonnet",
      "nom": "Bonnet",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "coiffure",
      "z": 70,
      "image": "assets/vetements/bonnet_bleu.png",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ],
      "thumbnail": "assets/vignettes/bonnet_bleu.webp"
    },
    {
      "id": "lunettes_rouge",
      "categorie": "lunettes",
      "nom": "Lunettes",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "lunettes",
      "z": 80,
      "image": "assets/vetements/lunettes_rouge.png",
      "thumbnail": "assets/vignettes/lunettes_rouge.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "lunettes_vert",
      "categorie": "lunettes",
      "nom": "Lunettes",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "lunettes",
      "z": 80,
      "image": "assets/vetements/lunettes_vert.png",
      "thumbnail": "assets/vignettes/lunettes_vert.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "lunettes_violet",
      "categorie": "lunettes",
      "nom": "Lunettes",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "lunettes",
      "z": 80,
      "image": "assets/vetements/lunettes_violet.png",
      "thumbnail": "assets/vignettes/lunettes_violet.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "lunettes_rose",
      "categorie": "lunettes",
      "nom": "Lunettes",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "lunettes",
      "z": 80,
      "image": "assets/vetements/lunettes_rose.png",
      "thumbnail": "assets/vignettes/lunettes_rose.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "lunettes_jaune",
      "categorie": "lunettes",
      "nom": "Lunettes",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "lunettes",
      "z": 80,
      "image": "assets/vetements/lunettes_jaune.png",
      "thumbnail": "assets/vignettes/lunettes_jaune.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "lunettes_marron",
      "categorie": "lunettes",
      "nom": "Lunettes",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "lunettes",
      "z": 80,
      "image": "assets/vetements/lunettes_marron.png",
      "thumbnail": "assets/vignettes/lunettes_marron.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "lunettes_bleu",
      "categorie": "lunettes",
      "nom": "Lunettes",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "lunettes",
      "z": 80,
      "image": "assets/vetements/lunettes_bleu.png",
      "thumbnail": "assets/vignettes/lunettes_bleu.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "gants_rouge",
      "categorie": "gants",
      "nom": "Gants",
      "couleur": "rouge",
      "hex": "#BF635B",
      "emplacement": "gants",
      "z": 65,
      "image": "assets/vetements/gants_rouge.png",
      "thumbnail": "assets/vignettes/gants_rouge.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "gants_vert",
      "categorie": "gants",
      "nom": "Gants",
      "couleur": "vert",
      "hex": "#7E9B68",
      "emplacement": "gants",
      "z": 65,
      "image": "assets/vetements/gants_vert.png",
      "thumbnail": "assets/vignettes/gants_vert.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "gants_violet",
      "categorie": "gants",
      "nom": "Gants",
      "couleur": "violet",
      "hex": "#8E78AB",
      "emplacement": "gants",
      "z": 65,
      "image": "assets/vetements/gants_violet.png",
      "thumbnail": "assets/vignettes/gants_violet.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "gants_rose",
      "categorie": "gants",
      "nom": "Gants",
      "couleur": "rose",
      "hex": "#D291AD",
      "emplacement": "gants",
      "z": 65,
      "image": "assets/vetements/gants_rose.png",
      "thumbnail": "assets/vignettes/gants_rose.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "gants_jaune",
      "categorie": "gants",
      "nom": "Gants",
      "couleur": "jaune",
      "hex": "#D8BB69",
      "emplacement": "gants",
      "z": 65,
      "image": "assets/vetements/gants_jaune.png",
      "thumbnail": "assets/vignettes/gants_jaune.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "gants_marron",
      "categorie": "gants",
      "nom": "Gants",
      "couleur": "marron",
      "hex": "#8C6853",
      "emplacement": "gants",
      "z": 65,
      "image": "assets/vetements/gants_marron.png",
      "thumbnail": "assets/vignettes/gants_marron.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    },
    {
      "id": "gants_bleu",
      "categorie": "gants",
      "nom": "Gants",
      "couleur": "bleu",
      "hex": "#638EB5",
      "emplacement": "gants",
      "z": 65,
      "image": "assets/vetements/gants_bleu.png",
      "thumbnail": "assets/vignettes/gants_bleu.webp",
      "dimensions": [
        1280,
        1920
      ],
      "compatible": [
        "garcon",
        "fille"
      ]
    }
  ]
};
