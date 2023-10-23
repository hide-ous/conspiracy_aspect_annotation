import React from 'react';

import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';

export default function AspectButtonsLst({
  aspects,
  currentAspect,
  setCurrentAspect,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: 0,
        paddingLeft: 3,
        paddingRight: 3,
        height: 70,
        backgroundColor: '#e3effb',
      }}
      color="primary"
    >
      {aspects.map((aspect) => (
        <Tooltip
          key={aspect.title}
          title={aspect.description}
          arrow
          variant="solid"
          color={aspect.color}
          placement="top"
        >
          <Button
            color={aspect.color}
            onClick={() => setCurrentAspect(aspect)}
            size="lg"
            sx={{
              textTransform: 'uppercase',
              outline:
                currentAspect.title === aspect.title ? '3px solid #F44336' : '',
            }}
          >
            {aspect.title}
            <Typography
              level="body-sm"
              color="white"
              sx={{
                marginLeft: 1,
              }}
            >
              <sub>{aspect.numButton}</sub>
            </Typography>
          </Button>
        </Tooltip>
      ))}
    </Box>
  );
}
