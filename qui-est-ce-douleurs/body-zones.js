// Portraits are identically cropped to 570 × 1024. Coordinates in [0,1].
const z=(x,y,rx,ry)=>({x,y,rx,ry});
const common={
 epaule:[z(.360,.387,.074,.047),z(.650,.387,.074,.047)],
 dents:[z(.505,.278,.077,.023)],
 tete:[z(.505,.158,.126,.031),z(.505,.100,.235,.080)],
 oeil:[z(.43,.200,.065,.032),z(.575,.200,.065,.032)],
 oreille:[z(.278,.244,.064,.045),z(.730,.244,.064,.045)],
 nez:[z(.506,.239,.049,.021)],
 // Haut du bras et avant-bras, à gauche comme à droite.
 bras:[z(.290,.472,.075,.066),z(.730,.472,.075,.066),z(.235,.537,.068,.055),z(.780,.537,.068,.055)],
 ventre:[z(.506,.547,.125,.027)],
 // Toute la main est recevable : paume, pouces et autres doigts.
 main:[z(.195,.600,.090,.040),z(.820,.600,.090,.040),z(.190,.635,.103,.039),z(.820,.635,.103,.039),z(.113,.579,.065,.035),z(.890,.579,.065,.035)],
 // Les quatre doigts et le pouce sont couverts sur chaque main.
 doigt:[z(.190,.635,.103,.039),z(.820,.635,.103,.039),z(.113,.579,.065,.035),z(.890,.579,.065,.035)],
 genou:[z(.414,.731,.075,.036),z(.606,.731,.075,.036)],
 // Mollets et cuisses des deux jambes ; le genou conserve sa zone précise.
 jambe:[z(.405,.820,.071,.077),z(.608,.820,.071,.077),z(.414,.685,.074,.043),z(.606,.685,.074,.043)],
 pied:[z(.368,.936,.115,.046),z(.647,.936,.115,.046)]
};
export const BODY_ZONES={garcon:common,fille:{...common,oreille:[z(.292,.242,.064,.045),z(.730,.242,.064,.045)],pied:[z(.365,.936,.115,.046),z(.664,.936,.115,.046)]}};
