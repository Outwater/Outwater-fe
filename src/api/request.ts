const API_END_POINT = 'http://localhost:3000';

export const request = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return await response.json();
    }
    if (response.status === 404) {
      let err = new Error('존재하지 않는 데이터입니다.');
      throw err;
    }
    throw new Error('API 요청 중 발생한 알 수 없는 에러입니다.');
  } catch (e: any) {
    throw new Error(`요청 중 에러 발생: ${e.message}`);
  }
};
