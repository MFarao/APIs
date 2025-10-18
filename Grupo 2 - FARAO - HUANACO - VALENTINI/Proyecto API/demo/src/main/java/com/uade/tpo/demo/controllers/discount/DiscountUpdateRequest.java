package com.uade.tpo.demo.controllers.discount;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class DiscountUpdateRequest {
    private List<Long> productsId;
    private List<Long> categoriesId;
}
