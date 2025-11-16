
"use client";

import { useState } from "react";
import type { OfficeResult, PolicyScores } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PoliticianCard from "./PoliticianCard";

interface ResultsAllProps {
  officeResults: OfficeResult[];
  userScores: PolicyScores;
}

function AccordionPoliticians({ results, userScores, office }: { results: OfficeResult['results'], userScores: PolicyScores, office: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion 
        type="single" 
        collapsible 
        className="w-full rounded-lg border bg-card text-card-foreground shadow-sm px-6"
        onValueChange={(value) => setIsOpen(!!value)}
    >
      <AccordionItem value={office} className="border-b-0">
        <AccordionTrigger>
          Show Top 3 Matches for {office}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6 pt-4">
            {results.slice(1, 3).map((result, index) => (
              <PoliticianCard
                key={result.politician.id}
                politicianResult={result}
                userScores={userScores}
                rank={index + 2}
                animationDelay={index * 150}
                forceAnimate={isOpen}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}


/**
 * A component that displays all politician results, grouped by office.
 * This view is meant to be scrolled through, often navigated via the Table of Contents.
 *
 * @param {ResultsAllProps} props - The props for the component.
 * @param {OfficeResult[]} props.officeResults - The politician results, grouped by office.
 * @param {PolicyScores} props.userScores - The user's calculated policy scores.
 * @returns {JSX.Element} The rendered list of all results.
 */
export default function ResultsAll({ officeResults, userScores }: ResultsAllProps) {
  return (
    <div className="space-y-10 mt-6">
      <p className="text-center text-muted-foreground">Your top matches for each political office, from most to least aligned.</p>
      {officeResults.map(({ office, results }) => {
        const officeId = office.replace(/\s+/g, "-").toLowerCase();
        return (
          <div key={officeId} id={officeId} className="scroll-mt-20">
            <h2 className="text-2xl font-bold tracking-tighter mb-4 font-headline text-center">{office}</h2>
            {results.length > 0 ? (
              <div className="space-y-6">
                {/* Always show the #1 match */}
                {results[0] && (
                  <PoliticianCard
                    politicianResult={results[0]}
                    userScores={userScores}
                    rank={1}
                  />
                )}
                
                {/* Show #2 and #3 in an accordion if they exist */}
                {results.length > 1 && (
                  <AccordionPoliticians 
                    results={results} 
                    userScores={userScores} 
                    office={office}
                  />
                )}
              </div>
            ) : (
                <p className="text-center text-muted-foreground">There are no official candidates for this office yet.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
