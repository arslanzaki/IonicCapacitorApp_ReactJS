import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Image01 from "./../assets/image-01.png"
import Image02 from "./../assets/image-02.png"
import Image03 from "./../assets/image-03.png"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Intro.css"

interface ContainerProps {
    onFinish: () => void
}

const SwiperButtonNext = ({ children }: any) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>
}
const Intro: React.FC<ContainerProps> = ({onFinish}) => {

    return (
        <Swiper className="swiper">
            <SwiperSlide className='swiper-slide'>
                <img src={Image01} />
                <IonText>
                    <h5>Explore The Rental Listings In Your Area</h5>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>
            <SwiperSlide className='swiper-slide'>
                <img src={Image02} />
                <IonText>
                    <h5>Chat With The Listing Owner To Finalize Your Deal</h5>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>
            <SwiperSlide className='swiper-slide'>
                <img src={Image03} />
                <IonText>
                    <h5>Register As Owner To Boost Your Business</h5>
                </IonText>
                <IonButton onClick={()=> onFinish()}>Finish</IonButton>
            </SwiperSlide>
        </Swiper>
    );
};

export default Intro;