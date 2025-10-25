import React from 'react';

const BluredSphere = ({color1,color2,height,width,top,left,bottom,right}) => {
    return (
        <div
        style={{
            backgroundImage:`linear-gradient(to right, ${color1}, ${color2})`,
            height:`${height?height:"208px"}`,
            width:`${width?width:"208px"}`,
            top:`${top?top:""}`,
            bottom:`${bottom?bottom:""}`,
            left:`${left?left:""}`,
            right:`${right?right:""}`,
        }}
         className="blur-3xl absolute"></div>
    );
}

export default BluredSphere;
