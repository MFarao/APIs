package com.uade.tpo.demo.controllers.product;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.demo.controllers.order.OrderUpdateRequest;
import com.uade.tpo.demo.entity.Category;
import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.Product;
import com.uade.tpo.demo.exceptions.CantidadExedenteException;
import com.uade.tpo.demo.exceptions.CategoryDuplicateException;
import com.uade.tpo.demo.exceptions.CategoryNoExistsException;
import com.uade.tpo.demo.exceptions.OrderNotExistsException;
import com.uade.tpo.demo.exceptions.ProductNotExistsException;
import com.uade.tpo.demo.service.Category.CategoryService;
import com.uade.tpo.demo.service.Product.ProductService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Page<Product>> getProduct(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page == null || size == null)
            return ResponseEntity.ok(productService.getProduct(PageRequest.of(0, Integer.MAX_VALUE)));
        return ResponseEntity.ok(productService.getProduct(PageRequest.of(page, size)));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
        Optional<Product> result = productService.getProductById(productId);
        if (result.isPresent())
            return ResponseEntity.ok(result.get());

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<List<Product>> getProductByName(@PathVariable String name) {
        List<Product> result = productService.getProductByName(name);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/description/{description}")
    public ResponseEntity<List<Product>> getProductByDescription(@PathVariable String description) {
        List<Product> result = productService.getProductByDescription(description);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/mayor_que/{precio}")
    public ResponseEntity<List<Product>> getProductByPrecioMayorQue(@PathVariable Double precio) {
        List<Product> result = productService.getProductByPrecioMayorQue(precio);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/menor_que/{precio}")
    public ResponseEntity<List<Product>> getProductByPrecioMenorQue(@PathVariable Double precio) {
        List<Product> result = productService.getProductByPrecioMenorQue(precio);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<Object> createProduct(@RequestBody ProductRequest productRequest)
            throws CategoryNoExistsException {
        Product result = productService.createProduct(productRequest);
        return ResponseEntity.created(URI.create("/product/" + result.getId())).body(result);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId,@RequestBody ProductUpdateRequest productUpdateRequest) throws ProductNotExistsException {
        Product updated = productService.updateProduct(productId, productUpdateRequest);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{productId}/agregarImagenes")
    public ResponseEntity<Product> agregarImagenes(@PathVariable Long productId, @RequestBody ProductImageRequest productImageRequest) throws ProductNotExistsException {
        Product updated = productService.agregarImagenes(productId, productImageRequest);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{productId}/eliminarImagenes")
    public ResponseEntity<Product> eliminarImagenes(@PathVariable Long productId, @RequestBody ProductImageRequest productImageRequest) throws ProductNotExistsException {
        Product updated = productService.eliminarImagenes(productId, productImageRequest);
        return ResponseEntity.ok(updated);
    }
    
    @PutMapping("/{productId}/in_activar")
    public ResponseEntity<Product> in_activarProductoById(@PathVariable Long productId) throws ProductNotExistsException {
        Product updated = productService.in_activarProductoById(productId);
        return ResponseEntity.ok(updated);
    } 
}   
