import React from 'react';

const Scoreboard = ({ players, isGameOver }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {isGameOver ? "Final Scores" : "Current Scores"}
      </h2>
      <ul>
        {sortedPlayers.map((player, index) => (
          <li key={player.username} className="mb-2">
            {index + 1}. {player.username}: {player.score} points
          </li>
        ))}
      </ul>
      {isGameOver && (
        <p className="mt-4 text-xl font-bold">
          Winner: {sortedPlayers[0].username}!
        </p>
      )}
    </div>
  );
};

export default Scoreboard;