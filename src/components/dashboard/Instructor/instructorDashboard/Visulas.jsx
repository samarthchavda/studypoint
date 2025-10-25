import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const randomColors=(numColors)=>{
    let colors = [];
    for(let i = 0; i < numColors; i++) {
        const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},0.5)`;
        colors.push(randomColor);
    }
    return colors;
}

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 20,
                    color: '#AFB2BF', // richblack-300
                }
            }
        }
    }
const Visulas = ({courses,type}) => {
    const data ={
    labels:courses?.map((course) => course.name),
    datasets:[
        {
            label:type==="students"?"no. of students":"income of course",
            data:type==='students'? courses?.map((course) => course.noOfStudents): courses?.map((course) => course.courseIncome),
            backgroundColor: randomColors(courses?.length),
        }
    ]
}
    return (
        <div className='h-fit'>
            <Pie options={{
           
                maintainAspectRatio:false,
            }} height={'300'} data={data}/>
        </div>
    );
}

export default Visulas;
