package com.chapp.med_ease.medicine;

import com.chapp.med_ease.company.Company;
import com.chapp.med_ease.medicine_type.MedicineType;

import com.chapp.med_ease.seller.Seller;
import jakarta.persistence.*;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "medicine")
public class Medicine {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private int id;

        @Column(name = "product_title", unique = true, nullable = false)
        private String productTitle;

        @Column(name = "description", nullable = false)
        private String description;

        @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH })
        @JoinColumn(name = "medicine_type_id", nullable = false)
        private MedicineType medicineType;

        @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH })
        @JoinColumn(name = "company_id", nullable = false)
        private Company company;

//        @ManyToMany(mappedBy = "medicines")
//        private Set<Seller> sellers;

        @Column(name = "cost_per_month")
        private int costPerMonth;

        @Column(name = "expiry_date")
        private String expiryDate;

        @Column(name = "manufacture_date")
        private String manufactureDate;

        @Column(name = "product_code")
        private String productCode;

        @Column(name = "total_stock")
        private int totalStock;

        @Column(name="image_key")
        private  String imageKey;

}
