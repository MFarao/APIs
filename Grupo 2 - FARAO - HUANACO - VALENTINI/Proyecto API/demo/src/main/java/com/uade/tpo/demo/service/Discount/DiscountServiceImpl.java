package com.uade.tpo.demo.service.Discount;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.uade.tpo.demo.entity.Discount;
import com.uade.tpo.demo.entity.Product;
import com.uade.tpo.demo.exceptions.CambioInvalidoException;
import com.uade.tpo.demo.exceptions.CategoryNoExistsException;
import com.uade.tpo.demo.exceptions.DiscountErrorCreation;
import com.uade.tpo.demo.exceptions.DiscountNotExistsException;
import com.uade.tpo.demo.exceptions.ProductNotExistsException;
import com.uade.tpo.demo.exceptions.UserNotExistsException;
import com.uade.tpo.demo.controllers.discount.DiscountDTO;
import com.uade.tpo.demo.controllers.discount.DiscountRequest;
import com.uade.tpo.demo.controllers.discount.DiscountUpdateRequest;
import com.uade.tpo.demo.entity.Category;
import com.uade.tpo.demo.repository.CategoryRepository;
import com.uade.tpo.demo.repository.DiscountRepository;
import com.uade.tpo.demo.repository.ProductRepository;

@Service
public class DiscountServiceImpl implements DiscountService {

    @Autowired
    private DiscountRepository discountRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CategoryRepository categoryRepo;

    @Override
    public Page<Discount> getDiscounts(PageRequest pageRequest) {
        return discountRepo.findAll(pageRequest);
    }

    @Override
    public Optional<Discount> getDiscountById(Long discountId) {
        return discountRepo.findById(discountId);
    }
    @Transactional(rollbackFor = Throwable.class)
    public Discount createDiscount(Double percentage, LocalDate startDate, LocalDate endDate) throws DiscountErrorCreation{
        if(percentage<=0||percentage>=1||startDate.isBefore(LocalDate.now())||endDate.isBefore(LocalDate.now())){
            throw new DiscountErrorCreation();
        }
        Discount d = new Discount(percentage,startDate,endDate);
        discountRepo.save(d);
        return d;
    } 

    @Transactional(rollbackFor = Throwable.class)
    public Discount updateDiscounts(Long discountId, DiscountUpdateRequest discountUpdateRequest) throws CategoryNoExistsException, DiscountNotExistsException, ProductNotExistsException {
        Optional<Discount> discount =  discountRepo.findById(discountId);
        if (discount.isPresent()) {
            Discount dis =  discount.get();

            if (!discountUpdateRequest.getCategoriesId().isEmpty()) {

                for (Long categoryId : discountUpdateRequest.getCategoriesId()) { // para todos los id chequeamos si existen y modificamos sus productos
                    Optional<Category> category = categoryRepo.findById(categoryId);

                    if (category.isPresent()){
                        Category cat = category.get();
                        for (Product product : productRepo.findAllByCategoryId(categoryId)) { // para todos los productos de una categoria rehacemos el precio
                            double precioDescuento = product.getPrecio() * (1 - dis.getPercentage());
                            precioDescuento = Math.round(precioDescuento * 100.0) / 100.0;
                            product.setPrecioDescuento(precioDescuento);
                            product.setDiscount(dis);
                            productRepo.save(product);
                        }
                        dis.getCategory().add(cat);
                        dis.setActive(true); // si se quiere actualizar uno desactivado que lo active
                        
                    }
                    else{
                        throw new CategoryNoExistsException();
                    }
                }
                discountRepo.save(dis);
                return dis;

            }else if (!discountUpdateRequest.getProductsId().isEmpty()) {

                for (Long productsId : discountUpdateRequest.getProductsId()) { // para todos los id chequeamos si existen y modificamos sus productos
                    Optional<Product> product = productRepo.findById(productsId);
                    
                    if (product.isPresent()){
                        Product pro = product.get();

                        double precioDescuento = pro.getPrecio() * (1 - dis.getPercentage());
                        precioDescuento = Math.round(precioDescuento * 100.0) / 100.0;
                        pro.setPrecioDescuento(precioDescuento);
                        pro.setDiscount(dis);
                        productRepo.save(pro);

                        dis.getProduct().add(pro);
                        dis.setActive(true); // si se quiere actualizar uno desactivado que lo active
                        
                    }else{
                        throw new ProductNotExistsException();
                    }
            
                }
                discountRepo.save(dis);
                return dis;
            }
    }
    throw new DiscountNotExistsException();
}

    @Override //Saca la relacion descuento a los productos asignados
    @Transactional(rollbackFor = Throwable.class)
    public Discount deactivateDiscount(Long discountId) throws CambioInvalidoException{
        Optional<Discount> d = discountRepo.findById(discountId);
        if(d.isEmpty()){
            throw new CambioInvalidoException();
        }
        Discount dis = d.get();
        if (dis.getCategory() != null) {
            for (Category category : dis.getCategory()) {
                for (Product product : productRepo.findAllByCategoryId(category.getId())) { // para todos los productos de una categoria rehacemos el precio
                product.setPrecioDescuento(null);
                product.setDiscount(null);
                }
            }
            
        }else if (dis.getProduct() !=null) {
            for (Product product : discountRepo.findProductsByDiscountIds(discountId)) { // para todos los productos que tienen el descuento rehacemos el precio
                product.setPrecioDescuento(null);
                product.setDiscount(null);

            }
        }
        dis.setActive(false);
        discountRepo.save(dis);
        return dis;
    }

    public DiscountDTO cargarDiscountDTO(Discount discount) {
        DiscountDTO discountDTO = new DiscountDTO();
        discountDTO.setPercentage(discount.getPercentage() * 100);
        discountDTO.setStartDate(discount.getStartDate());
        discountDTO.setEndDate(discount.getEndDate());
        return discountDTO;
    }
}
