import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DbService } from 'src/app/core/services/db.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  courseId: any;
  courseName: any;
  coursePrice: any;
  courseimage: any;
  subtotal: any;
  cardType: string = '';
  shipping: any;
  total: any;
  courses: any[] = [];
  form: FormGroup;
  cardNumber: FormControl = new FormControl('', [Validators.required, Validators.minLength(16)]);
  expirationDate: FormControl = new FormControl('', Validators.required);
  cvv: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  paymentSuccessful: boolean = false;
  showSuccessDialog: boolean = false;

  constructor(
    private dbservice: DbService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cvv: this.cvv
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Obtiene los parámetros de la URL
      this.courseId = params['id'];
      this.courseimage = params['image'];
      this.courseName = params['name'];
      this.coursePrice = params['price'];
      // Carga el detalle del curso en el arreglo 'courses' para que aparezca en la tabla
      this.courses.push({
        image: this.courseimage,
        name: this.courseName,
        price: this.coursePrice,
        quantity: 1, // Puedes establecer la cantidad inicial
        total: this.coursePrice
      });
      this.calculateValues(); // Calculate the initial values
    });
  }

  getCourses() {
    this.dbservice.getCourses().subscribe(
      (courses: any) => {
        this.courses = courses;
        this.calculateValues(); // Calculate the values when courses change
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    console.log(this.form.value);
      // Realiza el pago y, si es exitoso, establece paymentSuccessful en true.
    this.paymentSuccessful = true;
    // Abre la ventana emergente de éxito.
    this.showSuccessDialog = true;
  }

  // Method to calculate the subtotal, shipping, and total
  calculateValues() {
    this.subtotal = this.getSubtotal();
    this.shipping = this.getShipping();
    this.total = this.getTotal();
  }

  // Métodos para calcular el total del pedido
  getSubtotal() {
    return parseFloat(this.courses.reduce((total, course) => total + course.price * course.quantity, 0).toFixed(2));
  }

  getShipping() {
    return 20;
  }

  getTotal() {
    return parseFloat((this.subtotal + this.shipping).toFixed(2));
  }

  // Métodos para mostrar el resumen del pedido
  getCoursesSummary() {
    return this.courses.map((course) => ({
      name: course.name,
      price: course.price,
      image: course.image,
      quantity: course.quantity,
      total: course.price * course.quantity
    }));
  }

  getSubtotalLabel() {
    return `Subtotal: ${this.subtotal} USD`;
  }

  getShippingLabel() {
    return `Shipping: ${this.shipping} USD`;
  }

  getTotalLabel() {
    return `Total: ${this.total} USD`;
  }
  formatCardNumber(event: any) {
    let input = event.target.value.replace(/[\s-]/g, ''); // Eliminar espacios y guiones existentes
    input = input.substring(0, 16); // Limitar a 16 caracteres
    const cardNumber = input.match(/.{1,4}/g)?.join('-') || ''; // Agrupar en bloques de 4 y unir con guiones
    this.form.get('cardNumber')?.setValue(cardNumber, { emitEvent: false }); // Establecer el valor formateado sin disparar eventos
    this.detectCardType(input);
    // Continuar con el formato del número de tarjeta si es necesario
  }
  
  restrictInput(event: any) {
    const key = event.key;
    if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'Delete') {
      event.preventDefault(); // Prevenir la entrada de caracteres no numéricos
    }
  }  
  formatExpirationDate(event: any) {
    let input = event.target.value.replace(/\D/g, ''); // Elimina cualquier carácter no numérico
    if (input.length > 4) {
      input = input.substring(0, 4); // Limita la entrada a 4 caracteres (MMYY)
    }
  
    if (input.length >= 2) {
      // Inserta una barra diagonal después de los primeros dos dígitos (mes)
      input = input.substring(0, 2) + '/' + input.substring(2);
      
      // Valida que el mes esté en el rango válido (01 al 12)
      const month = parseInt(input.substring(0, 2), 10);
      if (month < 1 || month > 12) {
        input = '01/'; // Establece el mes a 01 si es inválido
      }
    }
  
    this.form.get('expirationDate')?.setValue(input, { emitEvent: false }); // Establece el valor formateado sin disparar eventos
  }
  detectCardType(cardNumber: string) {
    const visaRegex = /^4/;
    const mastercardRegex = /^5[1-5]/;
    const amexRegex = /^3[47]/;
  
    if (visaRegex.test(cardNumber)) {
      this.cardType = 'visa';
    } else if (mastercardRegex.test(cardNumber)) {
      this.cardType = 'mastercard';
    } else if (amexRegex.test(cardNumber)) {
      this.cardType = 'amex';
    } else {
      this.cardType = '';
    }
  }
  
  getCardImage() {
    if (this.cardType === 'visa') {
      return 'https://logowik.com/content/uploads/images/visa-payment-card1873.jpg';
    } else if (this.cardType === 'mastercard') {
      return 'https://pngimg.com/d/mastercard_PNG23.png';
    } else if (this.cardType === 'amex') {
      return 'https://w7.pngwing.com/pngs/58/14/png-transparent-amex-card-credit-logo-logos-logos-and-brands-icon-thumbnail.png';
    } else {
      return '';
    }
  }
  redirectToHome() {
    this.showSuccessDialog = false; // Cierra la ventana emergente
    this.paymentSuccessful = false; // Reinicia el estado de pago
    this.router.navigate(['/home']); // Redirige al usuario a la página "Home"
    // Realiza la redirección a la página "Home"
  }
  cancelPayment() {
    // Realiza la acción de retorno, por ejemplo, redirigiendo a la página anterior
    // En este caso, puedes usar la función window.history.back() para volver a la página anterior.
    window.history.back();
  }
  
  
  
}
