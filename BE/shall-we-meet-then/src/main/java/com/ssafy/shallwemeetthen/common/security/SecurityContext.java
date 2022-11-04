package com.ssafy.shallwemeetthen.common.security;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SecurityContext {

    private final ThreadLocal<Long> myThreadLocal = new ThreadLocal<>();

    public Long getThreadLocal() {
        log.info("{}", myThreadLocal.get());
        return myThreadLocal.get();
    }

    public void setThreadLocal(Long memberSeq) {
        myThreadLocal.set(memberSeq);
    }

    public void removeThreadLocal(){
        myThreadLocal.remove();
    }
}
