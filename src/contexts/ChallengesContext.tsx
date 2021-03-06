import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
  children: ReactNode
}

interface Challenge {
  type: 'body' | 'eye',
  description: string;
  amount: number
}

interface ChallengesContextProps {
  level: number, 
  levelUp: () => void, 
  currentExperience: number,
  challengesCompleted: number,
  experienceToNextLevel: number,
  startNewChallenge: () => void,
  activeChallenge: Challenge,
  resetChallenge: () => void;
  completeChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextProps);

export function ChallengesProvider({children } : ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function levelUp() {
    setLevel(level + 1);
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function startNewChallenge() {
    const randonChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randonChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount} xp`
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider 
      value={{
        level, 
        levelUp, 
        currentExperience, 
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}