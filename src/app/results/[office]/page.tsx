
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PolicyScores, PoliticianResult } from "@/lib/types";
import { calculateMatchPercentage, unslugify, getUserScoresFromURL } from "@/lib/utils";
import { getPoliticiansFromDb, getQuestionsFromDb, getPlaceholderImagesFromDb } from "@/lib/db-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Terminal } from "lucide-react";
import PoliticianCard from "@/components/app/PoliticianCard";
import BackToTopButton from "@/components/app/BackToTopButton";

interface OfficePageProps {
  params: {
    office: string;
  };
  searchParams: {
    answers?: string;
  };
}

async function OfficeResults({ officePoliticians, userScores }: { officePoliticians: any[], userScores: PolicyScores }) {
  if (officePoliticians.length === 0) {
    return <p className="text-center text-muted-foreground pt-8">There are no official candidates for this office yet.</p>;
  }

  const results: PoliticianResult[] = officePoliticians
    .map((politician) => ({
      politician,
      matchPercentage: calculateMatchPercentage(userScores, politician),
      rpgDescription: "Character profile generation is currently disabled."
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <PoliticianCard
          key={result.politician.id}
          politicianResult={result}
          rank={index + 1}
          userScores={userScores}
        />
      ))}
    </div>
  );
}

export default async function OfficePage({ params, searchParams }: OfficePageProps) {
  const [politiciansRaw, questions, placeholderImages] = await Promise.all([
    getPoliticiansFromDb(),
    getQuestionsFromDb(),
    getPlaceholderImagesFromDb(),
  ]);

  const { userScores, error } = getUserScoresFromURL(searchParams.answers, questions);
  const officeName = unslugify(params.office);

  const politicians = politiciansRaw.map((p) => {
    const found = placeholderImages.find((img) => img.id === p.avatarUrl);
    return {
      ...p,
      avatarUrl: found ? found.imageUrl : p.avatarUrl,
    };
  });

  const officePoliticians = politicians.filter((p: any) => p.office === officeName);

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-3xl space-y-8">
        
        <div className="relative flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-auto md:flex-1">
                <Button asChild variant="ghost" className="w-full justify-center md:w-auto md:justify-start">
                    <Link href={`/results?answers=${searchParams.answers || ''}`}>
                        <ArrowLeft className="h-4 w-4 md:mr-0" />
                        <span className="md:hidden ml-2">Back to Results</span>
                    </Link>
                </Button>
            </div>
            <div className="text-center md:flex-grow">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl font-headline">
                    {officeName}
                </h1>
                <p className="text-muted-foreground md:text-lg">Your top matches for this office.</p>
            </div>
            <div className="hidden md:block md:flex-1">
              {/* This is a spacer to balance the header and keep the title centered */}
            </div>
        </div>


        {error || !userScores ? (
          <div className="flex flex-col items-center gap-4 pt-8">
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
          <Suspense fallback={<div className="text-center pt-8">Calculating matches...</div>}>
            <OfficeResults officePoliticians={officePoliticians} userScores={userScores} />
          </Suspense>
        )}
      </div>
      <BackToTopButton />
    </main>
  );
}
