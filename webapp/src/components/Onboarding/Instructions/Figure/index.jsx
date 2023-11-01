import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function Figure({ imgSrc, title, caption, order }) {
  return (
    <Box>
      <Typography level="h4" color="neutral">
        Example
      </Typography>
      <figure
        style={{
          width: '100%',
          margin: 0,
          marginBottom: '1rem',
          overflow: 'hidden',
        }}
      >
        <img src={imgSrc} style={{ width: '100%' }} alt={title} />
        <figcaption>
          <b>Fig.{order}</b> {caption}
        </figcaption>
      </figure>
    </Box>
  );
}
