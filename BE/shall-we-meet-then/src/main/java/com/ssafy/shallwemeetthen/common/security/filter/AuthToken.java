package com.ssafy.shallwemeetthen.common.security.filter;

import io.jsonwebtoken.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.security.Key;
import java.util.Date;


//로그인시 호출하는 필터
@Slf4j
@RequiredArgsConstructor
public class AuthToken {

    @Getter
    private final String token;
    private final Key key;

    public AuthToken(String id, Key key, Date expiration) {
        this.key = key;
        this.token = createAuthToken(id, expiration);
    }

    public AuthToken( Date expiration,Key key) {
        this.key = key;
        this.token = createAuthToken(expiration);
    }


    private String createAuthToken(String id, Date expiration) {
        return Jwts.builder()
                .claim("seq", id)
                .signWith(key,SignatureAlgorithm.HS256)
                .setExpiration(expiration)
                .compact();
    }

    private String createAuthToken(Date expiration) {
        return Jwts.builder()
                .signWith(key,SignatureAlgorithm.HS256)
                .setExpiration(expiration)
                .compact();
    }


    public boolean validate() {
        return this.getTokenClaims() != null;
    }

    public Claims getTokenClaims() {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SecurityException e) {
            log.info("Invalid JWT signature.");
        } catch (MalformedJwtException e) {
            log.info("Invalid JWT token.");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
        }
        return null;
    }

    public Claims getExpiredTokenClaims() {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
            return e.getClaims();
        }
        return null;
    }
}