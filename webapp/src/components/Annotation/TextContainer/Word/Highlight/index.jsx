import React from 'react';

import Box from '@mui/joy/Box';

export default function Highlight({
  color,
  start,
  prevHighlightCount,
  colors,
}) {
  return (
    <Box
      color={color}
      sx={{
        position: 'absolute',
        left: start ? 5 : 0,
        right: 0,
        top: 36 + 22 * prevHighlightCount,
        width: '100%',
        height: 3,
        backgroundColor: colors[color],
        userSelect: 'none',
      }}
    />
  );
}
