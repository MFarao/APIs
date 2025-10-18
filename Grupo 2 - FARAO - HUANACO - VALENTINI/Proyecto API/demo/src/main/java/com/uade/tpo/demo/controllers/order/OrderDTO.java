package com.uade.tpo.demo.controllers.order;

import lombok.Data;

@Data
public class OrderDTO {
    private String email;
    private Long idProducto;
    private int cantidadProducto;
    private String envio_a;
}