import React from 'react';
import CustomButton from './CustomButton';
import card1 from '../../assets/Images/Know_your_progress.png';
import card2  from '../../assets/Images/Compare_with_others.png';
import card3 from '../../assets/Images/Plan_your_lessons.png';
import HighlightedText from './HighlightedText';
const SwissCards = () => {
    return (
        <div className='w-11/12 flex flex-col mx-auto items-center justify-center sm:gap-8 pt-10 sm:py-20'>
            <div className='flex flex-col gap-3 items-center '>
                <h3 className='text-4xl text-start sm:text-center font-semibold'>Your swiss knife for <HighlightedText text={'learning any language'}/></h3>
                <p className='text-start sm:text-center max-w-[700px] font-medium'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>
            <div className='flex flex-col mt-8 sm:mt-0 md:flex-row relative'>
                <div className='relative md:left-20'><img src={card1} alt="" /></div>
                <div className='relative md:top-0 -top-14'><img src={card2} alt="" /></div>
                <div className='relative -top-36 md:-top-4 md:right-32'><img src={card3} alt="" /></div>
            </div>  
            <div className='relative -top-32 sm:top-0'>
            <CustomButton active={true} linkTo={'/about'}>Learn More</CustomButton>
            </div>
        </div>
    );
}

export default SwissCards;
