
"use client";

import { useState } from "react";
import type { OfficeResult, PolicyScores } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResultsTOC from "@/components/app/ResultsTOC";
import ResultsAll from "@/components/app/ResultsAll";
import { Suspense } from "react";

interface ResultsClientProps {
  officeResults: OfficeResult[];
  userScores: PolicyScores;
}

/**
 * A client component to display the interactive results page, including tabs for
 * a table of contents and a comprehensive list of all politicians.
 *
 * @param {ResultsClientProps} props - The props for the component.
 * @param {OfficeResult[]} props.officeResults - The politician results, grouped by office.
 * @param {PolicyScores} props.userScores - The user's calculated policy scores.
 * @returns {JSX.Element} The rendered client-side results UI.
 */
export default function ResultsClient({ officeResults, userScores }: ResultsClientProps) {
  
  return (
    <Tabs
      defaultValue="toc"
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 h-auto sm:h-10">
        <TabsTrigger value="toc">Offices by Category</TabsTrigger>
        <TabsTrigger value="all">All Offices</TabsTrigger>
      </TabsList>
      <TabsContent value="toc">
        {/* Wrap in suspense because useSearchParams is used in ResultsTOC */}
        <Suspense fallback={<div>Loading...</div>}>
          <ResultsTOC officeResults={officeResults} />
        </Suspense>
      </TabsContent>
      <TabsContent value="all">
        <ResultsAll officeResults={officeResults} userScores={userScores} />
      </TabsContent>
    </Tabs>
  );
}
