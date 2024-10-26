import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import Annotation from '../../../Annotation/index.jsx';
import Controls from '../../../Annotation/Controls/index.jsx';

export default function TaskUi({
  tasks,
  currentTaskIndex,
  currentAspect,
  text,
  highlights,
  setHighlights,
  showExpectedResulAndSaveActualResult,
}) {
  return (
    <Box>
      <Typography level="h2" marginBottom={2}>
        Test task
      </Typography>
      <Typography level="h3" marginBottom={3}>
        Annotate {tasks[currentTaskIndex].aspectTitle}
      </Typography>
      <Typography marginBottom={3}>
        {tasks?.[currentTaskIndex]?.description}
      </Typography>
      <Typography level="h3" marginBottom={2}>
        Example
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 4,
        }}
      >
        <Annotation
          textContainerClass={tasks?.[currentTaskIndex].aspectTitle}
          readonly
          highlights={tasks?.[currentTaskIndex].exampleHighlights}
          text={tasks?.[currentTaskIndex].exampleText}
          height={tasks?.[currentTaskIndex].exampleHeight}
        />
      </Box>
      <Typography level="h3" marginBottom={2}>
        Try it yourself
      </Typography>
      <Box>
        <Annotation
          noCounter
          testTask
          currentAspect={currentAspect}
          textContainerClass="task"
          text={text}
          highlights={highlights}
          setHighlights={setHighlights}
          textCount={tasks.length}
          currentTextIndex={currentTaskIndex}
        />
        <Controls
          testTask
          noSkip
          highlights={highlights}
          setHighlights={setHighlights}
          handleSubmit={showExpectedResulAndSaveActualResult}
          text={text}
        />
      </Box>
    </Box>
  );
}
