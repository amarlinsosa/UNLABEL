
"use client";

import { useState, useRef, useEffect } from "react";
import type { Politician, PolicyCategory, PolicyScores } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { policyCategories } from "@/lib/types";
import AnimatedPolicyStat from "./AnimatedPolicyStat";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ExternalLink, Info, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useIsMobile } from "@/hooks/use-mobile";

interface PoliticianResult {
  politician: Politician;
  matchPercentage: number;
  rpgDescription: string;
}

interface PoliticianCardProps {
  politicianResult: PoliticianResult;
  userScores: PolicyScores;
  rank: number;
  animationDelay?: number;
  forceAnimate?: boolean;
}

function getRankBadgeVariant(rank: number) {
  switch (rank) {
    case 1:
      return "default";
    case 2:
      return "secondary";
    default:
      return "outline";
  }
}

export default function PoliticianCard({ politicianResult, userScores, rank, animationDelay = 0, forceAnimate = false }: PoliticianCardProps) {
  const { politician, rpgDescription } = politicianResult;
  const matchPercentage = isNaN(politicianResult.matchPercentage) ? 0 : politicianResult.matchPercentage;
  
  const realPhotoUrl = politician.realPhotoUrl;
  const avatarUrl = politician.avatarUrl || "https://picsum.photos/seed/placeholder/150/150";
  const imageHint = "placeholder";
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [isImageFlipped, setIsImageFlipped] = useState(false);
  const isMobile = useIsMobile();


  const cardRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(cardRef, {
    once: true,
    threshold: 0.2,
  });

  const shouldAnimate = forceAnimate || isIntersecting;

  useEffect(() => {
    if (shouldAnimate) {
      // Sequence: 8-bit -> real -> 8-bit
      const timer1 = setTimeout(() => setIsImageFlipped(true), 2000 + animationDelay); // Flip to real photo after 2s
      const timer2 = setTimeout(() => setIsImageFlipped(false), 5000 + animationDelay); // Flip back to avatar after 3 more seconds

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [shouldAnimate, animationDelay]);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const handleImageInteraction = {
    onMouseEnter: () => {
      if (!isMobile) {
        setIsImageFlipped(true);
      }
    },
    onMouseLeave: () => {
      if (!isMobile) {
        setIsImageFlipped(false);
      }
    },
    onClick: () => {
      // Allow tap-to-toggle on mobile, and click-to-toggle on desktop
      setIsImageFlipped(prev => !prev);
    },
  };


  return (
    <div ref={cardRef} className={cn("perspective-container opacity-0", shouldAnimate && "animate-spring-in")} style={{ animationDelay: `${animationDelay}ms` }}>
      <div className={cn("card-flipper", isFlipped && "is-flipped")}>
        {/* FRONT OF CARD */}
        <Card className="card-face card-front overflow-hidden shadow-lg transition-all hover:shadow-xl">
          <CardHeader className="bg-muted/30 p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                    <CardTitle 
                      className="text-xl sm:text-2xl font-headline"
                    >
                      {politician.name}
                    </CardTitle>
                    <CardDescription className="text-base">{politician.office}</CardDescription>
                </div>
                <Badge variant={getRankBadgeVariant(rank)} className="hidden sm:inline-flex shrink-0">
                  Rank #{rank}
                </Badge>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#616057]">{matchPercentage}%</span>
                <span className="text-sm font-medium text-muted-foreground">Match</span>
              </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
              <div className="md:col-span-1 space-y-4 flex flex-col items-center text-center">
                 <div 
                    className="perspective-container h-[150px] w-[150px] cursor-pointer mb-4"
                    {...handleImageInteraction}
                 >
                    <div className={cn("card-flipper w-full h-full", isImageFlipped && "is-flipped")}>
                        {/* Front of image card (Avatar) */}
                        <div className="card-face card-front">
                             <Image
                                src={avatarUrl}
                                alt={`${politician.name} avatar`}
                                width={150}
                                height={150}
                                className="rounded-md border-2 border-primary/50 object-cover"
                                data-ai-hint={imageHint}
                            />
                        </div>
                        {/* Back of image card (Real Photo) */}
                        <div className="card-face card-back">
                            <Image
                                src={realPhotoUrl}
                                alt={`${politician.name} real photo`}
                                width={150}
                                height={150}
                                className="rounded-md border-2 border-primary/50 object-cover"
                                data-ai-hint="real person"
                            />
                        </div>
                    </div>
                </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Character Profile</h3>
                    <p className="text-foreground/80 italic text-sm">"{rpgDescription}"</p>
                    <Button variant="link" size="sm" onClick={handleFlip} className="text-[#616057] hover:text-[#616057]/80">
                        <Info className="mr-2 h-4 w-4" />
                        More Details
                    </Button>
                  </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground text-center md:text-left">Policy Stats</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {(policyCategories as readonly PolicyCategory[]).map((category, index) => (
                    <div
                      key={category}
                      className={cn("opacity-0", shouldAnimate && "animate-spring-in")}
                      style={{ animationDelay: `${(index * 150) + animationDelay + 200}ms` }}
                    >
                      <AnimatedPolicyStat
                        category={category}
                        politicianScore={politician.scores[category]}
                        userScore={userScores[category]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BACK OF CARD */}
        <Card className="card-face card-back overflow-hidden shadow-lg flex flex-col">
            <CardHeader className="bg-muted/30 p-4 sm:p-6">
                 <div className="flex items-center justify-between">
                    <CardTitle className="text-xl sm:text-2xl font-headline">{politician.name}</CardTitle>
                     <Button variant="ghost" size="icon" onClick={handleFlip} title="Flip back to stats">
                        <RotateCcw className="h-5 w-5" />
                    </Button>
                </div>
                <CardDescription>{politician.office}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 flex-grow flex flex-col gap-4">
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Detailed Stance</h3>
                    <p className="text-sm text-foreground/90">{politician.longDescription}</p>
                </div>

                <div className="mt-auto pt-4">
                   <Button asChild className="w-full">
                        <Link href={politician.website} target="_blank" rel="noopener noreferrer">
                           Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

            </CardContent>
        </Card>
      </div>
    </div>
  );
}
