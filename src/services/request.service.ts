import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestService {
  public host: string;
  public url: string;
  public urlSearch: string;
  public baseUrl: string;

  setHost(host: string) {
    this.host = host;
  }
  setUrl(url: string) {
    this.url = url;
    this.baseUrl = `${this.host}${url.split('?')[0]}`;
  }

  setUrlSearch(query: Record<string, string>) {
    this.urlSearch = new URLSearchParams(query).toString();
  }

  parseQueryToUrlSearch(query: Record<string, string>) {
    return new URLSearchParams(query).toString();
  }
}
