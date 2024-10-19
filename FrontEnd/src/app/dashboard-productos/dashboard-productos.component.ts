import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-dashboard-productos',
  templateUrl: './dashboard-productos.component.html',
  styleUrl: './dashboard-productos.component.css'
})
export class DashboardProductosComponent {
  productos: Producto[];
  totalProductos: number = 0;
  totalProductosLowStock: number = 0;
  totalProductosSinStock: number = 0;
  totalSumatorioPrecios: number = 0;
  maxCantidadExistencia: number = 0;

  constructor(private productoServicio: ProductoService){};

  ngOnInit(){
    this.obtenerProductos();
    this.contarProductos();
    this.contarProductosLowStock();
    this.contarProductosSinStock();
    this.obtenerSumatorioPrecios();
  }

  private obtenerProductos(){
    //usar datos del observable
    this.productoServicio.obtenerProductosLista().subscribe(
      (datos => {
        this.productos = datos;
      })
    );
  }

  contarProductos(){
    this.productoServicio.contarProductos().subscribe(
      (conteo => {
        this.totalProductos = conteo;
      }),
      (errores => {
        console.log(errores);
      })
    );
  }

  contarProductosLowStock(){
    this.productoServicio.contarProductosLowStock().subscribe(
      (conteo => {
        this.totalProductosLowStock = conteo;
      }),
      (errores => {
        console.log('Error al contar los productos con bajo stock: ', errores);
      })
    );
  }

  contarProductosSinStock(){
    this.productoServicio.contarProductosSinStock().subscribe(
      (conteo => {
        this.totalProductosSinStock = conteo;
      }),
      (errores => {
        console.log(errores);
      })
    );
  }

  obtenerSumatorioPrecios(){
    this.productoServicio.obtenerSumatorioPrecios().subscribe(
      (conteo => {
        this.totalSumatorioPrecios = conteo;
      }),
      (errores => {
        console.log(errores);
      })
    );
  }

  getHeightPercentage(cantidadExistencia: number): number {
    const maxValue = Math.max(...this.productos.map(p => p.cantidadExistencia));
    return (cantidadExistencia / maxValue) * 100; // Retorna el porcentaje
  }
}
