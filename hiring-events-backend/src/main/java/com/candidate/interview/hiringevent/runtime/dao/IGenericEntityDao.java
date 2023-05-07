package com.candidate.interview.hiringevent.runtime.dao;

import java.util.List;

public interface IGenericEntityDao<T,I> {

    public T insert(T t);
    public T update(I id, T t);
    public Integer delete(I id);
    public T select(I id);
    public List<T> selectAll();

}
