import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function apiError(
  error: string,
  messageOrStatus?: string | number,
  status: number = 400,
  details?: any
) {
  let errorMessage = error;
  let statusCode = typeof messageOrStatus === 'number' ? messageOrStatus : status;

  if (typeof messageOrStatus === 'string') {
    errorMessage = `${error}: ${messageOrStatus}`;
  }

  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error: errorMessage,
    },
    { status: statusCode }
  );
}
