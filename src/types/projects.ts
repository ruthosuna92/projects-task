
export interface TeamMember {
    name: string;
    lastName: string;
}

export enum ProjectStatus {
    Active = 'active',
    Pending = "pending_payment",
    Inactive = 'inactive',
    Suspended = "suspended"
}

export enum Plan {
    Big = 'big',
    Small = 'small',
}

export enum IncidentStatus {
  Active = "active",
  Close = "close",
}

export enum IncidentItem {
  Incident = "incidents",
  RFI = "rfi",
  Task = "task",
}

export type Project = {
    id: string;
    name: string;
    plan: Plan;
    status: ProjectStatus;
    team: TeamMember[];
    expiringItems: {
        incidents: number;
        rfi: number;
        tasks: number;
    };
    location: {
        lat: number;
        lng: number;
        city: string;
        address: string;
    }
    imageUrl: string | null;
    createdAt: string;
    lastUpdated: string;
};