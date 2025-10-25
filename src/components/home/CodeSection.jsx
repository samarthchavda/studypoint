import React from 'react';
import CodeBlock from './CodeBlock';
import CustomButton from './CustomButton';
import HighlightedText from './HighlightedText';
import { IoMdArrowRoundForward } from 'react-icons/io';
const CodeSection = ({flex,heading,para,btn1,btn2,codeBlock,codeColor,linkTo1,linkTo2}) => {
    return (
        <div className={`flex ${flex}  mx-auto gap-10 lg:px-10 `}>
                        <div className='lg:w-1/2 flex flex-col justify-center gap-4'>
                            <p className='text-4xl sm:text-center lg:text-start text-start text-white'>
                                {heading.text1} <HighlightedText text={heading.text2}/> {heading.text3}
                            </p>
                            <p className='sm:text-center text-start lg:text-start text-richblack-300 '> 
                                {para}</p>
                            <div className='flex sm:justify-center lg:justify-start justify-start mt-4 sm:mt-7 gap-4 '>
                                <CustomButton linkTo={linkTo1} active={true}>{btn1} <IoMdArrowRoundForward /></CustomButton>
                                <CustomButton linkTo={linkTo2} active={false}>{btn2}</CustomButton>
                            </div>
                        </div>

                        <div className='lg:w-1/2 text-xs leading-6 lg:p-4'>
                            <CodeBlock codeBlock={codeBlock} codeColor={codeColor}/>
                        </div>
                    </div>
    );
}

export default CodeSection;
