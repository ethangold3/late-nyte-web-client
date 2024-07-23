import React, { useEffect, useState } from 'react';
import { webSocketService } from '../services/websockets';

const GameLobby = ({ gameId, onStartGame }) => {
  const [players, setPlayers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = webSocketService.connect(gameId);
    setSocket(newSocket);

    newSocket.on('gameUpdate', (game) => {
      setPlayers(game.players);
    });

    return () => {
      webSocketService.disconnect();
    };
  }, [gameId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Game Lobby</h2>
      <ul className="mb-4">
        {players.map((player) => (
          <li key={player.username}>{player.username}</li>
        ))}
      </ul>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onStartGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default GameLobby;