package com.ssafy.shallwemeetthen.common.webhook.mattermost;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationManager {

    private final MattermostSender mattermostSender;

    public void sendNotification(Exception e, String uri, String params) {
        log.info("Send Notification.");
        mattermostSender.sendMessage(e, uri, params);
    }
}
