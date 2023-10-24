import React, { useState } from 'react';

import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';

import AspectButtonsLst from './AspectButtonsList/index.jsx';
import TextContainer from './TextContainer/index.jsx';
import HelpModal from '../../modals/HelpModal/index.jsx';

export default function Annotation({
  aspects,
  text,
  currentAspect,
  setCurrentAspect,
  highlights,
  setHighlights,
}) {
  const [currentHighlightId, setCurrentHighlightId] = useState(null);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);

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
          setIsHelpModalVisible={setIsHelpModalVisible}
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
      <HelpModal
        isOpen={isHelpModalVisible}
        setIsOpen={setIsHelpModalVisible}
      />
    </Box>
  );
}
