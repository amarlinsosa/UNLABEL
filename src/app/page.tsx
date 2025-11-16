
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-2 animate-spring-in" style={{ animationDelay: "0s" }}>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
            UNLABEL
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl italic">
            Politics Without the Labels
          </p>
        </div>
        <div className="animate-spring-in" style={{ animationDelay: "200ms" }}>
            <Card className="max-w-2xl shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Discover Your Political Character</CardTitle>
                    <CardDescription>
                       Discover alignment through issues, not identity.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-left text-sm text-muted-foreground">
                        <p>
                            <strong className="text-foreground">Non-Partisan & Anonymous:</strong> No party labels. No sign-ups. Your views, your matches.
                        </p>
                        <p>
                            <strong className="text-foreground">Uncover True Alignment:</strong> We map your positions across 8 key policy areas and reveal your match percentage with real politicians.
                        </p>
                        <p>
                            <strong className="text-foreground">See the Full Picture:</strong> Explore RPG-style stat bars showing exactly how your values stack up across the political landscape.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="animate-spring-in" style={{ animationDelay: "400ms" }}>
          <Link href="/quiz">
            <Button size="lg" className="group">
              Begin Your Quest
              <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
