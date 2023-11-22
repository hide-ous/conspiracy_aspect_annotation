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

  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.focus();
  }, []);

  const switchAspectByKey = (key) => {
    const aspect = aspects.find((aspect) => aspect.numButton === +key);
    if (aspect) {
      setCurrentAspect(aspect);
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
          text={taskData?.body}
          highlights={highlights}
          setHighlights={setHighlights}
        />
        <Controls
          setHighlights={setHighlights}
          highlights={highlights}
          handleSubmit={handleSubmit}
          text={taskData?.body}
        />
      </Sheet>
    </CssVarsProvider>
  );
}
