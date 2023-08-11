import { IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import { homeOutline, newspaperOutline, logOutOutline } from "ionicons/icons";
import List from './List';
import Settings from './Settings';

const Menu: React.FC = () => {

    const paths = [
        { name: "Home", url: "/app/list", icon: homeOutline },
        { name: "Settings", url: "/app/settings", icon: newspaperOutline }
    ]

    return (
        <IonPage>
            <IonSplitPane contentId="main">
                <IonMenu contentId="main">
                    <IonHeader>
                        <IonToolbar color="primary">
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        {paths.map((item, index) => {
                            return (
                                <IonMenuToggle key={index} autoHide={false}>

                                    <IonItem detail={true} routerLink={item.url} routerDirection='none'>
                                        <IonIcon slot='start' icon={item.icon} />
                                        {item.name}
                                    </IonItem>
                                </IonMenuToggle>
                            )
                        })}

                        <IonMenuToggle autoHide={false}>

                            <IonItem routerLink="/" routerDirection='none'>
                                <IonIcon slot='start' icon={logOutOutline} />
                                Logout
                            </IonItem>
                        </IonMenuToggle>
                    </IonContent>
                </IonMenu>

                <IonRouterOutlet id="main">
                    <Route exact path="/app/list" component={List} />
                    <Route path="/app/settings" component={Settings} />
                    <Route exact path="/app">
                        <Redirect to="/app/list" />
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    );
};

export default Menu;