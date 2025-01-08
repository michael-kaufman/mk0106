export interface ErrorOptions {
  statusCode: number
  message: string
}

export function createError(options: ErrorOptions): Error {
  return new Error(options.message)
} 