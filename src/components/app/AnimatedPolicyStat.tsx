
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { POLICY_COLORS } from "@/lib/constants";
import type { PolicyCategory } from "@/lib/types";

interface AnimatedPolicyStatProps {
  category: PolicyCategory;
  userScore: number;
  politicianScore: number;
}

/**
 * A component that displays a single policy statistic in its own card,
 * with bars for both the user's score and the politician's score.
 *
 * @param {AnimatedPolicyStatProps} props - The props for the component.
 * @returns {JSX.Element} The rendered policy statistic card.
 */
export default function AnimatedPolicyStat({ category, userScore, politicianScore }: AnimatedPolicyStatProps) {
  const politicianColor = POLICY_COLORS[category];

  return (
    <Card className="bg-muted/20">
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-medium">{category}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="space-y-3">
          {/* Politician's Score Bar */}
          <div className="w-full space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Politician Score</span>
              <span className="w-6 text-right">{Math.round(politicianScore)}</span>
            </div>
            <Progress
              value={politicianScore}
              className="h-2"
              style={{
                '--progress-color': politicianColor,
              } as React.CSSProperties}
            />
          </div>

          {/* User's Score Bar */}
          <div className="w-full space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Your Score</span>
              <span className="w-6 text-right">{Math.round(userScore)}</span>
            </div>
            <Progress
              value={userScore}
              className="h-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
