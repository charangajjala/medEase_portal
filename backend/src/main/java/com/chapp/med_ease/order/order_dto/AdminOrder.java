package com.chapp.med_ease.order.order_dto;

import java.util.List;

import com.chapp.med_ease.cart.cart_dto.CartItemResponse;
import com.chapp.med_ease.order.Order;
import com.chapp.med_ease.user.address_dto.AddressResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AdminOrder {
    private int id;

    private String orderDate;

    private int totalAmount;

    private List<CartItemResponse> products;

    private AddressResponse address;

    private String username;

    private String email;

    public AdminOrder(Order order, List<CartItemResponse> cartItems) {
        this.id = order.getId();
        this.orderDate = order.getOrderDate();
        this.totalAmount = order.getCart().getTotalCost();
        this.address = new AddressResponse(order.getAddress());
        this.products = cartItems;
        this.username = order.getUser().getUsername();
        this.email = order.getUser().getEmail();
    }

}
