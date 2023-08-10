import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import { logInOutline, personCircleOutline } from "ionicons/icons";
import ionicLogo from "./../assets/ionic-logo.png";

const Register: React.FC = () => {
    const router = useIonRouter();
    const doRegister = (event: any) => {
        event.preventDefault();
        console.log("doRegister");
        router.goBack();

    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={"danger"}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Register Screen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid fixed>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                            <IonCard>
                                <IonCardContent>
                                    <IonImg src={ionicLogo} />
                                    <form onSubmit={doRegister}>
                                        <IonInput fill="outline" label="Email" labelPlacement="floating" type="email" placeholder="johndoe@gmail.com" />
                                        <IonInput className="ion-margin-top" fill="outline" label="Password" labelPlacement="floating" type="password" />
                                        <IonButton className='ion-margin-top' color='danger' expand="block" type="submit">
                                            Create My Account
                                            <IonIcon icon={logInOutline} />
                                        </IonButton>

                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default Register;