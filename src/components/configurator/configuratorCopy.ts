import { configurationMeasurements, isTiled } from "./marbleConfiguration";
import type { MarbleConfiguration } from "./marbleConfiguration";

const en = {
  eyebrow: "THE MARBLE STUDIO",
  title: "Your space. Your marble.",
  subtitle: "Choose a stone, shape your space, and watch your design come to life.",
  live: "LIVE 3D PREVIEW",
  stone: "Choose your marble",
  installation: "Where will it go?",
  dimensions: "Make it your size",
  details: "The finishing touches",
  applications: { floor: "Flooring", wall: "Wall cladding", countertop: "Countertop", stairs: "Staircase" },
  dimensionLabels: {
    floorLength: "Floor length", floorWidth: "Floor width", wallWidth: "Wall width", wallHeight: "Wall height",
    counterLength: "Countertop length", counterDepth: "Countertop depth", stairWidth: "Stair width",
    treadDepth: "Tread depth", rise: "Riser height", steps: "Number of steps",
  },
  adjust: "Adjust",
  thickness: "Stone thickness",
  finish: "Surface finish",
  polished: "Polished",
  honed: "Honed",
  tileSize: "Tile size",
  layout: "Laying pattern",
  straight: "Straight",
  staggered: "Staggered",
  veinDirection: "Vein direction",
  original: "Original",
  crosswise: "Rotate 90°",
  allowance: "Cutting allowance",
  coverage: "Surface area",
  orderArea: "With allowance",
  approximateTiles: "Approx. tiles",
  allowanceNote: "Area-based estimate. Cuts and layout may require more pieces. Final quantities are confirmed with our team.",
  stairNote: "Area includes treads and risers. Sides and landings are excluded.",
  counterNote: "Area covers the countertop surface. Cut-outs, edges, and splashbacks are quoted separately.",
  quote: "Request a quote for this design",
  download: "Save specification",
  previewNote: "Concept preview using our marble photos. Natural veining and colours vary between slabs. Final sizes, availability, and finish are confirmed with our team.",
  dragHint: "Drag to rotate · Scroll or pinch to zoom",
  keyboardHint: "Use arrow keys to rotate; plus and minus to zoom.",
  perspective: "Perspective",
  surfaceView: "Surface view",
  resetView: "Reset view",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  contrast: "Marble contrast",
  originalContrast: "100% = original photo",
  resetContrast: "Reset to 150%",
  loading: "Preparing your marble studio…",
  updating: "Updating your marble…",
  unavailable: "Interactive 3D is unavailable on this device. Your selections and quote still work.",
  textureError: "The marble texture could not load. Showing your selected stone below; you can still request a quote.",
  retry: "Try 3D again",
  fallback: "Selected marble sample",
  summaryTitle: "My marble design — ES STONE IKE",
  product: "Marble",
  size: "Dimensions",
  cm: "cm",
};

type TextShape<T> = { [K in keyof T]: T[K] extends string ? string : TextShape<T[K]> };
export type ConfiguratorCopy = TextShape<typeof en>;

