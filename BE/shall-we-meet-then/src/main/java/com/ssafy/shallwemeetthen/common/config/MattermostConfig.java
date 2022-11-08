package com.ssafy.shallwemeetthen.common.config;

import com.ssafy.shallwemeetthen.common.webhook.mattermost.MattermostProperties;
import com.ssafy.shallwemeetthen.common.webhook.mattermost.MattermostSender;
import com.ssafy.shallwemeetthen.common.webhook.mattermost.NotificationManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MattermostConfig {

    @Bean
    public NotificationManager notificationManager() {
        return new NotificationManager(mattermostSender());
    }

    @Bean
    public MattermostSender mattermostSender() {
        return new MattermostSender(mattermostProperties());
    }

    @Bean
    public MattermostProperties mattermostProperties() {
        return new MattermostProperties();
    }
}
