import {
	Card,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	Typography,
} from "@mui/material";
import { useQuestionStore } from "./store/questions";
import type { Question as QuestionType } from "./types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const Question = ({ info }: { info: QuestionType }) => {
	const selectAnswer = useQuestionStore((state) => state.selectAnswer);

	const createHandleClick = (answerIndex: number) => {
		selectAnswer(info.id, answerIndex);
	};

	const getBackgroundColor = (index: number) => {
		const { userSelectedAnswer, correctAnswer } = info;

		if (userSelectedAnswer == null) return "transparent";
		if (index !== correctAnswer && index !== userSelectedAnswer)
			return "transparent";
		if (index === correctAnswer) return "green";
		if (index === userSelectedAnswer) return "red";

		return "transparent";
	};

	return (
		<Card
			variant="outlined"
			sx={{ bgcolor: "#222", p: 2, textAlign: "left", marginTop: 4 }}
		>
			<Typography variant="h5">{info.question}</Typography>
			<SyntaxHighlighter language="javascript" style={gradientDark}>
				{info.code}
			</SyntaxHighlighter>
			<List sx={{ bgcolor: "#333" }} disablePadding>
				{info?.answers.map((answer, index) => (
					<ListItem key={index} disablePadding divider>
						<ListItemButton
							disabled={info.userSelectedAnswer != null}
							onClick={() => createHandleClick(index)}
							sx={{ backgroundColor: getBackgroundColor(index) }}
						>
							<ListItemText primary={answer} sx={{ textAlign: "center" }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Card>
	);
};

export const Game = () => {
	const questions = useQuestionStore((state) => state.questions);
	const currentQuestion = useQuestionStore((state) => state.currentQuestion);
	const goNextQuestion = useQuestionStore((state) => state.goNextQuestion);
	const goPreviousQuestion = useQuestionStore(
		(state) => state.goPreviousQuestion,
	);

	const questionInfo = questions[currentQuestion];

	return (
		<>
			<Stack
				direction="row"
				gap={2}
				alignItems="center"
				justifyContent="center"
				sx={{ marginTop: "10px" }}
			>
				<IconButton
					onClick={goPreviousQuestion}
					disabled={currentQuestion === 0}
				>
					<ArrowBackIosNew />
				</IconButton>
				{currentQuestion + 1} / {questions.length}
				<IconButton
					onClick={goNextQuestion}
					disabled={currentQuestion >= questions.length - 1}
				>
					<ArrowForwardIos />
				</IconButton>
			</Stack>
			<Question info={questionInfo} />
		</>
	);
};
