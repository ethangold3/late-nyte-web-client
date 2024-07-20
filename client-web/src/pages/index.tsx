import React, { useState, useEffect } from 'react';
import { createGame, startGame, updateNewsArticles} from '../services/api';
import { webSocketService } from '../services/websocket';


const HomePage = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (gameId) {
      const socket = webSocketService.connect(gameId);

      socket.on('gameUpdate', (updatedGame) => {
        console.log('Received game update:', updatedGame);
        setPlayers(updatedGame.players.map((p: any) => p.username));
      });

      return () => {
        console.log('Cleaning up WebSocket connection');
        webSocketService.disconnect();
      };
    }
  }, [gameId]);

  const handleCreateGame = async () => {
    try {
      const result = await createGame();
      const newsResult = await updateNewsArticles();
      setGameId(result.gameId);
      setError(null);
    } catch (err) {
      setError('Failed to create game. Please try again.');
      console.error('Error creating game:', err);
    }
  };

  const handleStartGame = async () => {
    if (!gameId) return;

    try {
      await startGame(gameId);
      // Here you would typically navigate to the game screen or update the UI
      console.log('Game started!');
    } catch (err) {
      setError('Failed to start game. Please try again.');
      console.error('Error starting game:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Late Nyte Web</h1>
      {!gameId ? (
        <button
          onClick={handleCreateGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Game
        </button>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Created!</h2>
          <p className="text-xl mb-2">Game ID:</p>
          <p className="text-3xl font-bold mb-4">{gameId}</p>
          <p className="mb-4">Share this Game ID with players to join on their mobile devices.</p>
          
          <h3 className="text-xl font-bold mb-2">Players Joined:</h3>
          {players.length === 0 ? (
            <p>Waiting for players to join...</p>
          ) : (
            <ul className="mb-4">
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          )}
          
          <button
            onClick={handleStartGame}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={players.length === 0}
          >
            Start Game
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default HomePage;