import React from 'react';
import { TypeAnimation } from 'react-type-animation';
const CodeBlock = ({ codeBlock, codeColor }) => {
    return (
        
        <div className='flex relative  '>
            <div className={`box1 backdrop-blur-2xl shadow-[1px_1px_300px_90px_rgba(71,165,197,1)] absolute top-24 left-24 h-1 w-1 rounded-full`}>
            </div>
            <div className='flex bg- flex-row w-full glass p-3 max-h-max'> 
            <div className=' w-[10%] text-[16px] flex flex-col items-center  text-richblack-200'>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
            </div>
            <div className='w-[90%] text-[16px] relative'>
                <div className=' h-full w-full absolute' >
                </div>
                <div className='className=blur-[10px]'>
                    <TypeAnimation
                        sequence={[
                            codeBlock,
                            1000,
                            ''
                        ]}
                        wrapper="span"
                        speed={80}
                        style={{ fontSize: '16px', display: 'inline-block', whiteSpace: "pre-line", color: codeColor }}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                    />
                </div>

            </div>

            </div>
            
        </div>

    );
}

export default CodeBlock;
