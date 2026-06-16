export const CATEGORY_COLORS = {
  1:  "#9eb5ff",  // Déménagement
  2:  "#ff9eb5",  // Bricolage
  3:  "#a5d8a5",  // Aide ménagère
  4:  "#f0a5d8",  // Aide aux séniors
  5:  "#d8d8a5",  // Informatique
  6:  "#ffd1a9",  // Petits travaux
  7:  "#a9e5e6",  // Course
  8:  "#e2bbf0",  // Animaux
  9:  "#b3f5bc",  // Jardinerie
  10: "#ffcca9",  // Transport
  11: "#fbc7d4",  // Aide scolaire
  12: "#cbd5e1",  // Autre
};

export function getCategoryColor(categoryId) {
  return CATEGORY_COLORS[categoryId] ?? "#e5e7eb";
}
