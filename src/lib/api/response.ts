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

export function apiError(error: string, status: number = 400) {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error,
    },
    { status }
  );
}
