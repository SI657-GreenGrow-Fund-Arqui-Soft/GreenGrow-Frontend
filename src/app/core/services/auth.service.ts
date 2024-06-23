import {inject, Injectable} from '@angular/core';
import {
  Auth,
  AuthProvider,
  authState,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile as updateProfileFirebase,
  UserCredential,
} from '@angular/fire/auth';

export interface Credential {
  email: string;
  password: string;
}

export interface BackendCredential {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  private auth: Auth = inject(Auth);
  readonly authState$ = authState(this.auth);
  private backUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  private firebaseKey = "AIzaSyDObw-57RzyDKVTlqGNkmgo1sK3n02_WHM";

  private secureToken: string = '';

  signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }
  logInWithEmailAndPassword(credential: Credential) {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }
  tokenGetter(){
    const token = localStorage.getItem('authToken');
    if (token){
      return token;
    } else {
      console.log('No hay token almacenado');
      return null;
    }
  }
  tokenSetter(token: string){
    this.secureToken = token;
    localStorage.setItem('authToken', token);
    console.log(this.secureToken);
  }

  async logInForBackend(credential: Credential) {
    let backendCredential: BackendCredential =  {
      email: credential.email,
      password: credential.password,
      returnSecureToken: true,
    };
    const response = await fetch(`${this.backUrl} + ${this.firebaseKey}`,
      {
      method: 'POST',
      body: JSON.stringify(backendCredential),
      headers: {'Content-Type': 'application/json'},
    })

    if(!response.ok){
      throw new Error('Network Error' + response.statusText);
    }
    return response.json();
  }


  logOut(): Promise<void> {
    localStorage.removeItem('authToken');
    return this.auth.signOut();
  }

  // providers

  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();

    return this.callPopUp(provider);
  }

  signInWithGithubProvider(): Promise<UserCredential> {
    const provider = new GithubAuthProvider();

    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);

      return result;
    } catch (error: any) {
      return error;
    }
  }

  // Método para actualizar el perfil del usuario en Firebase
  async updateProfile(user: any, userData: any): Promise<void> {
    try {
      await updateProfileFirebase(user, userData);
    } catch (error) {
      throw error; // Puedes manejar el error de la manera que desees
    }
  }


}
