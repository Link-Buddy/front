type BuddyUser = {
    id: number;
    name: string;
    email: string;
}

type Buddy = {
    id: number;
    name: string;
    buddyId: string;
    alertTf: boolean;
    pinTf: boolean
}

type BuddyInvitation = {
    id: number;
    name: string;
    buddyId: number;
    acceptTf: boolean;
    acceptDt: Date;
    createdAt: Date;
}