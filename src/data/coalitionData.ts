export type InitiativeStatus = 'nicht-begonnen' | 'begonnen' | 'teilweise-umgesetzt' | 'umgesetzt' | 'verschoben';

export type ThemeCategory = 
  | 'Wirtschaft' 
  | 'Klima & Umwelt' 
  | 'Digitalisierung' 
  | 'Bildung & Forschung' 
  | 'Soziales' 
  | 'Gesundheit' 
  | 'Sicherheit & Verteidigung' 
  | 'Außenpolitik' 
  | 'Migration & Integration' 
  | 'Mobilität' 
  | 'Finanzen';

export interface Initiative {
  id: string;
  title: string;
  description: string;
  status: InitiativeStatus;
  category: ThemeCategory;
  dateAdded: string; // ISO date string
  lastUpdated: string; // ISO date string
  koalitionsvertrag?: {
    text?: string;
    page?: number;
  };
}

export const statusLabels: Record<InitiativeStatus, string> = {
  'nicht-begonnen': 'Nicht begonnen',
  'begonnen': 'Begonnen',
  'teilweise-umgesetzt': 'Teilweise umgesetzt',
  'umgesetzt': 'Umgesetzt',
  'verschoben': 'Verschoben'
};

export const themeLabels: Record<ThemeCategory, string> = {
  'Wirtschaft': 'Wirtschaft',
  'Klima & Umwelt': 'Klima & Umwelt',
  'Digitalisierung': 'Digitalisierung',
  'Bildung & Forschung': 'Bildung & Forschung',
  'Soziales': 'Soziales',
  'Gesundheit': 'Gesundheit',
  'Sicherheit & Verteidigung': 'Sicherheit & Verteidigung',
  'Außenpolitik': 'Außenpolitik',
  'Migration & Integration': 'Migration & Integration',
  'Mobilität': 'Mobilität',
  'Finanzen': 'Finanzen'
};

