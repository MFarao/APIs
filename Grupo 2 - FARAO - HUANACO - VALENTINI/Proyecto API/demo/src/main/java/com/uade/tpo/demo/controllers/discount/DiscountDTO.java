package com.uade.tpo.demo.controllers.discount;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;

@Data
public class DiscountDTO {
    private Double percentage;
    private LocalDate startDate;
    private LocalDate endDate;
}
