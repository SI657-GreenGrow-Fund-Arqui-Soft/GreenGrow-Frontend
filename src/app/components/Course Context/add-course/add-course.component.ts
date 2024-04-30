import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/core/services/courses.service';
import { DataModel } from 'src/app/core/models/data.model';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  courseData: DataModel = {} as DataModel;
  @ViewChild('courseForm', { static: false }) courseForm!: NgForm;

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private dialogRef: DialogRef<AddCourseComponent>,
    private dialog: MatDialog
  ) {}

  addCourse() {
    // Establecer la calificación inicial
    this.courseData.rating = 0.0;
    this.courseData.date = new Date().toLocaleDateString('es-ES');
    console.log('Data being sent:', this.courseData);

    // Llamar al servicio para crear el curso
    this.coursesService.createCourse(this.courseData).subscribe(
      (data: any) => {
        // Mostrar mensaje de éxito
        this.openSnackBar('Course created', 'Close');
        // Registrar los datos en la consola (para propósitos de depuración)
        console.log(data);
        // Cerrar el diálogo actual
        this.dialogRef.close();
      },
      (error) => {
        // Mostrar mensaje de error detallado en la barra de snacks
        this.openSnackBar(`Error: ${error.message}`, 'Close', 'error-snackbar');
        // Registrar el error en la consola (para propósitos de depuración)
        console.error(error);
      }
    );
  }

  cancel() {
    // Cerrar todos los diálogos abiertos
    this.dialog.closeAll();
  }

  private openSnackBar(
    message: string,
    action: string,
    panelClass: string = ''
  ): void {
    // Mostrar mensaje en la barra de snacks
    this.snackBar.open(message, action, {
      duration: 3000, // Duración en milisegundos
      panelClass: panelClass, // Clase de estilo personalizado para la barra de snacks (opcional)
    });
  }
}
