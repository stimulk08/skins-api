// HttpClient.ts
export abstract class HttpClient {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async request<U>(
    method: string,
    endpoint: string,
    body?: any,
    headers?: Record<string, string>,
  ): Promise<U> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Error: ${errorResponse.message || response.statusText}`);
    }

    return response.json() as Promise<U>;
  }

  public async get<U>(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<U> {
    return this.request<U>('GET', endpoint, undefined, headers);
  }

  public async post<U>(
    endpoint: string,
    body: any,
    headers?: Record<string, string>,
  ): Promise<U> {
    return this.request<U>('POST', endpoint, body, headers);
  }

  public async put<U>(
    endpoint: string,
    body: any,
    headers?: Record<string, string>,
  ): Promise<U> {
    return this.request<U>('PUT', endpoint, body, headers);
  }

  public async delete<U>(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<U> {
    return this.request<U>('DELETE', endpoint, undefined, headers);
  }
}
