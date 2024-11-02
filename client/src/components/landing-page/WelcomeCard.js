import React from 'react';
import '../../styles/WelcomeCard.css';
import logoImage from '../../assets/images/logo.png';
import ShortPrimaryBtn from '../buttons/ShortPrimaryBtn';

const WelcomeCard = () => {
  return (
    <div className="card">
      <img src={logoImage} alt="logo.png" style={{ width: '100px', height: 'auto' }} />
      <p>Recipes at Your Fingertips - Cook Like a Pro!</p>
      <div className="button-container">
        <ShortPrimaryBtn text="Register" />
        <ShortPrimaryBtn text="Login" />
      </div>
    </div>
  );
};

export default WelcomeCard;