export const initiatives: Initiative[] = [
  {
    id: "1",
    title: "Mindestlohn auf 12 Euro erhöhen",
    description: "Anhebung des gesetzlichen Mindestlohns auf 12 Euro pro Stunde.",
    status: "umgesetzt",
    category: "Wirtschaft",
    dateAdded: "2021-12-08",
    lastUpdated: "2022-10-01"
  },
  {
    id: "2",
    title: "Kohleausstieg bis 2030",
    description: "Vorziehen des Kohleausstiegs auf 2030.",
    status: "begonnen",
    category: "Klima & Umwelt",
    dateAdded: "2021-12-08",
    lastUpdated: "2023-01-15"
  },
  {
    id: "3",
    title: "Digitalisierung der Verwaltung",
    description: "Umsetzung des Online-Zugangsgesetzes und Digitalisierung von Behördengängen.",
    status: "teilweise-umgesetzt",
    category: "Digitalisierung",
    dateAdded: "2021-12-08",
    lastUpdated: "2023-06-20"
  },
  {
    id: "4",
    title: "BAföG-Reform",
    description: "Erhöhung der BAföG-Sätze und Ausbau der Förderung.",
    status: "teilweise-umgesetzt",
    category: "Bildung & Forschung",
    dateAdded: "2021-12-08",
    lastUpdated: "2022-08-10"
  },
  {
    id: "5",
    title: "Kindergrundsicherung",
    description: "Einführung einer Kindergrundsicherung als Bündelung verschiedener Leistungen.",
    status: "begonnen",
    category: "Soziales",
    dateAdded: "2021-12-08",
    lastUpdated: "2023-03-05"
  },
  {
    id: "6",
    title: "Gesundheitsämter stärken",
    description: "Personelle und technische Stärkung der Gesundheitsämter nach der Pandemie.",
    status: "begonnen",
    category: "Gesundheit",
    dateAdded: "2021-12-08",
    lastUpdated: "2022-05-18"
  },
  {
    id: "7",
    title: "Bundeswehr modernisieren",
    description: "Modernisierung der Ausrüstung und Strukturen der Bundeswehr.",
    status: "begonnen",
    category: "Sicherheit & Verteidigung",
    dateAdded: "2021-12-08",
    lastUpdated: "2022-02-27"
  },
  {
    id: "8",
    title: "Neue China-Strategie",
    description: "Entwicklung einer umfassenden China-Strategie.",
    status: "umgesetzt",
    category: "Außenpolitik",
    dateAdded: "2021-12-08",
    lastUpdated: "2023-07-13"
  },
  {
    id: "9",
    title: "Fluchtursachen bekämpfen",
    description: "Stärkere Vernetzung von Entwicklungszusammenarbeit und Bekämpfung von Fluchtursachen.",
    status: "nicht-begonnen",
    category: "Migration & Integration",
    dateAdded: "2021-12-08",
    lastUpdated: "2021-12-08"
  },
  {
    id: "10",
    title: "Deutschlandtakt im Bahnverkehr",
    description: "Verbesserung des Bahnangebots durch integralen Taktfahrplan.",
    status: "begonnen",
    category: "Mobilität",
    dateAdded: "2021-12-08",
    lastUpdated: "2022-11-30"
  },
  {
    id: "11",
    title: "Schuldenbremse einhalten",
    description: "Einhaltung der Schuldenbremse ab 2023.",
    status: "verschoben",
    category: "Finanzen",
    dateAdded: "2021-12-08",
    lastUpdated: "2023-05-02"
  },
  {
    id: "12",
    title: "Solarenergie ausbauen",
    description: "Ausbau der Solarenergie auf 200 GW bis 2030.",
    status: "begonnen",
    category: "Klima & Umwelt",
    dateAdded: "2021-12-08",
    lastUpdated: "2022-07-07"
  },
  {
    id: "13",
    title: "Digitale Bildungsplattform",
    description: "Schaffung einer nationalen Bildungsplattform für digitale Angebote.",
    status: "nicht-begonnen",
    category: "Bildung & Forschung",
    dateAdded: "2021-12-08",
    lastUpdated: "2021-12-08"
  },
  {
    id: "14",
    title: "Rentenreform",
    description: "Stabilisierung des Rentenniveaus und Einführung der Aktienrente.",
    status: "teilweise-umgesetzt",
    category: "Soziales",
    dateAdded: "2021-12-08",
    lastUpdated: "2023-02-10"
  },
  {
    id: "15",
    title: "Wasserstoffstrategie",
    description: "Ausbau der Wasserstoffwirtschaft und -infrastruktur.",
    status: "begonnen",
    category: "Wirtschaft",
    dateAdded: "2021-12-08",
    lastUpdated: "2022-09-12"
  }
];

export const getStatusCountsByCategory = (
  data: Initiative[],
  category?: ThemeCategory
): Record<InitiativeStatus, number> => {
  const filtered = category 
    ? data.filter(item => item.category === category)
    : data;
  
  return {
    'nicht-begonnen': filtered.filter(item => item.status === 'nicht-begonnen').length,
    'begonnen': filtered.filter(item => item.status === 'begonnen').length,
    'teilweise-umgesetzt': filtered.filter(item => item.status === 'teilweise-umgesetzt').length,
    'umgesetzt': filtered.filter(item => item.status === 'umgesetzt').length,
    'verschoben': filtered.filter(item => item.status === 'verschoben').length,
  };
};

export const getCategoriesWithStatusCounts = (data: Initiative[]): {
  category: ThemeCategory;
  counts: Record<InitiativeStatus, number>;
  total: number;
}[] => {
  const categories = [...new Set(data.map(item => item.category))];
  
  return categories.map(category => {
    const counts = getStatusCountsByCategory(data, category);
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    
    return {
      category,
      counts,
      total
    };
  });
};

export const getStatusPercentages = (counts: Record<InitiativeStatus, number>): Record<InitiativeStatus, number> => {
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  if (total === 0) return {
    'nicht-begonnen': 0,
    'begonnen': 0,
    'teilweise-umgesetzt': 0,
    'umgesetzt': 0,
    'verschoben': 0,
  };
  
  return {
    'nicht-begonnen': (counts['nicht-begonnen'] / total) * 100,
    'begonnen': (counts['begonnen'] / total) * 100,
    'teilweise-umgesetzt': (counts['teilweise-umgesetzt'] / total) * 100,
    'umgesetzt': (counts['umgesetzt'] / total) * 100,
    'verschoben': (counts['verschoben'] / total) * 100,
  };
};
