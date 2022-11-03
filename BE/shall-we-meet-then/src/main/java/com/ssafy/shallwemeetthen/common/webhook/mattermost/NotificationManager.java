package com.ssafy.shallwemeetthen.common.webhook.mattermost;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class NotificationManager {

    private final MattermostSender mattermostSender;

    public void sendNotification(Exception e, String uri, String params) {
        mattermostSender.sendMessage(e, uri, params);
    }
}
