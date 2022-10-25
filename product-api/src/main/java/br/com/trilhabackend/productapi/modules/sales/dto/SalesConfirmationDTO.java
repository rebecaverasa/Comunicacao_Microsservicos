package br.com.trilhabackend.productapi.modules.sales.dto;

import br.com.trilhabackend.productapi.modules.sales.enums.SalesStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesConfirmationDTO {
    private String salesId;
    private SalesStatus status;
}
