// src/lib/politician-descriptions.ts

/**
 * Short RPG-style character descriptions for each politician.
 * These appear on the front of politician cards under "Character Profile".
 */
export const politicianShortDescriptions: Record<string, string> = {
  // ========================================
  // STATE EXECUTIVE BRANCH
  // ========================================
  
  // Governor of Alabama
  "Will Boyd": "A strategic reformer seeking to modernize Alabama's governance with innovative policy solutions.",
  "Ja'Mel Brown": "A community advocate championing equity and progressive change across Alabama.",
  "Chad Chig Martin": "A centrist leader pursuing balanced governance and incremental reform for the Heart of Dixie.",
  "Ken McFeeters": "A traditional conservative focused on fiscal discipline and limited government intervention.",
  "Tommy Tuberville": "A no-nonsense coach-turned-politician bringing competitive spirit to state leadership.",
  "Ronald Burnette Jr.": "An independent voice challenging the status quo with bold policy proposals.",
  
  // Lieutenant Governor of Alabama
  "Wes Allen": "A staunch defender of election integrity and conservative Alabama values.",
  "Patrick Bishop": "A pragmatic administrator focused on efficient government operations.",
  "George Childress": "A seasoned public servant committed to bipartisan cooperation.",
  "A.J. McCarron": "A championship athlete bringing teamwork mentality to public service.",
  "Dean Odle": "A grassroots organizer fighting for working families and economic opportunity.",
  "Rick Pate": "An agricultural champion supporting rural communities and traditional industries.",
  "Nicole Wadsworth": "A dynamic leader advocating for education reform and social progress.",
  
  // Attorney General of Alabama
  "Pamela Casey": "A fierce advocate for justice reform and civil rights protections.",
  "Jay Mitchell": "A law-and-order prosecutor focused on public safety and victim advocacy.",
  "Katherine Robertson": "A constitutional scholar balancing legal tradition with modern justice needs.",
  
  // Alabama Secretary of State
  "Wayne Rogers": "A transparency advocate working to modernize Alabama's electoral systems.",
  "Caroleene Dobson": "A conservative reformer emphasizing election security and government accountability.",
  "Andrew Sorrell": "A business-minded official streamlining state administrative processes.",
  
  // Alabama Treasurer
  "Young Boozer": "A fiscal conservative managing Alabama's finances with prudent investment strategies.",
  
  // Alabama Auditor
  "Josh Pendergrass": "A government watchdog rooting out waste and ensuring taxpayer accountability.",
  "Derek Chen": "A data-driven auditor bringing modern analytics to financial oversight.",
  
  // Alabama Commissioner of Agriculture and Industries
  "Jack Williams": "A farmer's champion protecting agricultural heritage and rural livelihoods.",
  "Corey Hill": "A community leader bridging urban and rural economic interests.",
  "Christina Woerner": "A sustainability advocate promoting modern farming and environmental stewardship.",
  
  // Alabama Public Service Commission
  "John Northrop": "A consumer advocate ensuring fair utility rates and reliable service delivery.",
  "Matt Gentry": "A regulatory expert balancing business needs with public protection.",
  "Brent Woodall": "An infrastructure specialist modernizing Alabama's energy and communications networks.",
  
  // ========================================
  // FEDERAL LEGISLATIVE BRANCH
  // ========================================
  
  // U.S. Senate
  "Dakarai Larriett": "A progressive voice fighting for healthcare access and economic justice.",
  "Lamont Lavender": "A coalition builder seeking common ground on national challenges.",
  "Kyle Sweeter": "A liberty-focused conservative championing constitutional principles.",
  "Mark Wheeler": "A pragmatic centrist navigating complex policy with measured approach.",
  "Jared Hudson": "A next-generation leader bringing fresh perspectives to federal governance.",
  "Steve Marshall": "A tough prosecutor extending law enforcement experience to legislative leadership.",
  "Barry Moore": "A steadfast conservative defender of traditional values and limited government.",
  "Morgan Murphy": "A policy wonk focused on evidence-based solutions and bipartisan cooperation.",
  "Rodney Walker": "A community organizer elevating grassroots voices in national debates.",
  "Jeremy L. Spratling": "An independent thinker challenging partisan gridlock with innovative ideas.",
  "Valma K. Glasgow": "A seasoned public servant committed to transparent and accountable representation.",
  
  // U.S. House of Representatives - District 1
  "Clyde Jones": "A working-class advocate fighting for coastal communities and economic opportunity.",
  "Jerry Carl": "A conservative businessman promoting job creation and limited government.",
  "Rhett Marques": "A military veteran bringing national security experience to congressional leadership.",
  "Joshua Mckee": "A grassroots conservative championing Second Amendment rights and border security.",
  "Austin Sidwell": "A young reformer seeking to modernize conservative principles for new generations.",
  "Kim Thomas": "A community leader focused on education funding and healthcare access.",
  
  // U.S. House of Representatives - District 2
  "Shomari Figures": "A civil rights advocate continuing Alabama's legacy of social justice leadership.",
  
  // U.S. House of Representatives - District 3
  "Lee McInnis": "A rural advocate protecting agricultural interests and small-town values.",
  "Draic Coakley": "A business owner promoting entrepreneurship and economic development.",
  "Terri Lapoint": "A education champion fighting for increased school funding and teacher support.",
  "Michael Dennis Rogers": "A veteran congressman balancing military strength with fiscal responsibility.",
  
  // U.S. House of Representatives - District 4
  "Robert Aderholt": "A seasoned appropriator delivering federal resources to North Alabama communities.",
  "Shane Weaver": "A progressive challenger advocating for healthcare expansion and labor rights.",
  "Tommy Barnes": "A conservative insurgent pushing for stricter immigration enforcement and budget cuts.",
  
  // U.S. House of Representatives - District 5
  "Dale Strong": "A infrastructure specialist leveraging Huntsville's aerospace industry for economic growth.",
  "Jeremy Devito": "A tech-savvy progressive promoting innovation economy and education investment.",
  "Candice Duvieilh": "A healthcare professional fighting for expanded medical access and affordability.",
  "Greg Howard": "A community organizer building coalitions around economic and racial justice.",
  "Andrew Sneed": "A environmental advocate balancing development with conservation priorities.",
  "Amanda Noelle Puszek": "A young activist energizing voters around climate action and social reform.",
  
  // U.S. House of Representatives - District 6
  "Gary Palmer": "A conservative policy expert advancing free-market solutions and limited government.",
  "Keith Pilkington": "A working-class Democrat championing union rights and manufacturing jobs.",
  "Case Dixon": "A libertarian-leaning Republican questioning government overreach and spending.",
  "Elizabeth Anderson": "A moderate voice seeking bipartisan solutions to suburban challenges.",
  
  // U.S. House of Representatives - District 7
  "Terri Sewell": "A civil rights champion delivering federal investment to Alabama's Black Belt region.",
};

/**
 * Get the short description for a politician by name.
 * Returns a default description if the politician is not found.
 */
export function getShortDescription(politicianName: string): string {
  return politicianShortDescriptions[politicianName] || 
    "A dedicated public servant committed to representing the people of Alabama.";
}
