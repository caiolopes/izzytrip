import React from 'react';
import Cards, { Card } from 'react-swipe-card'
import './styles.css';

const data = ['Alexandre', 'Thomas', 'Lucien'];

const SwipeDeck = () => {
  return (
    <div>
      <Cards onEnd={() => console.log('end')} className='master-root'>
        {data.map((item, key) =>
          <Card
            onSwipeLeft={() => console.log('left')}
            onSwipeRight={() => console.log('right')}
            key={key}>
            <h2>{item}</h2>
          </Card>
        )}
      </Cards>
    </div>
  )
}

export default SwipeDeck;
