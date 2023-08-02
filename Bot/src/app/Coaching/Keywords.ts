const KEYWORD_DEB_A_FAIRE = [
  "deb a faire",
  "deb pas faite",
  "fiche deb a faire",
  "debut de parcours a faire",
];
const KEYWORD_DEB_COMMENCE = [
  "deb comm",
  "deb commentee",
  "fiche deb comm",
  "deb comm a reguider",
];
const KEYWORD_FICHE_A_FAIRE = [
  "fiche a faire",
  "fiche pas faite",
  "fiche $ a faire",
];
const KEYWORD_FICHE_ONE_COMM = [
  "fiche 1 comm",
  "fiche 1 commentee",
  "fiche 1 comm a reguider",
  "fiche 1 faite",
];
const KEYWORD_FICHE_TWO_COMM = [
  "fiche 2 comm",
  "fiche 2 commentee",
  "fiche 2 faite",
  "fiche 2 comm a reguider",
  "fiche 2 faite",
];
const KEYWORD_FICHE_N_COMM = [
  "fiche $ comm",
  "fiche $ commentee",
  "fiche $ comm a reguider",
  "fiche $ faite",
  "fiche $ comm heure en plus",
];
const KEYWORDS_COACHING = [
  { index: 0, keywords: KEYWORD_DEB_A_FAIRE },
  { index: 1, keywords: KEYWORD_DEB_COMMENCE },
  { index: 2, keywords: KEYWORD_FICHE_A_FAIRE },
  { index: 3, keywords: KEYWORD_FICHE_ONE_COMM },
  { index: 4, keywords: KEYWORD_FICHE_TWO_COMM },
  { index: 5, keywords: KEYWORD_FICHE_N_COMM },
] as const;

export default KEYWORDS_COACHING;
