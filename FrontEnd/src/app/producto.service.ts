import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase = "https://proyectoginventariosweb.onrender.com/inventario-app/productos"

  constructor(private clienteHttp : HttpClient) { }

  obtenerProductosLista(): Observable<Producto[]>{
    return this.clienteHttp.get<Producto[]>(this.urlBase);
  }

  agregarProducto(producto: Producto): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, producto);
  }

  obtenerProductoPorId(id: number){
    return this.clienteHttp.get<Producto>(`${this.urlBase}/${id}`);
  }

  editarProducto(id: number, producto: Producto): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`,producto);
  }

  eliminarProducto(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

  contarProductos(): Observable<number> {
    return this.clienteHttp.get<number>(`${this.urlBase}/productosCount`);
  }

  contarProductosLowStock(): Observable<number> {
    return this.clienteHttp.get<number>(`${this.urlBase}/productosCountLow`);
  }

  contarProductosSinStock(): Observable<number>{
    return this.clienteHttp.get<number>(`${this.urlBase}/productosSinStock`);
  }

  obtenerSumatorioPrecios(): Observable<number>{
    return this.clienteHttp.get<number>(`${this.urlBase}/sumatorioPrecios`);
  }
}
