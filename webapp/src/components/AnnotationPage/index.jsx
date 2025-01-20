import React, { useState, useEffect, useRef } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

import Annotation from '../Annotation/index.jsx';
import Controls from '../Annotation/Controls/index.jsx';

import { aspects } from '../../constants/main';
import './styles.css';

export default function AnnotationPage({ taskData, handleSubmit }) {
  const [currentAspect, setCurrentAspect] = useState(aspects[0]);
  const [highlights, setHighlights] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [showDebriefing, setShowDebriefing] = useState(false); // New state

  const containerRef = useRef();
  let texts;
  try {
    texts = JSON.parse(taskData?.texts);
  } catch (error) {
    // console.log('error', error);
  }

  if (!texts) {
    return null;
  }

  useEffect(() => {
    containerRef.current.focus();
  }, []);

  // Reset aspect when changing text
  useEffect(() => {
    setCurrentAspect(aspects[0]);
  }, [currentTextIndex]);

  const switchAspectByKey = (key) => {
    const aspect = aspects.find((aspect) => aspect.numButton === +key);
    if (aspect) {
      setCurrentAspect(aspect);
    }
  };

  const saveResultsAndSwitchToNextText = (result) => {
    if (currentTextIndex < texts.length - 1) {
      setResults((prevResults) => [
        ...prevResults,
        { text: texts[currentTextIndex].body, result },
      ]);
      setCurrentTextIndex(currentTextIndex + 1);
    } else {
      // Show debriefing before submitting
      setResults((prevResults) => [
        ...prevResults,
        { text: texts[currentTextIndex].body, result },
      ]);
      setShowDebriefing(true);
    }
  };

  const handleFinalSubmit = () => {
    handleSubmit({ results });
  };

  if (showDebriefing) {
    return (
        <CssVarsProvider>
          <Sheet
              className="DebriefingPage"
              variant="soft"
              sx={{
                height: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5vh',
              }}
          >
            <h1>Debriefing</h1>
            <p style="text-align:center;">
              Thank you for your annotations. Please click the button to submit them for review and complete your assignment.
            </p>
            <p style="text-align:center;"> The texts you annotated were obtained from social media and may include false information and conspiracy theories. The authors of this task do not endorse them.</p>
              <p style="text-align:center;"> You may take this task multiple times. The next time you take this task, you will not need to fill in the onboarding survey.</p>
            <button
                onClick={handleFinalSubmit}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
            >
              Submit Results
            </button>
          </Sheet>
        </CssVarsProvider>
    );
  }

  return (
      <CssVarsProvider>
        <Sheet
            ref={containerRef}
            className="AnnotationPage"
            onKeyDown={(event) => {
              switchAspectByKey(event.key);
            }}
            tabIndex={0}
            variant="soft"
            sx={{
              height: '100%',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '5vh',
              paddingBottom: '5vh',
            }}
        >
          <Annotation
              currentAspect={currentAspect}
              setCurrentAspect={setCurrentAspect}
              text={texts?.[currentTextIndex]?.body}
              highlights={highlights}
              setHighlights={setHighlights}
              currentTextIndex={currentTextIndex}
              textCount={texts.length}
          />
          <Controls
              setHighlights={setHighlights}
              highlights={highlights}
              handleSubmit={saveResultsAndSwitchToNextText}
              text={texts?.[currentTextIndex]?.body}
          />
        </Sheet>
      </CssVarsProvider>
  );
}
