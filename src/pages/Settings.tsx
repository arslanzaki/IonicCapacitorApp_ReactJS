import { IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import {triangle, ellipse} from "ionicons/icons";
import Tab1 from './Tab1';
import { Redirect, Route } from 'react-router';
import Tab2 from './Tab2';

const Settings: React.FC = () => {

    return (
        <IonTabs>
            <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/app/settings/tab1">
                    <IonIcon icon={triangle}/>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/app/settings/tab2">
                <IonIcon icon={ellipse}/>
                </IonTabButton>
            </IonTabBar>

            <IonRouterOutlet>
                <Route path="/app/settings/tab1" component={Tab1}/>
                <Route path="/app/settings/tab2" component={Tab2}/>
                <Route exact path="/app/settings">
                    <Redirect to="/app/settings/tab1"/>
                </Route>
            </IonRouterOutlet>
        </IonTabs>
    );
};

export default Settings;