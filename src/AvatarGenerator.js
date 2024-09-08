import * as React from 'react';
import Avatar from '@mui/material/Avatar';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if(name===undefined || name === null)
  {
    return false;
  }
  const nameParts = name.split(' ');
  let initials;

  if (nameParts.length === 1) {
    initials = `${nameParts[0][0]}`;
  } else if (nameParts.length > 1) {
    initials = `${nameParts[0][0]}${nameParts[1][0]}`;
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

export default function AvatarGenerator({ userName,size }) {
  return (
    <>
      <Avatar
        {...stringAvatar(userName)}
        sx={{
          ...stringAvatar(userName).sx,
          ...(size === "md" && { width: 56, height: 56 }),
          ...(size === "xs" && { width: 28, height: 28 })
        }}
      />
    </>
  );
}
