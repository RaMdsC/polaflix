import { Injectable } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DataService } from 'src/app/services/data.service';

import { RegisterRequest } from 'src/app/interfaces/requests/register-request.interface';
import { MixedResponse } from 'src/app/interfaces/responses/mixed-response.interface';
import { MultipleDataResponse } from 'src/app/interfaces/responses/multiple-data-response.interface';
import { ManagedSeries } from 'src/app/models/managed-series.model';
import { OngoingSeries } from 'src/app/models/ongoing-series.model';
import { PendingSeries } from 'src/app/models/pending-series.model';
import { CompletedSeries } from 'src/app/models/completed-series.model';

@Injectable({ providedIn: 'root' })
export class ContentService {

  constructor(private apiService: ApiService,
              private authService: AuthService,
              private dataService: DataService,
              private notificationService: NotificationService) {

  }

  addUser(userName: string, firstName: string, lastName: string, password: string): void {
    // Create the register request
    const registerRequest: RegisterRequest = new RegisterRequest(userName, firstName,
                                                                 lastName, password);
    // Make the API call
    this.apiService.post<MixedResponse>('user/register', registerRequest)
      .subscribe(
        (mixedResponse: MixedResponse) => {
          switch (mixedResponse.statusCode) {
            case 0:
              // User has been stored in the Service database
              // Log the user in
              this.authService.success(mixedResponse.data, userName, password);
              break;
          }
        },
        (error: any) => {
          // An error was received
          this.notificationService.showNotification(error);
        }
      );
  }

  loadUserSeries(): void {
    this.loadOngoingSeries();
    this.loadPendingSeries();
    this.loadCompletedSeries();
  }

  loadOngoingSeries(): void {
    this.loadSeries<OngoingSeries>('ongoing',
                                   OngoingSeries.newInstance,
                                   (series) => this.dataService.setOngoingSeries(series));
  }

  loadPendingSeries(): void {
    this.loadSeries<PendingSeries>('pending',
                                   PendingSeries.newInstance,
                                   (series) => this.dataService.setPendingSeries(series));
  }

  loadCompletedSeries(): void {
    this.loadSeries<CompletedSeries>('completed',
                                     CompletedSeries.newInstance,
                                     (series) => this.dataService.setCompletedSeries(series));
  }

  private loadSeries<T extends ManagedSeries>(type: string,
                                              newInstance: (id: number, name: string) => T,
                                              update: (series: ManagedSeries[]) => void) {
    this.apiService
      .get<MultipleDataResponse>(`user/${type}/${this.dataService.getId()}`)
        .subscribe(
          (multipleDataResponse: MultipleDataResponse) => {
            // Parse the received data
            const series: ManagedSeries[] = [];
            for (let i = 0, size = multipleDataResponse.multipleData.length; i < size; i++) {
              const dataI: any = multipleDataResponse.multipleData[i];
              const id: number = dataI.userSeriesId.series.id;
              const name: string = dataI.userSeriesId.series.name;
              series.push(newInstance(id, name));
            }
            // Store the series in the data service
            update(series);
          },
          (error: any) => {
            // An error was received
            this.notificationService.showNotification(error);
          }
        );
  }
}
