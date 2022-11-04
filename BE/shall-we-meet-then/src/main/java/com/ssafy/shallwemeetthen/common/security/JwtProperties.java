package com.ssafy.shallwemeetthen.common.security;

import java.util.Date;

public interface JwtProperties {
	String SUBJECT ="105TOKEN";
	String SECRET = "ShallWeMeetThenShallWeMeetThenShallWeMeetThenShallWeMeetThen"; // 우리 서버만 알고 있는 비밀값
	Date ACCESS_EXPIRED_TIME = new Date(System.currentTimeMillis()+1000*60*60*24*14);

	Date REFRESH_EXPIRED_TIME =  new Date(System.currentTimeMillis()+1000*60*60*24*14);
	int MONTH =  60*60*24*30;



	String SEQ = "Seq";

	String REFRESH_TOKEN = "RefreshToken";
}
