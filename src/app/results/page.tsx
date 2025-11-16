
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { politicians } from "@/lib/data";
import type { PolicyScores, PoliticianResult, OfficeResult } from "@/lib/types";
import { calculateMatchPercentage, getUserScoresFromURL } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HelpCircle, Terminal } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { groupBy } from "lodash";
import ResultsClient from "./ResultsClient";
import BackToTopButton from "@/components/app/BackToTopButton";

const officeOrder = [
    // State Executive
    "Governor of Alabama",
    "Lieutenant Governor of Alabama",
    "Attorney General of Alabama",
    "Alabama Secretary of State",
    "Alabama Treasurer",
    "Alabama Auditor",
    "Alabama Commissioner of Agriculture and Industries",
    "Alabama Public Service Commission Place 1",
    "Alabama Public Service Commission Place 2",
    "Alabama State Board of Education",
    // Federal Legislative
    "U.S. Senate",
    "United States House of Representatives District 1",
    "United States House of Representatives District 2",
    "United States House of Representatives District 3",
    "United States House of Representatives District 4",
    "United States House of Representatives District 5",
    "United States House of Representatives District 6",
    "United States House of Representatives District 7",
];


interface ResultsPageProps {
  searchParams: {
    answers?: string;
  };
}

/**
 * The main server component for the results page.
 * It handles data fetching, score calculation, and AI description generation.
 * It then passes the processed data to a client component for interactive rendering.
 *
 * @param {ResultsPageProps} props - The props for the component, containing search parameters.
 * @returns {JSX.Element} The rendered results page.
 */
async function Results({ userScores }: { userScores: PolicyScores }) {
  const allResults: PoliticianResult[] = politicians
    .map((politician) => ({
      politician,
      matchPercentage: calculateMatchPercentage(userScores, politician),
      rpgDescription: "Character profile generation is currently disabled."
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const resultsByOffice = groupBy(allResults, 'politician.office');
  
  const officeResults: OfficeResult[] = officeOrder
    .map(office => ({
      office,
      // Ensure results are sorted by match percentage within each office
      results: (resultsByOffice[office] || []).sort((a, b) => b.matchPercentage - a.matchPercentage),
    }))
    .filter(office => officeOrder.includes(office.office)); // Filter out any offices not in the official order


  return <ResultsClient officeResults={officeResults} userScores={userScores} />;
}


export default function ResultsPage({ searchParams }: ResultsPageProps) {
  const { userScores, error } = getUserScoresFromURL(searchParams.answers);

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-5xl space-y-8">
        <div className="text-center space-y-2 animate-spring-in" style={{ animationDelay: "0s" }}>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            Your Political Companions
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Here are the Alabama politicians who align with your quest.
          </p>
        </div>

        <div className="animate-spring-in" style={{ animationDelay: "200ms" }}>
          {error || !userScores ? (
            <div className="flex flex-col items-center gap-4">
              <Alert variant="destructive" className="max-w-md">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Calculation Error</AlertTitle>
                <AlertDescription>{error || "An unknown error occurred."}</AlertDescription>
              </Alert>
              <Button asChild>
                  <Link href="/quiz">Take the Quest Again</Link>
              </Button>
            </div>
          ) : (
            <Suspense fallback={<div className="text-center">Calculating results...</div>}>
              <Results userScores={userScores} />
            </Suspense>
          )}
        </div>

        <div className="pt-8 space-y-4 animate-spring-in" style={{ animationDelay: "400ms" }}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-muted-foreground"/> 
                  <span className="font-semibold">How are these results calculated?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground p-2">
                  <p>
                    <strong className="text-foreground">Step 1: Calculating Your Policy Scores.</strong> Your answers on the 1-5 scale are converted to a score from 0-100 for each of the 8 policy categories. Your final score for a category is the average of your answers to its related questions.
                  </p>
                  <p>
                    <strong className="text-foreground">Step 2: Calculating Match Percentage.</strong> We compare your policy scores to each politician's scores. The match percentage is based on the average difference between your scores and theirs across all categories. A smaller difference means a higher match!
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {!error && (
            <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/quiz">Take the Quest Again</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <BackToTopButton />
    </main>
  );
}
