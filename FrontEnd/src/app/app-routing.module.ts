import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoListaComponent } from './producto-lista/producto-lista.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { DashboardProductosComponent } from './dashboard-productos/dashboard-productos.component';

//http://localhost:4200/productos
const routes: Routes = [
  {path: 'productos', component: ProductoListaComponent},
  {path: '', redirectTo: 'productos', pathMatch: 'full'},
  {path:'agregar-producto', component: AgregarProductoComponent},
  {path:'editar-producto/:id', component: EditarProductoComponent},
  {path:'dashboard-productos', component: DashboardProductosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
