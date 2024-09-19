import { Button } from "@mui/material";
import { useQuestionStore } from "./store/questions";

const LIMIT_QUESTIONS = 10;

export const Start = () => {
	const getQuestions = useQuestionStore((state) => state.getQuestions);

	return (
		<Button
			onClick={() => {
				getQuestions(LIMIT_QUESTIONS);
			}}
			sx={{ marginTop: "45px" }}
			variant="contained"
		>
			¡Empezar!
		</Button>
	);
};
