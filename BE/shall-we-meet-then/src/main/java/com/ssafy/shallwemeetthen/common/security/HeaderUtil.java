package com.ssafy.shallwemeetthen.common.security;

import com.ssafy.shallwemeetthen.common.security.filter.AuthToken;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HeaderUtil {

    private final static String HEADER_AUTHORIZATION = "Authorization";
    private final static String TOKEN_PREFIX = "Bearer ";

    public static void setAccessToken(HttpServletResponse response, AuthToken authToken) {
        response.setHeader(HEADER_AUTHORIZATION, TOKEN_PREFIX + authToken.getToken());
    }

    public static String getAccessToken(HttpServletRequest request) {
        String headerValue = request.getHeader(HEADER_AUTHORIZATION);

        if (headerValue == null) {
            return null;
        }

        if (headerValue.startsWith(TOKEN_PREFIX)) {
            return headerValue.substring(TOKEN_PREFIX.length());
        }

        return null;
    }
}
