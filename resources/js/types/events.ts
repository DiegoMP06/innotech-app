import { LatLng } from "leaflet";
import { Media, UserData } from ".";
import { Content } from "@measured/puck";
import { ComponentProps } from "@/lib/puck";

export type EventActivity = {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    summary: string;
    content: Content<ComponentProps>;
    location: string;
    lat: string;
    lng: string;
    is_online: boolean;
    online_link: string | null;
    is_a_team_event: boolean;
    min_team_size: number | null;
    max_team_size: number | null;
    is_a_full_team_event: boolean;
    max_participants: number | null;
    only_students: boolean;
    is_competition: boolean;
    participants_per_round: number | null;
    is_published: boolean;
    published_at: string | null;
    started_at: string;
    ended_at: string;
    event_id: number;
    event_activity_type_id: number;
    created_at: string;
    updated_at: string;
};

export type Event = {
    id: number;
    name: string;
    slug: string;
    summary: string;
    content: Content<ComponentProps>;
    price: number;
    percent_off: number;
    capacity: number | null;
    is_online: boolean;
    online_link: string | null;
    location: string | null;
    lat: number | null;
    lng: number | null;
    registration_started_at: string;
    registration_ended_at: string;
    start_date: string;
    end_date: string;
    is_published: boolean;
    event_status_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    activities: EventActivity[];
    author: UserData;
    media: Media[];
};

export type EventFormData = Pick<
    Event,
    'name' | 'summary'  | 'location' | 'price' | 'percent_off' | 'capacity' | 'is_online' | 'online_link'
> & {
    logo: File[];
    latLng: LatLng;
    registration_started_at: Date;
    registration_ended_at: Date;
    start_date: Date;
    end_date: Date;
};
