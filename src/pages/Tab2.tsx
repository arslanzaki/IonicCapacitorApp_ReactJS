import { CreateAnimation, IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, createGesture, useIonViewDidEnter } from '@ionic/react';
import React, { useRef } from 'react';
import type { GestureDetail, Gesture } from '@ionic/react';

const Tab2: React.FC = () => {

    const animationRef = useRef<CreateAnimation>(null);
    const elementRef = useRef<HTMLDivElement>(null)

    useIonViewDidEnter(() => {
        animationRef.current?.animation.play();

        const gesture: Gesture = createGesture({
            el: elementRef.current!,
            threshold: 0,
            gestureName: "my-gesture",
            onStart: (ev: any) => onStartHandler(ev),
            onMove: (ev: any) => onMoveHandler(ev),
            onEnd: (ev: any) => onMoveEnd(ev)
        })
        gesture.enable();
    })

    const onStartHandler = (detail: GestureDetail) => {
        elementRef.current!.style.transition = "none";
    }
    const onMoveHandler = (detail: GestureDetail) => {
        const x = detail.currentX - detail.startX;
        const y = detail.currentY - detail.startY;
        elementRef.current!.style.transform = `translate(${x}px, ${y}px)`;
    }
    const onMoveEnd = (detail: GestureDetail) => {

        elementRef.current!.style.transition = '500ms ease-out';
        elementRef.current!.style.transform = 'translate(0px, 0px)';

    }



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="danger">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Tab 2</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <CreateAnimation ref={animationRef} duration={2000} iterations={Infinity} delay={1000} keyframes={[
                    { offset: 0, transform: 'scale(1)', opacity: "1" },
                    { offset: 0.5, transform: 'scale(1.05)', opacity: "0.5" },
                    { offset: 1, transform: 'scale(1)', opacity: "1" },
                ]}>
                    <IonButton expand="block" className='ion-margin' color={'success'}>
                        Join Us
                    </IonButton>
                </CreateAnimation>

                <div ref={elementRef} style={{ width: 50, height: 50, backgroundColor: "red" }}></div>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;