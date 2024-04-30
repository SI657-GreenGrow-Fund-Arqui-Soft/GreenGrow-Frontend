import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  userPhotoURL: string | null = 'https://i.imgur.com/eJtTmKu.png'; // Definir una URL por defecto
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authState$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.userPhotoURL = user.photoURL; // Obtener la URL de la imagen

      }
    });
  }
  logout() {
    this.authService.logOut()
      .then(() => {
        console.log('Sesión cerrada');
        return window.location.reload();
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  /*uploadProfileImage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
  
    if (file) {
      // Aquí puedes implementar la lógica para guardar la imagen en tu solución de almacenamiento (Firebase Storage, servidor, etc.)
      
      // Por ahora, simplemente la mostramos en la vista
      const reader = new FileReader();
      reader.onload = () => {
        this.userPhotoURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }*/
  
}
