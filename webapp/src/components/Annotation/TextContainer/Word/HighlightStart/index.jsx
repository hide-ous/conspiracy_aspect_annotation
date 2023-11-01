import React from 'react';

import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';

export default function HighlightStart({
  currentAspect,
  onDelete,
  prevHighlightCount,
  id,
  setCurrentHighlightId,
  colors,
  readonly,
}) {
  return (
    <>
      <Chip
        sx={{
          position: 'absolute',
          top: 26 + 22 * prevHighlightCount,
          left: 0,
          zIndex: 1,
          userSelect: 'none',
        }}
        onMouseEnter={() => {
          setCurrentHighlightId(id);
          document.body.style.setProperty(
            '--current-highlight-color',
            colors[currentAspect.color]
          );
        }}
        onMouseLeave={() => {
          setCurrentHighlightId(null);
        }}
        size="sm"
        variant="solid"
        color={currentAspect.color}
        startDecorator={
          <ChipDelete
            onDelete={() => {
              if (readonly) {
                return;
              }

              onDelete();
            }}
          />
        }
      >
        {currentAspect.title}
      </Chip>
    </>
  );
}
