package com.uade.tpo.demo.controllers.order;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.demo.controllers.product.ProductRequest;
import com.uade.tpo.demo.entity.Category;
import com.uade.tpo.demo.entity.Order;
import com.uade.tpo.demo.entity.Product;
import com.uade.tpo.demo.exceptions.CambioInvalidoException;
import com.uade.tpo.demo.exceptions.CantidadExedenteException;
import com.uade.tpo.demo.exceptions.CategoryDuplicateException;
import com.uade.tpo.demo.exceptions.OrderNotExistsException;
import com.uade.tpo.demo.exceptions.ProductNotExistsException;
import com.uade.tpo.demo.exceptions.UserNotExistsException;
import com.uade.tpo.demo.service.Category.CategoryService;
import com.uade.tpo.demo.service.Order.OrderService;
import com.uade.tpo.demo.service.Product.ProductService;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<Order>> getOrder(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page == null || size == null)
            return ResponseEntity.ok(orderService.getOrder(PageRequest.of(0, Integer.MAX_VALUE)));
        return ResponseEntity.ok(orderService.getOrder(PageRequest.of(page, size)));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long orderId) {
        Optional<Order> result = orderService.getOrderById(orderId);
        if (result.isPresent()){
            Order order = result.get();
            OrderDTO dto = new OrderDTO();
            dto.setEmail(order.getUser().getEmail());
            dto.setIdProducto(order.getProduct().getId());
            dto.setCantidadProducto(order.getCantidadProducto());
            dto.setEnvio_a(order.getEnvio_a());
            return ResponseEntity.ok(dto);
        }

        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Object> createOrder(@RequestBody OrderRequest orderRequest)
            throws UserNotExistsException, ProductNotExistsException, CantidadExedenteException {
        Order result = orderService.createOrder(orderRequest.getEmail(),orderRequest.getIdProducto(),orderRequest.getCantidadProducto(),orderRequest.getEnvio_a());
        return ResponseEntity.created(URI.create("/order/" + result.getId())).body(result);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderDTO> updateStatus(@PathVariable Long orderId,@RequestBody OrderStatusRequest orderStatusRequest) throws OrderNotExistsException, CambioInvalidoException {
        Order updated = orderService.updateStatus(orderId, orderStatusRequest);
        OrderDTO dto = new OrderDTO();
        dto.setEmail(updated.getUser().getEmail());
        dto.setIdProducto(updated.getProduct().getId());
        dto.setCantidadProducto(updated.getCantidadProducto());
        dto.setEnvio_a(updated.getEnvio_a());
        return ResponseEntity.ok(dto);
    }
}
