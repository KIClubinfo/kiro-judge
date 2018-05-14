import {
  MatButtonModule,
  MatCheckboxModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
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
  MatDividerModule,
  MatProgressSpinnerModule,
  MatDialogModule,
];

@NgModule({
  imports: elementModules,
  exports: elementModules,
})
export class AppMaterialModule {}
