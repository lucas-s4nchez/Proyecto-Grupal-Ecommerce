import { Injectable } from '@angular/core';
import { Product } from './interfaces/Products';
import { Categories } from './interfaces/Categories';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}
  private products: Product[] = [
    {
      id: 1,
      name: 'americano',
      description:
        'Café espresso combinado con agua al mejor estilo americano.',
      price: 800,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356770/la%20web%20del%20caf%C3%A9/lb8ofjuxt1clgdqq51jr.png',
      category: Categories.CALIENTES,
      stock: true,
      discount: 10,
      featured: false,
    },
    {
      id: 2,
      name: 'latte',
      description: 'Café espresso con leche vaporizada.',
      price: 1000,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356815/la%20web%20del%20caf%C3%A9/jjwlipdui9ecccysjutx.png',
      category: Categories.CALIENTES,
      stock: true,
      discount: null,
      featured: true,
    },
    {
      id: 3,
      name: 'cappuccino',
      description:
        'Café espresso, leche vaporizada y abundante espuma de leche.',
      price: 1200,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356779/la%20web%20del%20caf%C3%A9/g0fuvmldmbqeo3wyzd8s.png',
      category: Categories.CALIENTES,
      stock: true,
      discount: null,
      featured: true,
    },
    {
      id: 4,
      name: 'cappuccino helado',
      description:
        'El balance perfecto entre nuestro café espresso, hielo, leche y abundante espuma de leche.',
      price: 1350,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356783/la%20web%20del%20caf%C3%A9/fubfkv1rdk4vantx6e03.png',
      category: Categories.HELADOS,
      stock: true,
      discount: 15,
      featured: false,
    },
    {
      id: 5,
      name: 'leche con chocolate',
      description: 'Una deliciosa mezcla de chocolate, vainilla y leche',
      price: 1000,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356817/la%20web%20del%20caf%C3%A9/wwj18hpynqyycjeqeetj.png',
      category: Categories.CALIENTES,
      stock: true,
      discount: null,
      featured: false,
    },
    {
      id: 6,
      name: 'dulce de leche latte',
      description:
        'Café espresso con dulce de leche, leche al vapor con crema batida y salsa de caramelo.',
      price: 1300,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683357408/la%20web%20del%20caf%C3%A9/jgbf2qef8onkirdiw8j5.png',
      category: Categories.CALIENTES,
      stock: true,
      discount: 10,
      featured: true,
    },
    {
      id: 7,
      name: 'latte macchiato',
      description:
        'Leche vaporizada con shots de café espresso que finaliza con un punto dibujado en la superficie.',
      price: 1100,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356813/la%20web%20del%20caf%C3%A9/wur72yngmwrsornjkhxz.png',
      category: Categories.CALIENTES,
      stock: true,
      discount: 10,
      featured: false,
    },
    {
      id: 8,
      name: 'caramel macchiato',
      description:
        'Vainilla y leche "manchada" con espresso, finalizada con el característico dibujo de caramelo.',
      price: 1250,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356803/la%20web%20del%20caf%C3%A9/jtybbhw8od2d52tagldi.png',
      category: Categories.CALIENTES,
      stock: true,
      discount: null,
      featured: true,
    },
    {
      id: 9,
      name: 'mocha',
      description:
        'Chocolate con café espresso y leche al vapor, con crema batida.',
      price: 1100,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356819/la%20web%20del%20caf%C3%A9/vfpxlnqpbcbisobba9h0.png',
      category: Categories.CALIENTES,
      stock: true,
      discount: 10,
      featured: false,
    },
    {
      id: 10,
      name: 'dulce de leche latte helado',
      description:
        'Café espresso con delicioso dulce de leche, hielo y leche con un remolino de crema batida y salsa de caramelo.',
      price: 1400,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356808/la%20web%20del%20caf%C3%A9/vb91k1gdiyorrcdraoh0.png',
      category: Categories.HELADOS,
      stock: true,
      discount: null,
      featured: true,
    },
    {
      id: 11,
      name: 'latte helado',
      description: 'Deliciosa combinación de café espresso con hielo y leche.',
      price: 1100,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356811/la%20web%20del%20caf%C3%A9/kczmhie3kylmj6rsarx7.png',
      category: Categories.HELADOS,
      stock: true,
      discount: 15,
      featured: false,
    },
    {
      id: 12,
      name: 'americano helado',
      description:
        'Delicioso café espresso combinado con agua y hielo, al mejor estilo americano.',
      price: 1000,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356775/la%20web%20del%20caf%C3%A9/xfkucmcyeqghfnzpbha2.png',
      category: Categories.HELADOS,
      stock: true,
      discount: null,
      featured: false,
    },
    {
      id: 13,
      name: 'mocha helado',
      description:
        'Intenso chocolate con café espresso, hielo y leche, coronado con crema batida.',
      price: 1200,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356821/la%20web%20del%20caf%C3%A9/yyh0c9zbiuvggaszfzyx.png',
      category: Categories.HELADOS,
      stock: true,
      discount: null,
      featured: false,
    },
    {
      id: 14,
      name: 'caramel macchiato helado',
      description:
        'Hielo, vainilla y leche "manchada" con espresso, finalizada con el característico dibujo de caramelo.',
      price: 1350,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683356787/la%20web%20del%20caf%C3%A9/li5eeqr10n1n4hzry8il.png',
      category: Categories.HELADOS,
      stock: true,
      discount: 12,
      featured: true,
    },
    {
      id: 15,
      name: 'croissant',
      description:
        'Elaborado con masa de hojaldre crujiente y salada, nuestro Croissant se hornea especialmente para vos.',
      price: 200,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683358233/la%20web%20del%20caf%C3%A9/ad59mdqog0iurdaddwei.png',
      category: Categories.PANADERIA,
      stock: true,
      discount: null,
      featured: false,
    },
    {
      id: 16,
      name: 'medialuna',
      description:
        'La clásica medialuna: Crujiente, esponjosa, de gran tamaño y ¡recién horneada!',
      price: 180,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683358238/la%20web%20del%20caf%C3%A9/hhaabxblu5d6kgtgdemr.png',
      category: Categories.PANADERIA,
      stock: true,
      discount: null,
      featured: false,
    },
    {
      id: 17,
      name: 'medialuna rellena con jamón y queso',
      description:
        'Nuestra medialuna recién horneada, rellena con queso tybo y jamón cocido.',
      price: 220,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683358240/la%20web%20del%20caf%C3%A9/xmsfeqlc7k2nblzos4sd.png',
      category: Categories.PANADERIA,
      stock: true,
      discount: null,
      featured: true,
    },
    {
      id: 18,
      name: 'brownie de chocolate',
      description: 'Brownie húmedo de chocolate.',
      price: 300,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683358229/la%20web%20del%20caf%C3%A9/rc0t2h10peasrl2dvuqq.png',
      category: Categories.PANADERIA,
      stock: true,
      discount: 15,
      featured: false,
    },
    {
      id: 19,
      name: 'pan de queso',
      description: 'Nuestro pan de queso recién horneado.',
      price: 280,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683358241/la%20web%20del%20caf%C3%A9/tjx8bm9gqf8jqxbxna7s.png',
      category: Categories.PANADERIA,
      stock: true,
      discount: 10,
      featured: false,
    },
    {
      id: 19,
      name: 'cheesecake frutos rojos',
      description: 'Cheesecake con cobertura de salsa de frutos rojos.',
      price: 530,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683358243/la%20web%20del%20caf%C3%A9/aasz6iiaowo1srcgze0n.png',
      category: Categories.PANADERIA,
      stock: true,
      discount: null,
      featured: true,
    },
    {
      id: 20,
      name: 'cookies cake',
      description:
        'Torta de chocolate cubierta con crema de galletas de chocolate.',
      price: 530,
      img: 'https://res.cloudinary.com/daz0uw1rn/image/upload/v1683358231/la%20web%20del%20caf%C3%A9/r7rwysrsskbdoufrljyu.png',
      category: Categories.PANADERIA,
      stock: true,
      discount: null,
      featured: false,
    },
  ];

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((p) => p.id === id);
  }
}
