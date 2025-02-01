import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormInputListComponent } from './pages/campo/form-input-list/form-input-list.component';
import { FormListComponent } from './pages/formulario/form-list/form-list.component';
import { FormViewComponent } from './pages/formulario/form-view/form-view.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '/home', component: HomeComponent },
    { path: 'form-input-list', component: FormInputListComponent },
    { path: 'form-list', component: FormListComponent },
    { path: 'form-view/:id', component: FormViewComponent }
  ];

  
