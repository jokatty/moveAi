/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
import React from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function Image({ uploadedImage }) {
  return (
    <ImageList cols={3}>
      {uploadedImage.map((image) => (
        <ImageListItem>
          <img
            src={image}
            loading="lazy"
            style={{ width: '500px', height: '350px' }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
