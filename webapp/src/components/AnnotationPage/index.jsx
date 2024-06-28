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
      handleSubmit({
        results: [...results, { text: texts[currentTextIndex].body, result }],
      });
    }
  };

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
