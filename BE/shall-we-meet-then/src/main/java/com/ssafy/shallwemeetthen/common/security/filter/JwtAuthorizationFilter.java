package com.ssafy.shallwemeetthen.common.security.filter;

import com.ssafy.shallwemeetthen.common.security.*;
import com.ssafy.shallwemeetthen.common.security.exception.MakeAccessTokenException;
import com.ssafy.shallwemeetthen.common.utils.RedisUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


//로그인시 호출하는 필터
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter implements HandlerInterceptor {

    private final AuthTokenProvider tokenProvider;

    private final SecurityContext securityContext;
    
    private final RedisUtil redisUtil;

    private final AuthTokenProvider provider;

    private boolean makeAccessToken(HttpServletRequest request, HttpServletResponse response){


        String tokenStr = HeaderUtil.getAccessToken(request);

        AuthToken accessToken = tokenProvider.convertAuthToken(tokenStr);

        Cookie cookie = CookieUtil.getCookie(request, JwtProperties.REFRESH_TOKEN).orElseThrow(() -> new IllegalArgumentException("AccessToken 이 없습니다."));

        AuthToken refreshToken = tokenProvider.convertAuthToken(cookie.getValue());

        //토큰이 있다면
        if (accessToken.validate()) {
            Claims cl = accessToken.getTokenClaims();

            String userSeq = cl.get("seq", String.class);

            if(userSeq!=null){
                //로컬쓰레드에 값 넣기
                securityContext.setThreadLocal(Long.parseLong(userSeq));
            }else{
                throw new RuntimeException();
            }
        //만료되었다면 Refresh Token 있는지 확인
        }else{
            if (refreshToken.validate()) {
               //토큰 레디스에서 확인하기
                if(redisUtil.getData(refreshToken.getToken())== null) throw new IllegalStateException("로그인을 다시 시도해 주세요");
                else {
                    throw new MakeAccessTokenException("엑세스 토큰이 만료되었습니다 다시 요청해 주세요");
                }
            }else{
                    throw new IllegalArgumentException("AccessToken을 다시 요청해 주세요.");
            }

        }


        return true;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            return makeAccessToken(request, response);
        }catch (MakeAccessTokenException e){

            AuthToken accessToken = provider.createAuthToken(JwtProperties.REFRESH_EXPIRED_TIME);
            log.info("토큰이다!!!"+accessToken);
            response.setHeader("AccessToken",accessToken.getToken());
            return false;

        } catch (RuntimeException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return false;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
