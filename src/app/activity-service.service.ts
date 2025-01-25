import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import { Activity } from './models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityServiceService {

  private apiUrl = 'http://localhost:8080/tarefas';
  private activityCreatedSubject = new Subject<void>();

  activityCreated$ = this.activityCreatedSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getAllActivity(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.apiUrl);
  }

  createActivity(activity: Activity): Observable<Activity> {
    return this.httpClient.post<Activity>(this.apiUrl, activity).pipe(
      tap(() => {
        this.activityCreatedSubject.next();
      })
    );
  }

  getTodayActivity(): Observable<Activity[]> {
    const today = new Date();
    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const formattedToday = formatDate(today);
    const todayActivitiesUrl = `${this.apiUrl}/dataInicio/${formattedToday}`;
    return this.httpClient.get<Activity[]>(todayActivitiesUrl);
  }

  updateActivityStatus(activity: Activity): Observable<void> {
    let url = `${this.apiUrl}`;
    switch (activity.status) {
      case 'concluido':
        url += `/concluir/${activity.id}`;
        break;
      case 'pendente':
        url += `/pendenciar/${activity.id}`;
        break;
      case 'em_andamento':
        url += `/andamento/${activity.id}`;
        break;
      default:
        throw new Error('Status desconhecido');
    }
    return this.httpClient.put<void>(url, {});
  }
}
