export type TDialogMode = 'ADD' | 'EDIT' | 'DELETE';

export type TTag = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
};

export type TFeature = {
    id: string;
    name: string;
    feature_group_id: string;
    created_at: string;
    updated_at: string;
};

export type TFeatureGroup = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    feature: TFeature[]
};

export interface IUtilities {
    tags: TTag[];
    feature_groups: TFeatureGroup[];
};