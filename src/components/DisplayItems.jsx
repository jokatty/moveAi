/* eslint-disable prefer-const */
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
  let [totalVolume, setTotalVolume] = useState(0);

  function handleAddClick() {
    const cuboidSide = Math.max(length, width, height);
    setTotalVolume(totalVolume + (cuboidSide ** 3));
  }
  // calculate the container size
  function handleCalcClick() {
    let numOfFortyFtContainers = 0;
    let numOfTwentyFtContainer = 0;
    const volOf20FtContainer = 20 * 8 * 8.5;
    const volOf40FtContainer = 40 * 8 * 8.5;
    while (totalVolume > 0) {
      console.log('while loop runnin');
      if (totalVolume > volOf40FtContainer) {
        numOfFortyFtContainers += 1;
        totalVolume -= volOf40FtContainer;
      }
      else if (totalVolume > volOf20FtContainer && totalVolume < volOf40FtContainer) {
        numOfTwentyFtContainer += 1;
        totalVolume -= volOf20FtContainer;
      }
      else if (totalVolume <= volOf20FtContainer) {
        numOfTwentyFtContainer += 1;
        totalVolume -= volOf20FtContainer;
      }
    }
    let message = '';
    if (numOfFortyFtContainers >= 1) {
      message += `You need ${numOfFortyFtContainers}, 40ft.`;
    }
    if (numOfTwentyFtContainer >= 1) {
      message += `${numOfTwentyFtContainer}, 20ft containers.`;
    }
    setResultMessage(message);
    setTotalVolume(0);
    setLength(0);
    setWidth(0);
    setHeight(0);
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
      {resultMessage !== '' && (
      <p>
        {resultMessage}
      </p>
      )}
    </>
  );
}
