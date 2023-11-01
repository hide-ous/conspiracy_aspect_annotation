import React from 'react';

import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/joy/IconButton';

import { aspects } from '../../../constants/main.js';

export default function AspectButtonsLst({
  currentAspect,
  setCurrentAspect,
  setIsHelpModalVisible,
  testTask,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#e3effb',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          padding: 0,
          paddingLeft: 3,
          height: 70,
          // backgroundColor: '#e3effb',
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
              disabled={testTask && aspect.title !== currentAspect.title}
              color={aspect.color}
              onClick={() => setCurrentAspect?.(aspect)}
              size="lg"
              sx={{
                textTransform: 'uppercase',
                outline:
                  currentAspect?.title === aspect.title
                    ? '3px solid #F44336'
                    : '',
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
      <Tooltip title="Show instructions" arrow variant="solid" placement="top">
        <IconButton
          size="lg"
          variant="plain"
          onClick={() => setIsHelpModalVisible(true)}
        >
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
