import React, { useState, useEffect, useRef } from 'react';

import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';

import Annotation from '../Annotation/index.jsx';
import Controls from '../Annotation/Controls/index.jsx';

import './styles.css';

const aspects = [
  {
    title: 'Actor',
    color: 'primary',
    numButton: 1,
  },
  {
    title: 'Action',
    color: 'success',
    numButton: 2,
  },
  {
    title: 'Pattern',
    color: 'neutral',
    numButton: 3,
  },
  {
    title: 'Threat',
    color: 'danger',
    numButton: 4,
  },
  {
    title: 'Secrecy',
    color: 'warning',
    numButton: 5,
  },
];

const text =
  'The Arkadiko Bridge or Kazarma Bridge is a Mycenaean bridge near the modern road from Tiryns to Epidauros in Argolis on the Peloponnese, Greece. The stone crossing, which is dated to the Greek Bronze Age, is one of the oldest arch bridges still in existence which is still crossable today. It is the oldest preserved bridge in Europe. The corbel arch bridge was constructed during the Mycenaean Period in a typical Cyclopean style contemporary to the Late Helladic period (III) (ca. 1300–1190 BC). The bridge, which is 22 m (72 ft) long, 5.60 m (18.4 ft) wide at the base and 4 m (13 ft) high, spans a 1 m (3 ft 3 in) culvert. The width of the roadway is about 2.50 metres (8 ft 2 in). The Arkadiko Bridge is one of four known Mycenaean corbel arch bridges near Arkadiko in Argolis. They are all of similar design and age and belong to the same Bronze Age highway between the two cities of Tiryns to Epidauros. One of them is the Petrogephyri bridge, which crosses the same stream 1 km (0.62 mi) to the west of the Arkadiko bridge.[4] The structure, which is otherwise similar in size and appearance, has a larger span and a slightly higher vault.';

export default function AnnotationPage() {
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
          text={text}
          aspects={aspects}
          highlights={highlights}
          setHighlights={setHighlights}
        />
        <Controls setHighlights={setHighlights} highlights={highlights} />
      </Sheet>
    </CssVarsProvider>
  );
}
