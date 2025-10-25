import { useEffect, useState } from "react";

export default function useFilePreview(file){
    const [imgSrc,setImgSrc]=useState(null);
    useEffect(() => {
        if(file && file[0]){
            const newImgSrc=URL.createObjectURL(file[0]);
            if(imgSrc!=newImgSrc)
                setImgSrc(newImgSrc); 
        }
    }, [file]);

    return [imgSrc,setImgSrc];
}