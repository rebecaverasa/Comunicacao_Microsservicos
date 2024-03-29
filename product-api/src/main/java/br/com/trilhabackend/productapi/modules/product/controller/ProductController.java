package br.com.trilhabackend.productapi.modules.product.controller;

import br.com.trilhabackend.productapi.config.exception.SuccessResponse;
import br.com.trilhabackend.productapi.modules.category.dto.CategoryRequest;
import br.com.trilhabackend.productapi.modules.product.dto.*;
import br.com.trilhabackend.productapi.modules.product.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.util.ObjectUtils.isEmpty;

@RestController
@AllArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;
    @PostMapping
    public ProductResponse save(@RequestBody ProductRequest request) {
        return productService.save(request);
    }
    @GetMapping
    public List<ProductResponse> findAll() {
        return productService.findAll();
    }
    @GetMapping("{id}")
    public ProductResponse findById(@PathVariable Integer id) {
        return productService.findByIdResponse(id);
    }
    @GetMapping("name/{name}")
    public List<ProductResponse> findByName(@PathVariable String name) {
        return productService.findByName(name);
    }
    @GetMapping("category/{categoryId}")
    public List<ProductResponse> findByCategoryId(@PathVariable Integer categoryId) {
        return productService.findByCategoryId(categoryId);
    }
    @GetMapping("supplier/{supplierId}")
    public List<ProductResponse> findBySupplierId(@PathVariable Integer supplierId) {
        return productService.findBySupplierId(supplierId);
    }
    @PutMapping("{id}")
    public ProductResponse update(@RequestBody ProductRequest request,
                                  @PathVariable Integer id) {
        return productService.update(request, id);
    }
    @DeleteMapping("{id}")
    public SuccessResponse delete(@PathVariable Integer id) {
        return productService.delete(id);
    }

    @PostMapping("check-stock")
    public SuccessResponse checkProductsStock(@RequestBody ProductCheckStockRequest request) {
        return productService.checkProductsStock(request);
    }

    @GetMapping("{id}/sales")
    public ProductSalesResponse findProductSales(@PathVariable Integer id) {
        return productService.findProductSales(id);
    }
}
