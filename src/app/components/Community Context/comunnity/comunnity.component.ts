import { Component } from '@angular/core';
import { DbService } from 'src/app/core/services/db.service';

@Component({
  selector: 'app-comunnity',
  templateUrl: './comunnity.component.html',
  styleUrls: ['./comunnity.component.scss']
})
export class ComunnityComponent {

  posts: any[] = [];
  postsFalse: any[] = [
    {
      author: "Juan Pérez",
      comments: 5,
      date: "1/5/2024",
      description: "Introducción a la hidroponía: Cómo empezar tu propio huerto en casa.",
      id: 1,
      image: "../../../../assets/Hidroponia/1.jfif",
      likes: 15,
      tags: ["hidroponía", "huerto casero"],
      title: "Guía para principiantes en hidroponía",
      views: 120
    },
    {
      author: "María Gómez",
      comments: 3,
      date: "2/5/2024",
      description: "Beneficios de la hidroponía en el cultivo urbano.",
      id: 2,
      image: "../../../../assets/Hidroponia/2.jfif",
      likes: 25,
      tags: ["cultivo urbano", "sostenibilidad"],
      title: "La hidroponía y su impacto en la agricultura urbana",
      views: 150
    },
    {
      author: "Carlos López",
      comments: 7,
      date: "3/5/2024",
      description: "Cómo elegir los mejores nutrientes para tu sistema hidropónico.",
      id: 3,
      image: "../../../../assets/Hidroponia/3.jfif",
      likes: 35,
      tags: ["nutrientes", "sistema hidropónico"],
      title: "Nutrientes esenciales para hidroponía",
      views: 200
    },
    {
      author: "Ana Martínez",
      comments: 4,
      date: "4/5/2024",
      description: "Comparación entre hidroponía y agricultura tradicional.",
      id: 4,
      image: "../../../../assets/Hidroponia/4.jfif",
      likes: 45,
      tags: ["agricultura tradicional", "comparación"],
      title: "Hidroponía vs. Agricultura tradicional",
      views: 180
    },
    {
      author: "Luis Rodríguez",
      comments: 6,
      date: "5/5/2024",
      description: "Construcción de un sistema hidropónico casero paso a paso.",
      id: 5,
      image: "../../../../assets/Hidroponia/5.jfif",
      likes: 55,
      tags: ["DIY", "hidroponía casera"],
      title: "Cómo construir tu propio sistema hidropónico",
      views: 210
    },
    {
      author: "Elena Sánchez",
      comments: 8,
      date: "6/5/2024",
      description: "Plantas ideales para cultivar en sistemas hidropónicos.",
      id: 6,
      image: "../../../../assets/Hidroponia/6.jfif",
      likes: 65,
      tags: ["plantas", "cultivo hidropónico"],
      title: "Las mejores plantas para hidroponía",
      views: 220
    },
    {
      author: "Miguel Fernández",
      comments: 2,
      date: "7/5/2024",
      description: "Cómo controlar el pH y la EC en hidroponía.",
      id: 7,
      image: "../../../../assets/Hidroponia/7.jfif",
      likes: 75,
      tags: ["pH", "conductividad eléctrica"],
      title: "Control del pH y la EC en sistemas hidropónicos",
      views: 240
    },
    {
      author: "Isabel Torres",
      comments: 9,
      date: "8/5/2024",
      description: "Mantenimiento y limpieza de un sistema hidropónico.",
      id: 8,
      image: "../../../../assets/Hidroponia/8.jfif",
      likes: 85,
      tags: ["mantenimiento", "limpieza"],
      title: "Cómo mantener limpio tu sistema hidropónico",
      views: 230
    },
    {
      author: "David Ruiz",
      comments: 3,
      date: "9/5/2024",
      description: "Cómo prevenir y tratar plagas en hidroponía.",
      id: 9,
      image: "../../../../assets/Hidroponia/9.jfif",
      likes: 95,
      tags: ["plagas", "prevención"],
      title: "Prevención y tratamiento de plagas en hidroponía",
      views: 250
    },
    {
      author: "Lucía García",
      comments: 4,
      date: "10/5/2024",
      description: "Los avances tecnológicos en hidroponía.",
      id: 10,
      image: "../../../../assets/Hidroponia/10.jfif",
      likes: 105,
      tags: ["tecnología", "innovación"],
      title: "Tecnologías innovadoras en hidroponía",
      views: 270
    }
  ];
  
  trends: any[] = [];

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.getPosts();
    this.getTrends();
  }

  getPosts() {
    this.dbService.getPosts().subscribe((data: any[]) => {
      this.posts = data;
    });
  }

  getTrends() {
    this.dbService.getTrends().subscribe((data: any[]) => {
      this.trends = data;
    });
  }
}
