package com.ssafy.shallwemeetthen.domain.groupmember.exception;

public class DuplicatedGroupMemberException extends RuntimeException {

    public DuplicatedGroupMemberException() {
        super();
    }

    public DuplicatedGroupMemberException(String message) {
        super(message);
    }
}
