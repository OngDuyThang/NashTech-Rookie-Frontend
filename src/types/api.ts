export interface TApiResponse<T = unknown> {
    data: T | null,
    message: string,
    statusCode: number,
    page?: number,
    limit?: number,
    total?: number
}