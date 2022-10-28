package com.ssafy.shallwemeetthen.common.webhook.mattermost.dto;

import com.google.gson.annotations.SerializedName;
import lombok.*;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

public class MattermostMessage {
    @Getter
    public static class Attachments {
        private Props props;
        private List<Attachment> attachments;

        public Attachments() {
            attachments = new ArrayList<>();
        }

        public Attachments(List<Attachment> attachments) {
            this.attachments = attachments;
        }

        public Attachments(Attachment attachment) {
            this();
            this.attachments.add(attachment);
        }

        public void addProps(Exception e) {
            props = new Props(e);
        }

    }

    @Getter
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Attachment {
        private String channel;

        private String pretext;

        private String color;

        @SerializedName("author_name")
        private String authorName;

        @SerializedName("author_icon")
        private String authorIcon;

        private String title;

        private String text;

        private String footer;

        public void addExceptionInfo(Exception e) {
            this.title = e.getClass().getSimpleName();

            String sb = text + "**Error Message**" + '\n' + '\n' + "```" + e.getMessage() + "```" +
                    '\n' + '\n';

            this.text = sb;
        }

        public void addExceptionInfo(Exception e, String uri) {
            this.addExceptionInfo(e);

            this.text = text + "**Request URL**" + '\n' + '\n' + uri + '\n' + '\n';
        }

        public void addExceptionInfo(Exception e, String uri, String params) {
            this.addExceptionInfo(e, uri);

            this.text = text + "**Parameters**" + '\n' + '\n' + params + '\n' + '\n';
        }

    }

    @Getter
    @NoArgsConstructor
    public static class Props {
        private String card;

        public Props(Exception e) {
            StringBuilder text = new StringBuilder();

            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            text.append("**Stack Trace**").append("\n").append('\n').append("```");
            text.append(sw.toString().substring(0,
                    Math.min(5500, sw.toString().length()))).append("\n...").append('\n').append('\n');

            this.card = text.toString();
        }
    }
}
