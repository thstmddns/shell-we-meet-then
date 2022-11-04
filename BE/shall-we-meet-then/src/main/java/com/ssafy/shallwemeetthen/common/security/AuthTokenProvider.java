package com.ssafy.shallwemeetthen.common.security;

import com.ssafy.shallwemeetthen.common.security.filter.AuthToken;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import java.security.Key;
import java.util.Date;


@Slf4j
public class AuthTokenProvider {

    private final Key key;
    private static final String AUTHORITIES_KEY = "role";

    public AuthTokenProvider(String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public AuthToken createAuthToken(String id, Date expiry) {
        return new AuthToken(id, key, expiry);
    }

    public AuthToken createAuthToken(String id, String role, Date expiry) {
        return new AuthToken(id, key);
    }

    public AuthToken convertAuthToken(String token) {
        return new AuthToken(token, key);
    }

    public AuthToken createAuthToken(Date expiry) {
        return new AuthToken(expiry,key);
    }
}
