import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInput, IonPage, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import { logInOutline, personCircleOutline } from "ionicons/icons";
import ionicLogo from "./../assets/ionic-logo.png";
import React, { useEffect, useState } from 'react';
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
    const router = useIonRouter();
    const [isIntroSeen, setIsIntroSeen] = useState(false);
    const [present, dismiss] = useIonLoading();

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key: INTRO_KEY });
            setIsIntroSeen(seen.value === 'true')
        }
        checkStorage();

    }, [])

    const doLogin = async (event: any) => {
        event.preventDefault();
        await present("Logging In...");
        setTimeout(()=>{
            dismiss();
            router.push("/app", "root")
        },1500)
        

    }

    const finishIntro = async () => {
        setIsIntroSeen(true)
        Preferences.set({ key: INTRO_KEY, value: "true" })
    }

    const seeIntroAgain = () => {
        setIsIntroSeen(false);
        Preferences.remove({ key: INTRO_KEY })
    }

    return (
        <>

            {!isIntroSeen ? <Intro onFinish={finishIntro} /> : (<IonPage>
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
                                <IonButton className='ion-margin-top' color='danger' expand="block" type="submit">
                                    Login
                                    <IonIcon icon={logInOutline} />
                                </IonButton>
                                <IonButton routerLink='/register' className='ion-margin-top' color='tertiary' expand="block">
                                    Register
                                    <IonIcon icon={personCircleOutline} />
                                </IonButton>
                                <IonButton onClick={seeIntroAgain} className='ion-margin-top' color='secondary' expand="block">
                                    See Intro
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