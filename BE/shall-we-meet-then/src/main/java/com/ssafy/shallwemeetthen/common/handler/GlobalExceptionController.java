package com.ssafy.shallwemeetthen.common.handler;



import com.ssafy.shallwemeetthen.common.webhook.mattermost.NotificationManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionController {

    private final NotificationManager notificationManager;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> mattermostSender(Exception e, HttpServletRequest request) {
        e.printStackTrace();
        notificationManager.sendNotification(e, request.getRequestURI(), getParams(request));

        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(BindingResult bindingResult) {
        Map<String, List<String>> errors = new HashMap<>();
        List<String> errorList = new ArrayList<>();
        bindingResult.getAllErrors().forEach(c -> errorList.add(((FieldError)c).getField() + " : " + c.getDefaultMessage()));
        errors.put("errors", errorList);
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    private String getParams(HttpServletRequest req) {
        StringBuilder params = new StringBuilder();
        Enumeration<String> keys = req.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            params.append("- ").append(key).append(" : ").append(req.getParameter(key)).append("/n");
        }

        return params.toString();
    }
}

