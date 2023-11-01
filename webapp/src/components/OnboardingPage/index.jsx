import React, { useState } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

import Introduction from '../Onboarding/Introduction/index.jsx';
import InformedConsent from '../Onboarding/InformedConsent/index.jsx';
import Instructions from '../Onboarding/Instructions/index.jsx';
import TestTask from '../Onboarding/TestTask/index.jsx';
import Survey from '../Onboarding/Survey/index.jsx';

export default function OnboardingPage({ initialTaskData, onSubmit }) {
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);
  const [testTaskHighlights, setTestTaskHiglights] = useState([]);

  const submitOnboardingTask = () => {
    const getFilteredHiglights = (aspectTitle) => {
      return testTaskHighlights
        .filter((hl) => hl.aspect.title === aspectTitle)
        .map((hl) => ({
          start: hl.start,
          end: hl.end,
        }));
    };

    onSubmit({
      Actor: getFilteredHiglights('Actor'),
      Action: getFilteredHiglights('Action'),
      Pattern: getFilteredHiglights('Pattern'),
      Threat: getFilteredHiglights('Threat'),
      Secrecy: getFilteredHiglights('Secrecy'),
    });
  };

  return (
    <CssVarsProvider>
      <Sheet
        className="AnnotationPage"
        variant="soft"
        sx={{
          height: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '5vh',
          paddingBottom: '5vh',
          p: 6,
        }}
      >
        {currentOnboardingStep === 0 && (
          <Introduction onContinue={() => setCurrentOnboardingStep(1)} />
        )}
        {currentOnboardingStep === 1 && (
          <InformedConsent onConsent={() => setCurrentOnboardingStep(2)} />
        )}
        {currentOnboardingStep === 2 && (
          <Instructions onContinue={() => setCurrentOnboardingStep(3)} />
        )}
        {currentOnboardingStep === 3 && (
          <TestTask
            initialTaskData={initialTaskData}
            setTestTaskHiglights={setTestTaskHiglights}
            onContinue={() => setCurrentOnboardingStep(4)}
          />
        )}
        {currentOnboardingStep === 4 && (
          <Survey handleSubmit={submitOnboardingTask} />
        )}
      </Sheet>
    </CssVarsProvider>
  );
}
