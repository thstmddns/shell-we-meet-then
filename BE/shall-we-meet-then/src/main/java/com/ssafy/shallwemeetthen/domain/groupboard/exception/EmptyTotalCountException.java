package com.ssafy.shallwemeetthen.domain.groupboard.exception;

public class EmptyTotalCountException extends RuntimeException{
    public EmptyTotalCountException() {
        super();
    }

    public EmptyTotalCountException(String message) {
        super(message);
    }
}
