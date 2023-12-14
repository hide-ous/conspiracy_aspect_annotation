import React, { useRef, useEffect } from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

import QuestionsTable from './QuestionsTable/index.jsx';
import QuestionsList from './QuestionsList/index.jsx';
import Progress from './Progress/index.jsx';

export default function Survey({
  handleSubmit,
  page,
  setPage,
  answers,
  setAnswers,
  questions,
}) {
  const containerRef = useRef();

  // Scroll to top when survey page changes
  useEffect(() => {
    containerRef.current.scrollTo(0, 0);
  }, [page]);

  const likertScaleQuestions = questions.slice(0, 10).map((question) => ({
    question: question.question,
    options: question.options,
  }));

  const restQuestions = questions.slice(10);

  const areAllLikertQuestionsAnswered = answers
    .slice(0, likertScaleQuestions.length)
    .every((answer) => answer.answer);

  const areAllQuestionsAnswered = answers.every((answer) => answer.answer);

  const answeredQuestionCount = answers.filter(
    (answer) => answer.answer
  ).length;
  const totalQuestionCount = answers.length;
  const currentProgress = (answeredQuestionCount / totalQuestionCount) * 100;

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        overflowY: 'auto',
        p: 6,
        pt: 0,
        backgroundColor: '#f0f4f8',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          width: '100%',
          position: 'sticky',
          zIndex: 1,
          top: 0,
          pt: 6,
          backgroundColor: '#f0f4f8',
        }}
      >
        <Typography level="h2" marginBottom={2}>
          Survey
        </Typography>
      </Box>
      <Box
        sx={{
          width: 'calc(100vw - 96px)',
          position: 'sticky',
          zIndex: 1,
          top: '104px',
          backgroundColor: '#f0f4f8',
          pb: 2,
        }}
      >
        <Progress progress={currentProgress} />
      </Box>
      <Box
        sx={{
          width: '100%',
          position: 'sticky',
          zIndex: 1,
          top: '126px',
          backgroundColor: '#f0f4f8',
        }}
      >
        <Typography
          marginBottom={2}
          sx={{
            textAlign: 'center',
          }}
        >
          {page === 0
            ? 'Answer to which degree you agree with the following statements:'
            : 'Select the answer that best reflects your perception:'}
        </Typography>
      </Box>
      <Box marginBottom={10}>
        {page === 0 ? (
          <QuestionsTable
            questions={likertScaleQuestions}
            answers={answers}
            setAnswers={setAnswers}
          />
        ) : (
          <QuestionsList
            questions={restQuestions}
            answers={answers}
            setAnswers={setAnswers}
          />
        )}
      </Box>
      <Box>
        <Button
          sx={{
            width: 200,
          }}
          disabled={
            page === 0
              ? !areAllLikertQuestionsAnswered
              : !areAllQuestionsAnswered
          }
          onClick={() => {
            if (page === 0) {
              setPage(1);
            } else {
              handleSubmit(answers);
            }
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
