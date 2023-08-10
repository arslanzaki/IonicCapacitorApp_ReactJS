import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logInOutline, personCircleOutline } from "ionicons/icons";
import ionicLogo from "./../assets/ionic-logo.png";
import React, { useState } from 'react';
import Intro from '../components/Intro';

const Login: React.FC = () => {
    const [isIntroSeen, setIsIntroSeen] = useState(false);

    const doLogin = (event: any) => {
        event.preventDefault();
        console.log("doLogin")
    }

    const finishIntro = async() =>{
        console.log("FIN");
        setIsIntroSeen(true)
    }

    return (
        <>

            {!isIntroSeen ? <Intro onFinish={finishIntro}/> : (<IonPage>
                <IonHeader>
                    <IonToolbar color={"danger"}>
                        <IonTitle>Login Screen</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding" scrollY={false}>
                    <IonCard>
                        <IonCardContent>
                            <IonImg src={ionicLogo} />
                            <form onSubmit={doLogin}>
                                <IonInput fill="outline" label="Email" labelPlacement="floating" type="email" placeholder="johndoe@gmail.com" />
                                <IonInput className="ion-margin-top" fill="outline" label="Password" labelPlacement="floating" type="password" />
                                <IonButton className='ion-margin-top' color='danger' expand="block">
                                    Login
                                    <IonIcon icon={logInOutline} />
                                </IonButton>
                                <IonButton routerLink='/register' className='ion-margin-top' color='tertiary' expand="block">
                                    Register
                                    <IonIcon icon={personCircleOutline} />
                                </IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </IonContent>

                <IonFooter>
                    <IonToolbar>

                    </IonToolbar>
                </IonFooter>
            </IonPage>)}

        </>

    );
};

export default Login;