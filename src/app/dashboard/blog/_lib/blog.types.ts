export interface IBlog {
    id: string;
    title: string;
    slug: string;
    content: string;
    thumbnail?: string;
    images: string[];
    tags: string;
    published: boolean;
    featured: boolean;
    author_id: string;
    author: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        contact_number: string;
        profile_pic?: string;
        role: string;
        status: string;
        created_at: string;
        updated_at: string;
    }
    created_at: string;
    updated_at: string;
}

export interface IBlogDefaultValue {
    title: string;
    content: string;
    tags: string[];
    thumbnail: string;
    images: string[];
}

export const defaultBlog: IBlogDefaultValue = {
    title: '',
    content: '',
    tags: [],
    thumbnail: '',
    images: [],
};