import React from 'react';

import LinearProgress from '@mui/joy/LinearProgress';
import Box from '@mui/joy/Box';

import './styles.css';

export default function Progress({ progress }) {
  return (
    <Box className="progressContainer">
      <LinearProgress determinate value={progress} />
    </Box>
  );
}
