/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import UserAuth from './UserAuth.jsx';

export default function DisplayItems({ items }) {
  // local state
  console.log('display items comp', items);
  const [resultMessage, setResultMessage] = useState('');
  const [costMessge, setCostMessage] = useState('');
  // global state
  // 8ft (2.43m) wide, 8.5ft (2.59m) high
  // 20ft (6.06m) and 40ft (12.2m).
  let [totalVolume, setTotalVolume] = useState(0);

  // calculate the container size
  function handleCalcClick() {
    let numOfFortyFtContainers = 0;
    let numOfTwentyFtContainer = 0;
    const volOf20FtContainer = 20 * 8 * 8.5;
    const volOf40FtContainer = 40 * 8 * 8.5;
    while (totalVolume > 0) {
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
    let message = 'You need';
    if (numOfFortyFtContainers >= 1) {
      message += `${numOfFortyFtContainers} container, size 40ft.`;
    }
    if (numOfTwentyFtContainer >= 1) {
      message += `${numOfTwentyFtContainer} container, size 20ft `;
    }
    setResultMessage(message);
    setCostMessage('your shipping cost will between USD 2K - 3K ');
    setTotalVolume(0);
  }

  return (
    <>
      <h3>Enter the largest dimension in `Feets` against items.</h3>
      <ol>
        {items.map((item) => (
          <li>
            <span>{item}</span>
            <input placeholder="largest dimension" onChange={(e) => { setTotalVolume(totalVolume + (e.target.value ** 3)); }} />
          </li>
        ))}
      </ol>
      <button type="button" onClick={handleCalcClick}>Calculate container size</button>
      {resultMessage !== '' && (
      <div>
        <p>
          {resultMessage}
        </p>
        <p>{costMessge}</p>
        <UserAuth />
      </div>
      )}
    </>
  );
}
