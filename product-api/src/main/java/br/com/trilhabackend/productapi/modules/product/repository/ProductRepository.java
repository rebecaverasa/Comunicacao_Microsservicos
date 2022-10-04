package br.com.trilhabackend.productapi.modules.product.repository;

import br.com.trilhabackend.productapi.modules.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository <Product, Integer> {
}
