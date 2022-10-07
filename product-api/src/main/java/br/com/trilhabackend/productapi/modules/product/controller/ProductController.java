package br.com.trilhabackend.productapi.modules.product.controller;

import br.com.trilhabackend.productapi.modules.product.dto.ProductRequest;
import br.com.trilhabackend.productapi.modules.product.dto.ProductResponse;
import br.com.trilhabackend.productapi.modules.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ProductResponse save(@RequestBody ProductRequest request) {
        return productService.save(request);
    }
}
