package com.chapp.med_ease.cart;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.chapp.med_ease.cart.cart_dto.CartItemResponse;
import com.chapp.med_ease.cart.cart_dto.CartRequest;
import com.chapp.med_ease.exception.exceptions.BadRequestException;

import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Data
@RequiredArgsConstructor
@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public void postCart(@Valid @RequestBody CartRequest req) throws BadRequestException {
        cartService.addProductToCart(req);

    }

    @GetMapping("")
    @ResponseStatus(HttpStatus.OK)
    public List<CartItemResponse> getMethodName() throws BadRequestException {

        List<CartItemResponse> res = cartService.getCartItems();

        return res;

    }

    @PutMapping("/cartitem/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCartItem(@PathVariable int id) throws BadRequestException {
        cartService.deleteCartItem(id);

    }

    @DeleteMapping("")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCart() throws BadRequestException {
        cartService.deleteCart();

    }

}
