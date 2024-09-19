import { Container, Stack, Typography } from "@mui/material";
import { JavaScriptLogo } from "./JavaScriptLogo";
import "./App.css";

import { Game } from "./Game";
import { Start } from "./Start";
import { useQuestionStore } from "./store/questions";
import { Footer } from "./Footer";
import { useQuestionsData } from "./hooks/useQuestionsData";
import { Results } from "./Results";

function App() {
	const questions = useQuestionStore((state) => state.questions);
	const { unanswered } = useQuestionsData();

	return (
		<>
			<main>
				<Container maxWidth="sm">
					<Stack
						direction="row"
						gap={2}
						alignItems="center"
						justifyContent="center"
					>
						<JavaScriptLogo />
						<Typography variant="h2" component="h1">
							JavaScript Quizz
						</Typography>
					</Stack>
					{questions.length === 0 && <Start />}
					{questions.length > 0 && <Game />}
					{unanswered === 0 && questions.length > 0 && <Results />}
				</Container>
			</main>
			{questions.length > 0 && unanswered !== 0 && <Footer />}
		</>
	);
}

export default App;
