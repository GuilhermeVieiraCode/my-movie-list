import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configParams(config: ConfigParams): HttpParams{
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page', config.page.toString());
    httpParams = httpParams.set('_limit', config.limit.toString());
    if(config.search) httpParams = httpParams.set('q', config.search);
    if(config.field?.value) httpParams = httpParams.set(config.field.type, config.field.value.toString());
    httpParams = httpParams.set('_sort', 'title');
    httpParams = httpParams.set('_order', 'asc');
    
    return httpParams;
  }
}
