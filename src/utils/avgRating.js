export default (allRatings)=>{
    const ratingsSum=allRatings?.reduce((acc,ratingObject)=>acc+ratingObject.rating,0);
    const ratingCount=allRatings?.length;
    const avgRating=ratingsSum / ratingCount;
    return parseFloat(avgRating.toPrecision(2));

}