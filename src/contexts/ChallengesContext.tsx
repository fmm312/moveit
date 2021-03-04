import { createContext, useState, ReactNode } from 'react';
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
}

export const ChallengesContext = createContext({} as ChallengesContextProps);

export function ChallengesProvider({children } : ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(30);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randonChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randonChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
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
        experienceToNextLevel
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}