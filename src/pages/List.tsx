import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSegment, IonSegmentButton, IonSkeletonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { trashBinOutline, addOutline } from "ionicons/icons"
import "./List.css";

const List: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [showAlert] = useIonAlert();
    const [showToast] = useIonToast();
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const modal = useRef<HTMLIonModalElement>(null);
    const cardModal = useRef<HTMLIonModalElement>(null);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const [activeSegment, setActiveSegment] = useState<any>('details');

    const page = useRef(null);

    useEffect(() => {
        setPresentingElement(page.current);
    }, []);

    useIonViewWillEnter(async () => {
        const users = await getUsers();
        setUsers(users);
        setLoading(false);

    })

    const getUsers = async () => {
        const data = await fetch("https://randomuser.me/api?results=10");
        const users = await data.json();
        return users.results;
    }

    const clearList = () => {
        showAlert({
            header: "Confirm!",
            message: "Are you want to delete all users?",
            buttons: [
                { text: "Cancel", role: "cancel" },
                {
                    text: "Delete",
                    handler: () => {
                        setUsers([]); showToast({
                            message: "All Users Deleted",
                            duration: 2000,
                            color: "danger"
                        })
                    }
                }
            ]
        })
    }

    const doRefresh = async (event: any) => {
        const data = await getUsers();
        setUsers(data);
        event.detail.complete();

    }

    return (
        <IonPage ref={page}>
            <IonHeader>
                <IonToolbar color="danger">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>List</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={clearList}>

                            <IonIcon slot='icon-only' icon={trashBinOutline} color='light' />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>

                <IonToolbar color="danger">
                    <IonSearchbar />
                </IonToolbar>
            </IonHeader>


            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent />
                </IonRefresher>

                {loading && (
                    [...Array(10)].map((_, index) => {
                        return (
                            <IonCard key={index}>
                                <IonCardContent className="ion-no-padding">
                                    <IonItem lines="none">
                                        <IonAvatar slot="start">
                                            <IonSkeletonText />
                                        </IonAvatar>
                                        <IonLabel>
                                            <IonSkeletonText animated style={{ width: "150px" }} />
                                            <p>
                                                <IonSkeletonText />
                                            </p>
                                        </IonLabel>
                                        <IonChip slot="end" color="danger">

                                        </IonChip>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>)
                    })
                )}

                {users.map((user, index) => (
                    <IonCard key={index} onClick={() => setSelectedUser(user)}>
                        <IonCardContent className="ion-no-padding">
                            <IonItem lines="none">
                                <IonAvatar slot="start">
                                    <IonImg src={user.picture.thumbnail} />
                                </IonAvatar>
                                <IonLabel>
                                    {user.name.first} {user.name.last}
                                    <p>{user.email}</p>
                                </IonLabel>
                                <IonChip slot="end" color="danger">
                                    {user.nat}
                                </IonChip>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}



                <IonModal breakpoints={[0, 0.5, 0.8]} initialBreakpoint={0.5} ref={modal} isOpen={selectedUser !== null} onIonModalDidDismiss={() => setSelectedUser(null)}>
                    <IonHeader>
                        <IonToolbar color={'light'}>
                            <IonButtons slot="start">
                                <IonButton onClick={() => modal.current?.dismiss()}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>
                                {selectedUser?.name.first} {selectedUser?.name.last}
                            </IonTitle>
                        </IonToolbar>
                        <IonToolbar color={'light'}>
                            <IonSegment value={activeSegment} onIonChange={(e: any) => setActiveSegment(e.detail.value!)}>
                                <IonSegmentButton value="details">Details</IonSegmentButton>
                                <IonSegmentButton value="calendar">Calendar</IonSegmentButton>
                            </IonSegment>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        {activeSegment === 'details' && (
                            <IonCard>
                                <IonAvatar slot="start">
                                    <IonImg src={selectedUser?.picture.large} />
                                </IonAvatar>
                                <IonCardContent className="ion-no-padding">
                                    <IonItem lines="none">
                                        <IonLabel class="ion-text-wrap">
                                            {selectedUser?.name.first} {selectedUser?.name.last}
                                            <p>{selectedUser?.email}</p>
                                        </IonLabel>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        )}
                        {activeSegment === 'calendar' && <IonDatetime />}
                    </IonContent>
                </IonModal>
            </IonContent>

            <IonModal ref={cardModal} trigger="card-modal" presentingElement={presentingElement!}>
                <IonHeader>
                    <IonToolbar color={'success'}>
                        <IonButtons slot="start">
                            <IonButton onClick={() => cardModal.current?.dismiss()}>Close</IonButton>
                        </IonButtons>
                        <IonTitle>Card Modal</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <p>My card modal</p>
                </IonContent>
            </IonModal>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton id="card-modal">
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default List;