import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { webSocketService } from '../../services/websockets';
import GameLobby from '../../components/GameLobby';
import RoundProgress from '../../components/RoundProgress';
import Voting from '../../components/Voting';
import Scoreboard from '../../components/Scoreboard';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState('lobby');
  const [gameData, setGameData] = useState<any>(null);
  const router = useRouter();
  const { id: gameId } = router.query;
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    if (gameId) {
      const newSocket = webSocketService.connect(gameId as string);
      setSocket(newSocket);

      newSocket.on('gameUpdate', (updatedGame) => {
        setGameData(updatedGame);
        setGameState(updatedGame.status);
      });

      return () => {
        webSocketService.disconnect();
      };
    }
  }, [gameId]);

  const renderGameComponent = () => {
    switch (gameState) {
      case 'waiting':
        return <GameLobby gameId={gameId as string} onStartGame={() => socket?.emit('startGame', gameId)} />;
      case 'in-progress':
        return <RoundProgress gameId={gameId as string} roundNumber={gameData?.currentRound} />;
      case 'voting':
        return <Voting gameId={gameId as string} roundNumber={gameData?.currentRound} />;
      case 'completed':
        return <Scoreboard players={gameData?.players} isGameOver={true} />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Late Nyte Game</h1>
      {renderGameComponent()}
    </div>
  );
};

export default Game;