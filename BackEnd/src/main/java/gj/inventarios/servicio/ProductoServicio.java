package gj.inventarios.servicio;

import gj.inventarios.modelo.Producto;
import gj.inventarios.repositorio.ProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductoServicio implements IProductoServicio{

    @Autowired
    private ProductoRepositorio productoRepositorio;

    @Override
    public List<Producto> listarProductos() {
       return this.productoRepositorio.findAll();
    }

    @Override
    public Producto buscarProductoPorId(Integer idProducto) {
        return this.productoRepositorio.findById(idProducto).orElse(null);
    }

    @Override
    public Producto guardarProducto(Producto producto) {
        return this.productoRepositorio.save(producto);
    }

    @Override
    public void eliminarProductoPorId(Integer idProducto) {
        this.productoRepositorio.deleteById(idProducto);
    }

    @Override
    public long contarProductos() {
        return this.productoRepositorio.count();
    }

    @Override
    public double sumatorioPrecios() {
        List<Producto> productos = productoRepositorio.findAll();
        return productos.stream()
                .mapToDouble(Producto::getPrecio).sum();
    }
}
