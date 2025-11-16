
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Question, UserAnswers } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { POLICY_EMOJIS } from "@/lib/constants";

interface QuizClientProps {
  questions: Question[];
}

const agreementLevels = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export default function QuizClient({ questions }: QuizClientProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  const quizTopRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    // Pre-fill answer when navigating back/forward
    const previousAnswer = answers[currentQuestion.id];
    setSelectedAnswer(previousAnswer || null);
  }, [currentQuestionIndex, answers, currentQuestion.id]);

  const scrollToTop = () => {
    quizTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeout(scrollToTop, 100);
    } else {
      const answersQuery = encodeURIComponent(JSON.stringify(newAnswers));
      router.push(`/results?answers=${answersQuery}`);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeout(scrollToTop, 100);
    }
  };

  return (
    <div className="w-full space-y-8" ref={quizTopRef}>
      <div>
        <p className="mb-2 text-center text-sm font-medium text-muted-foreground">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <Progress value={progress} className="h-1" />
      </div>

      <Card key={currentQuestion.id} className="w-full animate-fade-in shadow-md">
        <CardHeader>
          <CardDescription className="font-semibold flex items-center gap-2">
            
            {currentQuestion.category}
          </CardDescription>
          <CardTitle className="text-xl md:text-2xl leading-snug">{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            className="space-y-4"
            value={selectedAnswer?.toString()}
          >
            {agreementLevels.map(({ value, label }) => (
              <Label
                key={value}
                className="flex cursor-pointer items-center space-x-3 rounded-md border p-4 transition-colors active:bg-accent/50 md:hover:bg-accent/50 has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:text-accent-foreground"
              >
                <RadioGroupItem value={value.toString()} id={value.toString()} />
                <span className="font-medium">{label}</span>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex-col-reverse sm:flex-row gap-2">
          {currentQuestionIndex > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="w-full sm:w-auto"
              size="lg"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="w-full"
            size="lg"
          >
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Your Results"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
