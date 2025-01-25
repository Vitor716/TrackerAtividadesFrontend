import { Component } from '@angular/core';
import {ActivityServiceService} from '../../activity-service.service';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  newActivity: Activity = { titulo: '', descricao: '', dataInicio: '', dataTermino: '' };

  constructor(private activityService: ActivityServiceService) { }

  createActivity(): void {
    const today = new Date();

    //todo implementação futura
    const endDate = new Date();
    endDate.setDate(today.getDate() + 3);

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    this.newActivity.dataInicio = formatDate(today);
    this.newActivity.dataTermino = formatDate(endDate);

    this.activityService.createActivity(this.newActivity).subscribe(
      (data: Activity) => {
        console.log('Atividade criada com sucesso:', data);
        this.newActivity = { titulo: '', descricao: '', dataInicio: '', dataTermino: '' };
      },
      (error: any) => {
        console.error('Erro ao criar atividade:', error);
      }
    );
  }
}
