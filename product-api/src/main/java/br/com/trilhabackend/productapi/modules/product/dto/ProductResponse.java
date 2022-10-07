package br.com.trilhabackend.productapi.modules.category.dto;

import br.com.trilhabackend.productapi.modules.category.model.Category;
import br.com.trilhabackend.productapi.modules.supplier.dto.SupplierResponse;
import br.com.trilhabackend.productapi.modules.supplier.model.Supplier;
import lombok.Data;
import org.springframework.beans.BeanUtils;

@Data
public class CategoryResponse {

    private Integer id;
    private String description;

    public static SupplierResponse of(Supplier supplier) {
        var response = new SupplierResponse();
        BeanUtils.copyProperties(supplier, response);
        return response;
    }
}
