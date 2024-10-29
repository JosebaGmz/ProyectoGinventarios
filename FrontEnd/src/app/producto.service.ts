import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlBase = "https://proyectoginventariosweb.onrender.com"

  constructor(private clienteHttp : HttpClient) { }

  obtenerProductosLista(): Observable<Producto[]>{
    return this.clienteHttp.get<Producto[]>(this.urlBase+"/productos");
  }

  agregarProducto(producto: Producto): Observable<Object>{
    return this.clienteHttp.post(this.urlBase+"/productos", producto);
  }

  obtenerProductoPorId(id: number){
    return this.clienteHttp.get<Producto>(`${this.urlBase+"/productos"}/${id}`);
  }

  editarProducto(id: number, producto: Producto): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase+"/productos"}/${id}`,producto);
  }

  eliminarProducto(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase+"/productos"}/${id}`);
  }

  contarProductos(): Observable<number> {
    return this.clienteHttp.get<number>(`${this.urlBase+"/productos"}/productosCount`);
  }

  contarProductosLowStock(): Observable<number> {
    return this.clienteHttp.get<number>(`${this.urlBase+"/productos"}/productosCountLow`);
  }

  contarProductosSinStock(): Observable<number>{
    return this.clienteHttp.get<number>(`${this.urlBase+"/productos"}/productosSinStock`);
  }

  obtenerSumatorioPrecios(): Observable<number>{
    return this.clienteHttp.get<number>(`${this.urlBase+"/productos"}/sumatorioPrecios`);
  }
}
