export type TQueryParam = { name: string, value: string | number };

export type TQueryParams = TQueryParam[];

export type TMeta = {
    total: number;
    limit: number;
    page: number;
}

export type TGetResponse<T> = {
    success: boolean;
    message: string;
    meta: TMeta;
    data: T[];
}