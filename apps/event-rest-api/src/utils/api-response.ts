export interface Response<T> {
  statusCode: number;
  status: string;
  data?: T;
  message?: T;
}

export const getResponseData = <T>(
  statusCode: number,
  data: T,
): Response<T> => {
  let status: 'success' | 'error';
  if (statusCode >= 200 && statusCode < 300) {
    status = 'success';
    return { statusCode, status, data };
  } else {
    status = 'error';
    return { statusCode, status, message: data };
  }
};
