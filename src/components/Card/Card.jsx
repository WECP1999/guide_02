import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ item, onClick }) => (
  <div className="card">
    <div className="card__header">
      <p>{item.amount}</p>
    </div>
    <div className="card__body">
      <p>{item.name}</p>
    </div>
    <div className="card__footer">
      <button className="card__footer__button" onClick={onClick}>
        x
      </button>
    </div>
  </div>
);

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

export default Card;
