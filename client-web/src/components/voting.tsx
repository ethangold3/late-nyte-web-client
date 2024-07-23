import React, { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';

const Voting = ({ gameId, roundNumber }) => {
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [punchlines, setPunchlines] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const socket = useSocket(gameId);

  useEffect(() => {
    if (socket) {
      socket.on('votingStart', ({ prompt, options }) => {
        setCurrentPrompt(prompt);
        setPunchlines(options);
        setTimeLeft(30);
      });

      socket.on('votingEnd', () => {
        setCurrentPrompt(null);
        setPunchlines([]);
      });
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [socket]);

  if (!currentPrompt) return null;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Vote for the best punchline!</h2>
      <p className="mb-4">{currentPrompt.text}</p>
      <div className="flex justify-around">
        {punchlines.map((punchline, index) => (
          <div key={index} className="text-center">
            <p className="mb-2">{punchline.text}</p>
            <p>By: {punchline.author}</p>
          </div>
        ))}
      </div>
      <p className="mt-4">Time left: {timeLeft} seconds</p>
    </div>
  );
};

export default Voting;