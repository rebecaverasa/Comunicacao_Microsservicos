package br.com.trilhabackend.productapi.modules.category.repository;

import br.com.trilhabackend.productapi.modules.category.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
