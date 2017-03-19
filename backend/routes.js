import express from 'express';
import App from './app';

const router = express.Router();

// Player's information
router.get('/player', (req, res) => {
  if (!req.query && !req.query.start && !req.query.end) {
    res.send('Bad request');
  }
  const startYear = req.query.start;
  const endYear = req.query.end;
  App.getPlayerInfo(startYear, endYear, (error, playerInfo) => {
    if (error) {
      res.send({ error: 'Oooops! Somehting went wrong!' });
    }
    res.send(playerInfo);
  });
});

module.exports = router;
