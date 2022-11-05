package com.ssafy.shallwemeetthen.common.config;

import com.ssafy.shallwemeetthen.common.security.filter.CorsFilter;
import com.ssafy.shallwemeetthen.common.security.filter.JwtAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final JwtAuthorizationFilter jwtAuthorizationFilter;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(jwtAuthorizationFilter)
                .addPathPatterns("/**")
                .excludePathPatterns("/members/**"); //인터셉터에서 빠질 것

    }
}
