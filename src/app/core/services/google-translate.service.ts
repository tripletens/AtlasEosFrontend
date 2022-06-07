import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { InterceptorSkipHeader } from '../guard/auth.interceptor';

@Injectable({
  providedIn: 'root',
})
export class GoogleTranslateService {
  token = '111381289337617385601';
  apiKey = 'AIzaSyCqG51sQeZyAdL4oeFXRn6mVdUsAsmWfLk';

  constructor(private http: HttpClient) {}
  translator() {
    // const headers = new HttpHeaders().set(InterceptorSkipHeader, '');
    this.http
      .post(
        'https://translation.googleapis.com/language/translate/v2',
        {
          key: this.apiKey,
          q: ['Hello world'],
          target: 'fr',
        }
        // {headers}
      )
      .subscribe((res: any) => {
        console.log(res.data.translations.translatedText);
      });
  }
}
