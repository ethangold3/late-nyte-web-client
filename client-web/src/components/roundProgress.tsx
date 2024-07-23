import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';

const RoundProgress = ({ gameId, roundNumber }) => {
  const [players, setPlayers] = useState([]);
  const [submittedPlayers, setSubmittedPlayers] = useState([]);
  const socket = useSocket(gameId);

  useEffect(() => {
    if (socket) {
      socket.on('gameUpdate', (game) => {
        setPlayers(game.players);
        const currentRound = game.rounds[roundNumber - 1];
        const submitted = currentRound.punchlines.map(p => p.author);
        setSubmittedPlayers(submitted);
      });
    }
  }, [socket, roundNumber]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Round {roundNumber} Progress</h2>
      <ul>
        {players.map((player) => (
          <li key={player.username} className="mb-2">
            {player.username}: 
            {submittedPlayers.includes(player.username) 
              ? " Submitted ✅" 
              : " Waiting..."}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoundProgress;