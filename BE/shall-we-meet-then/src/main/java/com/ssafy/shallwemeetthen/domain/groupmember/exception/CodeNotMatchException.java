package com.ssafy.shallwemeetthen.domain.groupmember.exception;

public class CodeNotMatchException extends RuntimeException{

    public CodeNotMatchException() {
        super();
    }

    public CodeNotMatchException(String message) {
        super(message);
    }
}
