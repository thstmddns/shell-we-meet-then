package com.ssafy.shallwemeetthen.domain.exception;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.*;
@ControllerAdvice
public class GlobalExceptionController {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(BindingResult bindingResult) {
        Map<String, List<String>> errors = new HashMap<>();
        List<String> errorList = new ArrayList<>();
        bindingResult.getAllErrors().forEach(c -> errorList.add(((FieldError)c).getField() + " : " + c.getDefaultMessage()));
        errors.put("errors", errorList);
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}