const el: ConfiguratorCopy = {
  eyebrow: "ΤΟ ΔΙΚΟ ΣΑΣ ΜΑΡΜΑΡΟ",
  title: "Ο χώρος σας. Το μάρμαρό σας.",
  subtitle: "Επιλέξτε μάρμαρο, ορίστε τις διαστάσεις και δείτε το σχέδιό σας να ζωντανεύει.",
  live: "ΖΩΝΤΑΝΗ ΤΡΙΣΔΙΑΣΤΑΤΗ ΠΡΟΕΠΙΣΚΟΠΗΣΗ",
  stone: "Επιλέξτε μάρμαρο",
  installation: "Πού θα τοποθετηθεί;",
  dimensions: "Ορίστε τις διαστάσεις",
  details: "Οι τελικές λεπτομέρειες",
  applications: { floor: "Δάπεδο", wall: "Επένδυση τοίχου", countertop: "Πάγκος", stairs: "Σκάλα" },
  dimensionLabels: {
    floorLength: "Μήκος δαπέδου", floorWidth: "Πλάτος δαπέδου", wallWidth: "Πλάτος τοίχου", wallHeight: "Ύψος τοίχου",
    counterLength: "Μήκος πάγκου", counterDepth: "Βάθος πάγκου", stairWidth: "Πλάτος σκάλας",
    treadDepth: "Βάθος πατήματος", rise: "Ύψος ριχτιού", steps: "Αριθμός σκαλοπατιών",
  },
  adjust: "Ρύθμιση",
  thickness: "Πάχος μαρμάρου",
  finish: "Φινίρισμα επιφάνειας",
  polished: "Γυαλισμένο",
  honed: "Ματ",
  tileSize: "Διάσταση πλακιδίων",
  layout: "Σχέδιο τοποθέτησης",
  straight: "Ευθύγραμμο",
  staggered: "Μετατοπισμένο",
  veinDirection: "Κατεύθυνση νερών",
  original: "Αρχική",
  crosswise: "Περιστροφή 90°",
  allowance: "Περιθώριο κοπής",
  coverage: "Εμβαδόν επιφάνειας",
  orderArea: "Με το περιθώριο",
  approximateTiles: "Πλακίδια περίπου",
  allowanceNote: "Εκτίμηση βάσει εμβαδού. Οι κοπές και το σχέδιο μπορεί να απαιτούν περισσότερα τεμάχια. Η τελική ποσότητα επιβεβαιώνεται με την ομάδα μας.",
  stairNote: "Περιλαμβάνονται πατήματα και ρίχτια. Εξαιρούνται πλαϊνά και πλατύσκαλα.",
  counterNote: "Το εμβαδόν αφορά την επιφάνεια του πάγκου. Ανοίγματα, ακμές και πλάτες κοστολογούνται ξεχωριστά.",
  quote: "Ζητήστε προσφορά για αυτό το σχέδιο",
  download: "Αποθήκευση προδιαγραφών",
  previewNote: "Ενδεικτική προεπισκόπηση με φωτογραφίες των μαρμάρων μας. Τα φυσικά νερά και οι αποχρώσεις διαφέρουν ανά πλάκα. Διαστάσεις, διαθεσιμότητα και φινίρισμα επιβεβαιώνονται με την ομάδα μας.",
  dragHint: "Σύρετε για περιστροφή · Κύλιση ή δύο δάχτυλα για ζουμ",
  keyboardHint: "Χρησιμοποιήστε τα βέλη για περιστροφή και τα πλήκτρα συν και πλην για ζουμ.",
  perspective: "Προοπτική",
  surfaceView: "Όψη επιφάνειας",
  resetView: "Επαναφορά όψης",
  zoomIn: "Μεγέθυνση",
  zoomOut: "Σμίκρυνση",
  contrast: "Αντίθεση μαρμάρου",
  originalContrast: "100% = αρχική φωτογραφία",
  resetContrast: "Επαναφορά στο 150%",
  loading: "Προετοιμασία προεπισκόπησης…",
  updating: "Ενημέρωση μαρμάρου…",
  unavailable: "Η διαδραστική τρισδιάστατη προβολή δεν είναι διαθέσιμη σε αυτή τη συσκευή. Οι επιλογές και το αίτημα προσφοράς λειτουργούν κανονικά.",
  textureError: "Η υφή του μαρμάρου δεν φορτώθηκε. Το επιλεγμένο δείγμα εμφανίζεται παρακάτω και μπορείτε να ζητήσετε προσφορά.",
  retry: "Δοκιμή 3D ξανά",
  fallback: "Επιλεγμένο δείγμα μαρμάρου",
  summaryTitle: "Το σχέδιο μαρμάρου μου — ES STONE IKE",
  product: "Μάρμαρο",
  size: "Διαστάσεις",
  cm: "εκ.",
};

