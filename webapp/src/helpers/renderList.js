import React from 'react';

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';

// This funcion renders a list of items, where each item can be a string or an array of strings.
// If an item is an array of strings, it will be rendered as a nested list.
const renderList = (items, callCount = 0) => {
  const markers = [
    'disc',
    'circle',
    'square',
    'decimal',
    'lower-alpha',
    'lower-roman',
    'upper-alpha',
    'upper-roman',
  ];

  return (
    <List
      marker={markers[callCount] || 'disc'}
      sx={{ marginBottom: callCount === 0 ? 2 : 0, position: 'relative' }}
    >
      {items.map((item, index) => {
        if (Array.isArray(item)) {
          return (
            <ListItem key={index} nested>
              <ListItem>{item[0]}</ListItem>
              {renderList(item.slice(1), callCount + 1)}
            </ListItem>
          );
        } else {
          return <ListItem key={index}>{item}</ListItem>;
        }
      })}
    </List>
  );
};

export default renderList;
