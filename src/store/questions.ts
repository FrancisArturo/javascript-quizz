import { create } from "zustand";
import type { Question } from "../types";
import confetti from "canvas-confetti";
import { persist, devtools } from "zustand/middleware";

interface State {
	questions: Question[];
	currentQuestion: number;
	getQuestions: (limit: number) => Promise<void>;
	selectAnswer: (questionId: number, answerIndex: number) => void;
	goNextQuestion: () => void;
	goPreviousQuestion: () => void;
	reset: () => void;
}

export const useQuestionStore = create<State>()(
	devtools(
		persist(
			(set, get) => {
				return {
					questions: [],
					currentQuestion: 0,
					getQuestions: async (limit: number) => {
						const res = await fetch("http://localhost:5173/data.json");
						const data = await res.json();
						const questions = data
							.sort(() => Math.random() - 0.5)
							.slice(0, limit);
						set(
							{
								questions,
							},
							false,
							"FETCH_QUESTIONS",
						);
					},
					selectAnswer: (questionId: number, answerIndex: number) => {
						{
							const { questions } = get();
							const newQuestions = structuredClone(questions);

							const questionIndex = newQuestions.findIndex(
								(question) => question.id === questionId,
							);
							const questionInfo = newQuestions[questionIndex];
							const isCorrectUserAnswer =
								questionInfo.correctAnswer === answerIndex;
							if (isCorrectUserAnswer) confetti();

							newQuestions[questionIndex] = {
								...questionInfo,
								isCorrectUserAnswer,
								userSelectedAnswer: answerIndex,
							};

							set(
								{
									questions: newQuestions,
								},
								false,
								"SELECT_ANSWER",
							);
						}
					},
					goNextQuestion: () => {
						const { currentQuestion, questions } = get();
						const nextQuestion = currentQuestion + 1;
						if (nextQuestion < questions.length) {
							set({ currentQuestion: nextQuestion }, false, "GO_NEXT_QUESTION");
						}
					},
					goPreviousQuestion: () => {
						const { currentQuestion } = get();
						const previousQuestion = currentQuestion - 1;
						if (previousQuestion >= 0) {
							set(
								{ currentQuestion: previousQuestion },
								false,
								"GO_PREVIOUS_QUESTION",
							);
						}
					},
					reset: () => {
						set(
							{
								currentQuestion: 0,
								questions: [],
							},
							false,
							"RESET",
						);
					},
				};
			},
			{
				name: "questions",
			},
		),
	),
);
