package com.ssafy.shallwemeetthen.common.security.exception;

public class MakeAccessTokenException extends RuntimeException {
    public MakeAccessTokenException() {
        super();
    }

    public MakeAccessTokenException(String message) {
        super(message);
    }
}
