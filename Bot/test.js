// Tableau d'objets pour stocker les données
let ateliers = [];

// Fonction pour créer un objet à partir des informations fournies
function creerAtelier(
  activite,
  creneau,
  langue,
  niveau,
  nom,
  prenom,
  groupe,
  observations,
  nivAngCons,
  nivEspCons,
  validation
) {
  return {
    activite: activite,
    creneau: creneau,
    langue: langue,
    niveau: niveau,
    nom: nom,
    prenom: prenom,
    groupe: groupe,
    observations: observations,
    nivAngCons: nivAngCons,
    nivEspCons: nivEspCons,
    validation: validation,
  };
}

// Ajouter les données du texte au tableau d'objets
function ajouterDonneesDuTexte(texte) {
  let lignes = texte.split("\n");
  for (let ligne of lignes) {
    let colonnes = ligne.split("\t");
    if (colonnes.length >= 12) {
      let activite = colonnes[1];
      let creneau = colonnes[2];
      let langue = colonnes[3];
      let niveau = colonnes[4];
      let nom = colonnes[5];
      let prenom = colonnes[6];
      let groupe = colonnes[7];
      let observations = colonnes[8];
      let nivAngCons = colonnes[9];
      let nivEspCons = colonnes[10];
      let validation = colonnes[11];

      let atelier = creerAtelier(
        activite,
        creneau,
        langue,
        niveau,
        nom,
        prenom,
        groupe,
        observations,
        nivAngCons,
        nivEspCons,
        validation
      );
      ateliers.push(atelier);
    }
  }
}

// Appel de la fonction avec le texte donné
let texteTableau = `Type	Activité	Créneau	Langue	Niveau	Nom	Prénom	Groupe	Observations	Niv. Ang. cons.	Niv. Esp. cons.	Validation
Atelier	test	10:00	Anglais	Intermediaire	Folch	Marie		pensez à vous désinscrire!			
					Pascual	Louise		participez plus en atelier !!		Débutant	`;
ajouterDonneesDuTexte(texteTableau);

console.log(ateliers);
