/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

export default function DisplayItems({ items }) {
  // local state
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  // global state
  // 8ft (2.43m) wide, 8.5ft (2.59m) high
  // 20ft (6.06m) and 40ft (12.2m).
  const [totalLength, setTotalLength] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);

  function handleAddClick() {
    setTotalLength(Number(totalLength) + (Number(length)));
    console.log(totalLength);
    setLength(0);
    setTotalWidth(Number(totalWidth) + Number(width));
    console.log(totalWidth);
    setWidth(0);
    setTotalHeight(Number(totalHeight) + Number(height));
    console.log(totalHeight);
    setHeight(0);
  }
  // calculate the container size
  function handleCalcClick() {
    let numOfFortyFtContainers = 0;
    let numOfTwentyFtContainer = 0;
    let length = totalLength;
    while (length > 0) {
      if (length > 40) {
        length -= 40;
        numOfFortyFtContainers += 1;
      }
      if (length > 20 && length <= 40) {
        length -= Math.round(length / 40);
        numOfFortyFtContainers += 1;
      }
      if (length <= 20) {
        length -= Math.round(length / 20);
        numOfTwentyFtContainer += 1;
      }
    }
    let message = '';
    if (numOfFortyFtContainers >= 1) {
      message += `You need ${numOfFortyFtContainers} 40ft container`;
    }
    if (numOfTwentyFtContainer >= 1) {
      message += `and ${numOfTwentyFtContainer} 20ft containers`;
    }
    setResultMessage(message);
  }
  return (
    <>
      {items.map((item) => (
        <>
          <h3>{item}</h3>
          <label htmlFor="length">length</label>
          <input id="length" onChange={(e) => { setLength(e.target.value); }} />
          <label htmlFor="width">width</label>
          <input id="width" onChange={(e) => { setWidth(e.target.value); }} />
          <label htmlFor="height">height</label>
          <input id="height" onChange={(e) => { setHeight(e.target.value); }} />
          <button type="button" onClick={handleAddClick}>add</button>
        </>
      ))}
      <button type="button" onClick={handleCalcClick}>Calculate container size</button>
      {resultMessage !== '' && <p>{resultMessage}</p>}
    </>
  );
}
