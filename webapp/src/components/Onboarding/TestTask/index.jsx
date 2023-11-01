import React, { useState, useMemo } from 'react';

import Box from '@mui/joy/Box';

import TaskUi from './TaskUi/index.jsx';
import ExpectedResult from './ExpectedResult/index.jsx';

import {
  aspectDescriptions,
  exampleAspects,
  aspects,
} from '../../../constants/main';

const createExpectedHighlights = (aspectType, onboardingData) => {
  const expectedHighlights = onboardingData[aspectType].map((hl) => {
    return {
      id: hl.id,
      start: hl.start,
      end: hl.end,
      aspect: aspects.find((a) => a.title === aspectType),
    };
  });

  return expectedHighlights;
};

const generateTasks = (onboardingData) => {
  return [
    {
      aspectTitle: 'Actor',
      description: aspectDescriptions[0].description,
      exampleText: exampleAspects.Actor.text,
      exampleHighlights: exampleAspects.Actor.highlights,
      exampleHeight: 194,
      resultHeight: 330,
      expectedHighlights: createExpectedHighlights('Actor', onboardingData),
    },
    {
      aspectTitle: 'Action',
      description: aspectDescriptions[1].description,
      exampleText: exampleAspects.Action.text,
      exampleHighlights: exampleAspects.Action.highlights,
      exampleHeight: 113,
      resultHeight: 330,
      expectedHighlights: createExpectedHighlights('Action', onboardingData),
    },
    {
      aspectTitle: 'Pattern',
      description: aspectDescriptions[3].description,
      exampleText: exampleAspects.Pattern.text,
      exampleHighlights: exampleAspects.Pattern.highlights,
      exampleHeight: 222,
      resultHeight: 302,
      expectedHighlights: createExpectedHighlights('Pattern', onboardingData),
    },
    {
      aspectTitle: 'Threat',
      description: aspectDescriptions[2].description,
      exampleText: exampleAspects.Threat.text,
      exampleHighlights: exampleAspects.Threat.highlights,
      exampleHeight: 249,
      resultHeight: 302,
      expectedHighlights: createExpectedHighlights('Threat', onboardingData),
    },
    {
      aspectTitle: 'Secrecy',
      description: aspectDescriptions[4].description,
      exampleText: exampleAspects.Secrecy.text,
      exampleHighlights: exampleAspects.Secrecy.highlights,
      exampleHeight: 195,
      resultHeight: 330,
      expectedHighlights: createExpectedHighlights('Secrecy', onboardingData),
    },
  ];
};

export default function TestTask({
  onContinue,
  setTestTaskHiglights,
  initialTaskData,
}) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [highlights, setHighlights] = useState([]);
  const [currentAspect, setCurrentAspect] = useState(aspects[0]);
  const [isResultMode, setIsResultMode] = useState(false);

  const tasks = useMemo(
    () => generateTasks(initialTaskData),
    [initialTaskData]
  );

  const getPreviousHighlights = (taskIndex) => {
    const previousHighlights = [];
    for (let i = 0; i < taskIndex; i++) {
      previousHighlights.push(...tasks[i].expectedHighlights);
    }

    return previousHighlights.map((hl) => ({ ...hl, readonly: true }));
  };

  const switchToNextTask = () => {
    if (currentTaskIndex === tasks.length - 1) {
      onContinue();
      return;
    }

    const nextTaskIndex = currentTaskIndex + 1;
    setIsResultMode(false);
    setCurrentAspect(aspects[nextTaskIndex]);
    setCurrentTaskIndex(nextTaskIndex);
    setHighlights(getPreviousHighlights(nextTaskIndex));
  };

  const showExpectedResulAndSaveActualResult = () => {
    setIsResultMode(true);
    setTestTaskHiglights((prevHighlights) => {
      const newHighlights = highlights.filter((hl) => {
        return `${hl.id}`.startsWith('0.');
      });

      return [...prevHighlights, ...newHighlights];
    });
  };

  return (
    <Box
      sx={{
        maxWidth: '900px',
      }}
    >
      {isResultMode ? (
        <ExpectedResult
          text={initialTaskData?.text}
          highlights={tasks?.[currentTaskIndex]?.expectedHighlights}
          switchToNextTask={switchToNextTask}
          height={tasks?.[currentTaskIndex].resultHeight}
        />
      ) : (
        <TaskUi
          tasks={tasks}
          currentTaskIndex={currentTaskIndex}
          currentAspect={currentAspect}
          text={initialTaskData?.text}
          highlights={highlights}
          setHighlights={setHighlights}
          showExpectedResulAndSaveActualResult={
            showExpectedResulAndSaveActualResult
          }
        />
      )}
    </Box>
  );
}
