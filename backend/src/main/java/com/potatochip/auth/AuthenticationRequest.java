package com.potatochip.auth;

public record AuthenticationRequest(
        String username,
        String password
) {
}
