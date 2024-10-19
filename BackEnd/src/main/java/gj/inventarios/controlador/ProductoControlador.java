package gj.inventarios.controlador;


import gj.inventarios.excepcion.RecursoNoEncontradoExcepcion;
import gj.inventarios.modelo.Producto;
import gj.inventarios.servicio.ProductoServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//http://localhost:8080/inventario-app
@RequestMapping("inventario-app")
@CrossOrigin(value = "http://localhost:4200")
public class ProductoControlador {

    private static final Logger logger = LoggerFactory.getLogger(ProductoControlador.class);

    @Autowired
    private ProductoServicio productoServicio;

    //http://localhost:8080/inventario-app/productos
    @GetMapping("/productos")
    public List<Producto> obtenerProductos(){
        List<Producto> productos = this.productoServicio.listarProductos();
        logger.info("Productos obtenidos");
        productos.forEach((producto -> logger.info(producto.toString())));
        return productos;
    }

    @PostMapping("/productos")
    public Producto agregarProducto(@RequestBody Producto producto){
        logger.info("Producto a agregar: " + producto);
        return this.productoServicio.guardarProducto(producto);
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable int id){
        Producto producto = this.productoServicio.buscarProductoPorId(id);

        if(producto != null)
        return ResponseEntity.ok(producto);
        else
            throw new RecursoNoEncontradoExcepcion("No se encontro el id: " + id);
    }

    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable int id,@RequestBody Producto productoRecibido){
        Producto producto = this.productoServicio.buscarProductoPorId(id);
        if(producto == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el id: "+ id);
        producto.setDescripcion(productoRecibido.getDescripcion());
        producto.setPrecio(productoRecibido.getPrecio());
        producto.setCantidadExistencia(productoRecibido.getCantidadExistencia());
        this.productoServicio.guardarProducto(producto);
        return ResponseEntity.ok(producto);
    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarProducto(@PathVariable int id){
        Producto producto = productoServicio.buscarProductoPorId(id);
        if(producto == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el id: " + id);
        this.productoServicio.eliminarProductoPorId(producto.getIdProducto());
        Map<String,Boolean> respuesta = new HashMap<>();
        respuesta.put("Eliminado",Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/productos/productosCount")
    public ResponseEntity<Long> contarProductos() {
        long totalProductos = productoServicio.contarProductos();
        return ResponseEntity.ok(totalProductos);
    }

    @GetMapping("/productos/productosCountLow")
    public ResponseEntity<Long> contarProductosLowStock() {
        List<Producto> productoStock = productoServicio.listarProductos();

        // Contamos los productos con menos de 10 unidades en existencia
        long productosConStockBajo = productoStock.stream()
                .filter(producto -> producto.getCantidadExistencia() < 10)
                .count(); // Contar cuántos productos cumplen la condición

        // Devolver el conteo
        return ResponseEntity.ok(productosConStockBajo);
    }

    @GetMapping("/productos/productosSinStock")
    public ResponseEntity<Long> contarProductosSinStock() {
        List<Producto> productoStock = productoServicio.listarProductos();

        // Filtramos los productos que tengan 0 cantidad en existencia
        long productosSinStock = productoStock.stream()
                .filter(producto -> producto.getCantidadExistencia() == 0)
                .count(); // Convierte el stream en una lista

        // Devolvemos el conteo
        return ResponseEntity.ok(productosSinStock);
    }

    @GetMapping("/productos/sumatorioPrecios")
    public ResponseEntity<Double> obtenerSumatorioPrecios(){
        double totalPrecios = productoServicio.sumatorioPrecios();
        return ResponseEntity.ok(totalPrecios);
    }
}
