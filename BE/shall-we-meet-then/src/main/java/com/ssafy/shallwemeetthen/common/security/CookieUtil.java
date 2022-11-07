package com.ssafy.shallwemeetthen.common.security;

import org.springframework.http.ResponseCookie;
import org.springframework.util.SerializationUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
import java.util.Optional;

public class CookieUtil {

    public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    return Optional.of(cookie);
                }
            }
        }
        return Optional.empty();
    }

    public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
       ResponseCookie cookie = ResponseCookie.from(name,value)
               .maxAge(maxAge) // TODO : 나중에 기간 알아서 바꿀것,,,
               .path("/")
               .httpOnly(true)
               .secure(true)
               .sameSite("None") // TODO : https로 바뀌면 바꿔야함..?
               .domain("localhost") // TODO : 프론트도에민 수정되면 바꿔야함
               .build();
        response.addHeader("Set-Cookie", cookie.toString());


//        cookie.setHttpOnly(true);
//        cookie.setPath("/");
//        cookie.setMaxAge(maxAge);
//        cookie.setSecure(false);
//        response.setHeader("Set-Cookie",  );
//        response.addCookie(cookie);
    }




    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
    }

    public static String serialize(Object obj) {
        return Base64.getUrlEncoder()
                .encodeToString(SerializationUtils.serialize(obj));
    }

    public static <T> T deserialize(Cookie cookie, Class<T> cls) {
        return cls.cast(
                SerializationUtils.deserialize(
                        Base64.getUrlDecoder().decode(cookie.getValue())
                )
        );
    }
}
