package br.com.trilhabackend.productapi.modules.category.controller;

import br.com.trilhabackend.productapi.modules.category.dto.CategoryRequest;
import br.com.trilhabackend.productapi.modules.category.dto.CategoryResponse;
import br.com.trilhabackend.productapi.modules.category.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public CategoryResponse save(@RequestBody CategoryRequest request) {
        return categoryService.save(request);
    }
}
