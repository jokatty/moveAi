/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, TextField, Alert, AlertTitle } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import UserAuth from './UserAuth.jsx';
import { ImageContext, storeCost } from '../store.js';

export default function DisplayItems({ items }) {
  // const userLoggedIn = document.cookie;
  // console.log('cookie', userLoggedIn);
  const { dispatch } = useContext(ImageContext);
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
      message += ` ${numOfFortyFtContainers} container, size 40ft.`;
    }
    if (numOfTwentyFtContainer >= 1) {
      message += ` ${numOfTwentyFtContainer} container, size 20ft `;
    }
    setResultMessage(message);
    const costOf20ftCont = 2 * numOfTwentyFtContainer;
    const costOf40ftCont = 3 * numOfFortyFtContainers;
    dispatch(storeCost((Math.min(costOf20ftCont, costOf40ftCont)), (Math.max(costOf20ftCont, costOf40ftCont))));
    setCostMessage(`your shipping cost will between USD ${(Math.min(costOf20ftCont, costOf40ftCont))}K - ${(Math.max(costOf20ftCont, costOf40ftCont))}K `);
    setTotalVolume(0);
  }

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Enter the largest dimension in `Feets` against items.
      </Typography>

      {/* <ol>
        {items.map((item) => (
          <li>
            <span>{item}</span>
            <input placeholder="largest dimension" onChange={(e) => { setTotalVolume(totalVolume + (e.target.value ** 3)); }} />
          </li>
        ))}
      </ol> */}
      <Card sx={{ mb: 5 }}>
        <CardContent>
          {items.map((item) => (
            <Grid container direction="row" spacing={4}>
              <Grid item xs={8}>
                <Typography gutterBottom variant="h6" component="div">
                  {item}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField id="standard-basic" label="Largest dimension" variant="standard" onChange={(e) => { setTotalVolume(totalVolume + (e.target.value ** 3)); }} />
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>
      <Button
        variant="contained"
        size="large"
        startIcon={<CalculateIcon />}
        onClick={handleCalcClick}
      >
        Calculate container size
      </Button>
      {resultMessage !== '' && (
      <div>
        {/* <p>
          {resultMessage}
        </p>
        <p>{costMessge}</p> */}
        <Alert severity="success">
          <AlertTitle>{resultMessage}</AlertTitle>
          {costMessge}
          <strong>{resultMessage !== '' && <UserAuth />}</strong>
        </Alert>
      </div>
      )}
      {/* {resultMessage !== '' && <UserAuth />} */}
    </>
  );
}
