import ReactStars from 'react-stars'
import React from 'react'
 
const ratingChanged = (newRating) => {
  console.log(newRating)
}
const Stars = ({rating}) => {
    return (
        <ReactStars
  count={5}
  value={rating}
  onChange={ratingChanged}
  edit={false}
  size={24}
  half={true}
  color2={'#ffd700'} />
    );
}

export default Stars;




