import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFullCourseDetails } from '../../../../services/operations/courseApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseInfo, setEditCourse,setStep } from '../../../../slices/courseSlice';
import RenderSteps from '../../addCourse/RenderSteps';
import toast from 'react-hot-toast';
import Spinner from '../../../comman/Spinner';

const EditCourse = () => {
    const params = useParams();
    const courseId = params.courseId;
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.course.loading);
    const courseInfo = useSelector((state) => state.course.courseInfo);
    useEffect(() => {
        // Reset course info when component unmounts
        return () => {
            dispatch(setCourseInfo(null));
            dispatch(setStep(1));
            dispatch(setEditCourse(false));
        };
    }, []);

    useEffect(() => {
        const fetchCourse = async () => {
            if (!courseId) return;
            
            const payload = {
                courseId
            }
            const fetchedCourse = await getFullCourseDetails(payload, dispatch);
            
            if (!fetchedCourse) {
                toast.error('Failed to load course data');
            } else {
                console.log('fetchedCourse', fetchedCourse);
                dispatch(setCourseInfo(fetchedCourse));
                dispatch(setEditCourse(true));
            }
        };

        if (!courseInfo) {
            fetchCourse();
        }
        
    }, [courseId, dispatch, courseInfo]);

    return courseInfo ? <RenderSteps/> : <Spinner/>
};

export default EditCourse;
