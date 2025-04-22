import React from 'react';
import { Carousel } from 'antd';

const PostCardCarousel = (props) => {
    const medias = props.value.media
    return (
        <Carousel autoplay>
            {
                medias.map((media, index) => {
                    return(
                        media.secure_url.includes('image') ? 
                        <div>
                            <img src={media.secure_url} alt="slide1" />
                        </div>
                        :
                        <div>
                            <video autoPlay controls src={media.secure_url} alt="slide1" />
                        </div>
                    )
                })
            }
        </Carousel>
    );
};

export default PostCardCarousel;
