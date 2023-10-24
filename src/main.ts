import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './app/services/in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent,
  {
    providers: [
      provideRouter(routeConfig),
      importProvidersFrom(HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false }
      ))
    ]
  }
)
  .catch(err => console.error(err));
