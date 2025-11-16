
"use client";

import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card";
import { OfficeResult } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import { slugify } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ResultsTOCProps {
  officeResults: OfficeResult[];
}

const HOUSE_PREFIX = "United States House of Representatives";

/**
 * A component that displays a "Table of Contents" for the election results.
 * It shows a list of political offices, which are clickable to navigate
 * to a dedicated page for that office. U.S. House districts are grouped
 * into a collapsible accordion.
 *
 * @param {ResultsTOCProps} props - The props for the component.
 * @param {OfficeResult[]} props.officeResults - The politician results, grouped by office.
 * @returns {JSX.Element} The rendered Table of Contents component.
 */
export default function ResultsTOC({ officeResults }: ResultsTOCProps) {
  const searchParams = useSearchParams();
  const answersQuery = searchParams.get('answers');

  const houseDistricts = officeResults
    .filter(r => r.office.startsWith(HOUSE_PREFIX))
    .sort((a, b) => {
        const aNum = parseInt(a.office.replace(/[^0-9]/g, ''), 10);
        const bNum = parseInt(b.office.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum;
        }
        return a.office.localeCompare(b.office);
    });

  const otherOffices = officeResults.filter(r => !r.office.startsWith(HOUSE_PREFIX));

  const renderLink = (office: string, index: number) => {
    const officeSlug = slugify(office);
    const href = answersQuery ? `/results/${officeSlug}?answers=${answersQuery}` : `/results/${officeSlug}`;
    
    return (
      <Link
        key={officeSlug}
        href={href}
        className="w-full text-left p-3 rounded-md transition-colors flex justify-between items-center group animate-spring-in active:bg-accent md:hover:bg-accent"
        style={{ animationDelay: `${index * 100}ms`}}
      >
        <span className="font-medium">{office.replace(HOUSE_PREFIX, "").trim()}</span>
        <ChevronRight className="h-5 w-5 text-muted-foreground md:group-hover:text-accent-foreground transition-colors" />
      </Link>
    );
  };

  const renderOfficeLink = (office: string, index: number) => {
    const officeSlug = slugify(office);
    const href = answersQuery ? `/results/${officeSlug}?answers=${answersQuery}` : `/results/${officeSlug}`;
    
    return (
      <Link
        key={officeSlug}
        href={href}
        className="w-full text-left p-3 rounded-md transition-colors flex justify-between items-center group animate-spring-in active:bg-accent md:hover:bg-accent"
        style={{ animationDelay: `${index * 100}ms`}}
      >
        <span className="font-medium">{office}</span>
        <ChevronRight className="h-5 w-5 text-muted-foreground md:group-hover:text-accent-foreground transition-colors" />
      </Link>
    );
  }

  return (
    <Card className="mt-6 animate-spring-in" style={{ animationDelay: "200ms" }}>
      <CardContent className="p-4">
        <div className="space-y-2">
          {otherOffices.map(({ office }, index) => renderOfficeLink(office, index))}

          {houseDistricts.length > 0 && (
            <Accordion type="single" collapsible className="w-full animate-spring-in" style={{ animationDelay: `${otherOffices.length * 100}ms`}}>
              <AccordionItem value="house-districts" className="border-b-0">
                <AccordionTrigger className="p-3 font-medium rounded-md active:bg-accent md:hover:no-underline md:hover:bg-accent">
                    {HOUSE_PREFIX}
                </AccordionTrigger>
                <AccordionContent className="pt-2 pl-4">
                   {houseDistricts.map(({ office }, index) => renderLink(office, index))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
