import { useQuestionStore } from "../store/questions";

export const useQuestionsData = () => {
	const questions = useQuestionStore((state) => state.questions);
	let correct = 0;
	let incorrect = 0;
	let unanswered = 0;

	for (const question of questions) {
		const { correctAnswer, userSelectedAnswer } = question;
		if (userSelectedAnswer == null) unanswered++;
		else if (userSelectedAnswer === correctAnswer) correct++;
		else incorrect++;
	}

	return {
		correct,
		incorrect,
		unanswered,
	};
};
