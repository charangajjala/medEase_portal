package com.chapp.med_ease.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.chapp.med_ease.cart.Cart;
import com.chapp.med_ease.order.Order;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Address> addresses;

    @OneToMany(mappedBy = "user", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH,
            CascadeType.REFRESH })
    private List<Order> orders;

    private static final Logger logInfo = Logger.getLogger(User.class.getName());

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        logInfo.info("User: " + this.username + " has role: " + this.role.name());
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.role.name()));

    }

    public String getUserName() {
        return username;
    }

    @Override
    public String getPassword() {
        logInfo.info("User: " + this.username + " has password: " + this.password);
        return password;
    }

    @Override
    public String getUsername() {
        logInfo.info("User: " + this.username + " has username: " + this.username);
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        logInfo.info("User: " + this.username + " has account non expired: " + true);
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        logInfo.info("User: " + this.username + " has account non locked: " + true);
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        logInfo.info("User: " + this.username + " has credentials non expired: " + true);
        return true;
    }

    @Override
    public boolean isEnabled() {
        logInfo.info("User: " + this.username + " has enabled: " + true);
        return true;
    }

    public void addAddress(Address address) {
        if (this.addresses == null)
            this.addresses = new ArrayList<>();
        this.addresses.add(address);
    }

    public void addOrder(Order order) {
        if (this.orders == null)
            this.orders = new ArrayList<>();
        this.orders.add(order);
        order.setUser(this);
    }

}
