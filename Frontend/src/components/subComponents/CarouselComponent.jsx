import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselComponent = (props) => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const { uploadImages } = props.value
    return (
        <Carousel 
            responsive={responsive}
            showDots={false}
            arrows={true}
            swipeable={false}
            draggable={false}
        >
            {
                uploadImages.map((imgObj, index) => {
                    return (<div key={index} className='h-full flex flex-row items-center'>
                        {imgObj.type.includes('image' )?<img src={URL.createObjectURL(imgObj)} alt={`Item${index+1}`}/> : <video src={URL.createObjectURL(imgObj)} controls ></video>}
                        </div>)
                })
            }
        </Carousel>
    )
}

export default CarouselComponent