const de: ConfiguratorCopy = {
  eyebrow: "DAS MARMORSTUDIO",
  title: "Ihr Raum. Ihr Marmor.",
  subtitle: "Wählen Sie Ihren Stein, bestimmen Sie die Maße und erleben Sie Ihren Entwurf in 3D.",
  live: "LIVE-3D-VORSCHAU",
  stone: "Wählen Sie Ihren Marmor",
  installation: "Wo wird er verlegt?",
  dimensions: "Bestimmen Sie die Maße",
  details: "Die letzten Details",
  applications: { floor: "Boden", wall: "Wandverkleidung", countertop: "Arbeitsplatte", stairs: "Treppe" },
  dimensionLabels: {
    floorLength: "Bodenlänge", floorWidth: "Bodenbreite", wallWidth: "Wandbreite", wallHeight: "Wandhöhe",
    counterLength: "Plattenlänge", counterDepth: "Plattentiefe", stairWidth: "Treppenbreite",
    treadDepth: "Auftrittstiefe", rise: "Stufenhöhe", steps: "Anzahl der Stufen",
  },
  adjust: "Anpassen",
  thickness: "Steinstärke",
  finish: "Oberfläche",
  polished: "Poliert",
  honed: "Matt geschliffen",
  tileSize: "Fliesenformat",
  layout: "Verlegemuster",
  straight: "Kreuzverband",
  staggered: "Halbverband",
  veinDirection: "Aderungsrichtung",
  original: "Original",
  crosswise: "Um 90° drehen",
  allowance: "Verschnittzuschlag",
  coverage: "Oberfläche",
  orderArea: "Mit Zuschlag",
  approximateTiles: "Fliesen ca.",
  allowanceNote: "Schätzung nach Fläche. Zuschnitt und Verlegemuster können zusätzliche Stücke erfordern. Die endgültige Menge bestätigen wir gemeinsam.",
  stairNote: "Die Fläche umfasst Tritt- und Setzstufen. Seiten und Podeste sind nicht enthalten.",
  counterNote: "Die Fläche betrifft die Arbeitsplatte. Ausschnitte, Kanten und Rückwände werden gesondert angeboten.",
  quote: "Angebot für diesen Entwurf anfordern",
  download: "Spezifikation speichern",
  previewNote: "Unverbindliche Vorschau mit unseren Marmorfotos. Natürliche Aderung und Farben variieren je nach Platte. Maße, Verfügbarkeit und Oberfläche werden mit unserem Team bestätigt.",
  dragHint: "Ziehen zum Drehen · Scrollen oder zwei Finger zum Zoomen",
  keyboardHint: "Mit den Pfeiltasten drehen und mit Plus und Minus zoomen.",
  perspective: "Perspektive",
  surfaceView: "Flächenansicht",
  resetView: "Ansicht zurücksetzen",
  zoomIn: "Vergrößern",
  zoomOut: "Verkleinern",
  contrast: "Marmorkontrast",
  originalContrast: "100% = Originalfoto",
  resetContrast: "Auf 150% zurücksetzen",
  loading: "Ihr Marmorstudio wird vorbereitet…",
  updating: "Marmor wird aktualisiert…",
  unavailable: "Interaktives 3D ist auf diesem Gerät nicht verfügbar. Ihre Auswahl und Angebotsanfrage funktionieren weiterhin.",
  textureError: "Die Marmorstruktur konnte nicht geladen werden. Das gewählte Muster wird unten angezeigt; Sie können weiterhin ein Angebot anfordern.",
  retry: "3D erneut versuchen",
  fallback: "Gewähltes Marmormuster",
  summaryTitle: "Mein Marmorentwurf — ES STONE IKE",
  product: "Marmor",
  size: "Maße",
  cm: "cm",
};

export function configuratorCopy(language: string): ConfiguratorCopy {
  return language.startsWith("el") ? el : language.startsWith("de") ? de : en;
}

export function formatMeasurement(value: number, language: string) {
  return new Intl.NumberFormat(language, { maximumFractionDigits: 2 }).format(value);
}

export function configurationSummary(configuration: MarbleConfiguration, productName: string, language: string) {
  const copy = configuratorCopy(language);
  const { areaM2, orderM2, approximateTiles } = configurationMeasurements(configuration);
  const number = (value: number) => formatMeasurement(value, language);
  const lines = [
    copy.summaryTitle,
    `${copy.product}: ${productName}`,
    `${copy.installation}: ${copy.applications[configuration.application]}`,
    `${copy.size}: ${configuration.lengthCm} × ${configuration.widthCm} ${copy.cm}`,
    `${copy.thickness}: ${configuration.thicknessCm} ${copy.cm}`,
    `${copy.finish}: ${copy[configuration.finish]}`,
    `${copy.veinDirection}: ${copy[configuration.veinDirection === 0 ? "original" : "crosswise"]}`,
  ];
  if (isTiled(configuration.application)) {
    lines.push(`${copy.tileSize}: ${configuration.tileSize.replace("x", " × ")} ${copy.cm}`, `${copy.layout}: ${copy[configuration.layout]}`);
  }
  if (configuration.application === "stairs") {
    lines.push(`${copy.dimensionLabels.steps}: ${configuration.steps}`, `${copy.dimensionLabels.rise}: ${configuration.riseCm} ${copy.cm}`, copy.stairNote);
  }
  if (configuration.application === "countertop") lines.push(copy.counterNote);
  lines.push(
    `${copy.coverage}: ${number(areaM2)} m²`,
    `${copy.allowance}: ${configuration.wastePercent}%`,
    `${copy.orderArea}: ${number(orderM2)} m²`,
  );
  if (isTiled(configuration.application)) lines.push(`${copy.approximateTiles}: ${approximateTiles}`);
  lines.push("", copy.allowanceNote, copy.previewNote);
  return lines.join("\n");
}
