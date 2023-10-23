import React, { useState } from 'react';

import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';

import AspectButtonsLst from './AspectButtonsList/index.jsx';
import TextContainer from './TextContainer/index.jsx';

export default function Annotation({
  aspects,
  text,
  currentAspect,
  setCurrentAspect,
  highlights,
  setHighlights,
}) {
  const [currentHighlightId, setCurrentHighlightId] = useState(null);

  return (
    <Box
      sx={{
        width: 900,
      }}
    >
      <Card sx={{ padding: 0, overflow: 'hidden' }}>
        <AspectButtonsLst
          aspects={aspects}
          currentAspect={currentAspect}
          setCurrentAspect={setCurrentAspect}
        />
        <TextContainer
          currentAspect={currentAspect}
          text={text}
          setHighlights={setHighlights}
          highlights={highlights}
          currentHighlightId={currentHighlightId}
          setCurrentHighlightId={setCurrentHighlightId}
        />
      </Card>
    </Box>
  );
}
