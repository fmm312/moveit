import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://media-exp1.licdn.com/dms/image/C4D03AQGel8yOUc8F9A/profile-displayphoto-shrink_200_200/0/1611058603477?e=1620259200&v=beta&t=tFWRTWpuzVs2yvZ7sl_xHc-0VitrUSctc1YQTe4KxWM" />
      <div>
        <strong>Felipe Menezes</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}