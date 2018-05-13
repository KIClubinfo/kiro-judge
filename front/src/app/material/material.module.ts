import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule, MatTooltipModule,
} from '@angular/material';
import { NgModule } from '@angular/core';

const elementModules = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatTableModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatTooltipModule,
];

@NgModule({
  imports: elementModules,
  exports: elementModules,
})
export class AppMaterialModule {}
