package com.ssafy.shallwemeetthen.domain.groupboard.exception;

public class EmptyFileException extends RuntimeException {
    public EmptyFileException() {
        super();
    }

    public EmptyFileException(String message) {
        super(message);
    }
}
