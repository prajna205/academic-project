package com.candidate.interview.hiringevent.runtime.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public abstract class AbstractRestController<T,I> {

    public abstract ResponseEntity<T> createResource(@RequestBody T body, HttpServletRequest request);
    public abstract ResponseEntity<T> updateResource(@RequestBody T body, @PathVariable I id, HttpServletRequest request);
    public abstract ResponseEntity<T> getResource(@PathVariable I id, HttpServletRequest request);
    public abstract ResponseEntity<List<T>> getResources(HttpServletRequest request);
    public abstract ResponseEntity<I> deleteResource(@PathVariable I id, HttpServletRequest request);

}
