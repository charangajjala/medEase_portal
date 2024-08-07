package com.chapp.med_ease.auth;

import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.exception.exceptions.NotAuthenticatedException;
import com.chapp.med_ease.exception.exceptions.NotFoundException;

import com.chapp.med_ease.forgotPassword.forgotPasswordRequest;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginRequest req) throws NotFoundException {
        logger.info("Login request received in AuthController");

        if (req == null) {
            logger.warn("Received null request in /login");
        } else {
            logger.info("Received login request for {}", req.getEmail());
        }

        try {
            final LoginResponse res = authService.login(req);
            logger.info("Login successful for {}", req.getEmail());
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            logger.error("Error during login for {}: {}", req.getEmail(), e.getMessage());
            throw e;
        }
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerUser(@Valid @RequestBody RegisterRequest req) throws BadRequestException {

        authService.register(req);

    }

    @PostMapping("/forgotpassword")
    @ResponseStatus(HttpStatus.OK)
    public void forgotPassword(@RequestBody forgotPasswordRequest forgotPasswordRequest) throws BadRequestException {
        try {
            authService.changePassword(forgotPasswordRequest);
        } catch (IllegalStateException e) {
            throw new BadRequestException(e.getMessage());
        }
    }

    @PostMapping("/refresh")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponse postMethodName(@Valid @RequestBody RefreshRequest req)
            throws BadRequestException, NotAuthenticatedException {

        LoginResponse res = authService.refresh(req);
        return res;

    }

}
