import React, { useState } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const [gameId, setGameId] = useState('');
  const router = useRouter();

  const handleJoinGame = () => {
    if (gameId) {
      router.push(`/game/${gameId}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Late Nyte Spectator View</h1>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="Enter Game ID"
          className="mb-2 p-2 border rounded"
        />
        <button
          onClick={handleJoinGame}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Join Game
        </button>
      </div>
    </div>
  );
};

export default HomePage;