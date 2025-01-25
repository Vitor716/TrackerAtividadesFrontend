import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivityServiceService} from '../../activity-service.service';
import {Activity} from '../../models/activity.model';
import {Subscription} from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent  implements OnInit, OnDestroy{
  @Input() completedCount: number = 0;

  activities: Activity[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private activityService: ActivityServiceService) { }

  ngOnInit() {
    this.loadActivities();
    this.subscription.add(
      this.activityService.activityCreated$.subscribe(() => {
        this.loadActivities();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadActivities(): void {
    this.activityService.getTodayActivity().subscribe({
      next: (data) => {
        this.activities = data;
        this.sortActivities();
        this.updateCompletedCount();
      },
      error: (error) => {
        console.error('Erro ao carregar atividades:', error);
      },
      complete: () => {
        console.log('Carregamento de atividades concluído.');
      },
    });
  }

  onStatusChange(newStatus: string, activity: Activity) {
    activity.status = newStatus.toLowerCase();
    this.updateActivityStatus(activity);
  }

  updateActivityStatus(activity: Activity): void {
    this.activityService.updateActivityStatus(activity).subscribe(() => {
      this.sortActivities();
      this.loadActivities();
      this.updateCompletedCount();
    });
  }

  updateCompletedCount(): void {
    this.completedCount = this.activities.filter(activity => activity.status === 'CONCLUIDO').length;
  }

  drop(event: CdkDragDrop<Activity[]>) {
    moveItemInArray(this.activities, event.previousIndex, event.currentIndex);
  }

  sortActivities(): void {
    this.activities.sort((a, b) => {
      if (a.status === 'CONCLUIDO') return 1;
      if (b.status === 'CONCLUIDO') return -1;
      if (a.status === 'EM_ANDAMENTO') return 1;
      if (b.status === 'EM_ANDAMENTO') return -1;
      return 0;
    });
  }
}
