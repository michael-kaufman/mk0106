export interface ErrorOptions {
    statusCode: number;
    message: string;
}

export function createError(options: ErrorOptions): Error & { statusCode: number } {
    const error = new Error(options.message) as Error & { statusCode: number }
    error.statusCode = options.statusCode
    return error
} 