package com.ssafy.shallwemeetthen.common.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Bean
    public SecurityContext securityContext(){
        return new SecurityContext();
    }

    @Bean
    public AuthTokenProvider authTokenProvider() {
        return new AuthTokenProvider(JwtProperties.SECRET);
    }
}
