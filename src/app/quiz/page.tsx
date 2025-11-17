
import QuizClient from "./QuizClient";
import { getQuestionsFromDb } from "@/lib/db-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default async function QuizPage() {
  const questions = await getQuestionsFromDb();

  return (
    <div className="container mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center p-4">
      <div className="w-full self-start">
        <Button asChild variant="ghost" className="w-full justify-start sm:w-auto">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <div className="w-full flex-grow flex items-center pt-4 sm:pt-0">
        <QuizClient questions={questions} />
      </div>
    </div>
  );
}
