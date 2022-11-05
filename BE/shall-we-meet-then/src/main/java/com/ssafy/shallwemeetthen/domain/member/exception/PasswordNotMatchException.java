package com.ssafy.shallwemeetthen.domain.member.exception;

public class PasswordNotMatchException extends RuntimeException {
    public PasswordNotMatchException() {
        super();
    }

    public PasswordNotMatchException(String message) {
        super(message);
    }
}
