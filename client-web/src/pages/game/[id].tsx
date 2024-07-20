import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const GamePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [gameState, setGameState] = useState('waiting');
  const [currentRound, setCurrentRound] = useState(0);
  const [headline, setHeadline] = useState('');
  const [punchlines, setPunchlines] = useState(['', '']);
  const [scores, setScores] = useState({});

  useEffect(() => {
    // TODO: Implement WebSocket connection to get real-time game updates
  }, [id]);

  const renderGameContent = () => {
    switch (gameState) {
      case 'waiting':
        return <p>Waiting for players to submit punchlines...</p>;
      case 'presenting':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Round {currentRound}</h2>
            <p className="text-xl mb-4">{headline}</p>
            <div className="flex justify-around">
              <div className="bg-white p-4 rounded shadow">
                <p className="font-bold">Punchline 1:</p>
                <p>{punchlines[0]}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <p className="font-bold">Punchline 2:</p>
                <p>{punchlines[1]}</p>
              </div>
            </div>
          </div>
        );
      case 'scoring':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Scores</h2>
            {Object.entries(scores).map(([player, score]) => (
              <p key={player}>
                {player}: {score}
              </p>
            ))}
          </div>
        );
      case 'gameOver':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Game Over</h2>
            <p>Winner: {Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0]}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Late Nyte Game: {id}</h1>
      {renderGameContent()}
    </div>
  );
};

export default GamePage;