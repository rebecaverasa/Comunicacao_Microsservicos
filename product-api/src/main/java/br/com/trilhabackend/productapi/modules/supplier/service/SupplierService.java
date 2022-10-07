package br.com.trilhabackend.productapi.modules.supplier.service;

import br.com.trilhabackend.productapi.config.exception.ValidationException;
import br.com.trilhabackend.productapi.modules.supplier.dto.SupplierRequest;
import br.com.trilhabackend.productapi.modules.supplier.dto.SupplierResponse;
import br.com.trilhabackend.productapi.modules.supplier.model.Supplier;
import br.com.trilhabackend.productapi.modules.supplier.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static org.springframework.util.ObjectUtils.isEmpty;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    public Supplier findById(Integer id) {
        return supplierRepository
                .findById(id)
                .orElseThrow(() -> new ValidationException("There's no supplier for the given ID."));
    }

    public SupplierResponse save(SupplierRequest request) {
        validateSupplierNameInformed(request);
        var supplier = supplierRepository.save(Supplier.of(request));
        return SupplierResponse.of(supplier);
    }

    private void validateSupplierNameInformed(SupplierRequest request) {
        if (isEmpty(request.getName())) {
            throw new ValidationException("The supplier's name was not informed.");
        }
    }
}