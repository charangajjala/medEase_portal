package com.chapp.med_ease.medicine.medicine_dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@Data
@Builder
public class MedicineRequest {

    @NotBlank(message = "Product title cannot be blank")
    private String productTitle;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotBlank(message = "Product type cannot be blank")
    private String productType;

    @NotBlank(message = "Company name cannot be blank")
    private String companyName;

    private int costPerMonth;

    private String expiryDate;

    private String manufactureDate;

    private String productCode;

    private MultipartFile imageFile;

    private int totalStock;

    private List<Integer> sellerIds;

}
