package com.candidate.interview.hiringevent.runtime.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcDaoSupport;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

public abstract class AbstractDaoImpl<T,I> extends NamedParameterJdbcDaoSupport implements IGenericEntityDao<T,I> {

    @Autowired
    private DataSource dataSource;

    @PostConstruct
    public void init()
    {
        super.setDataSource(dataSource);
    }
}
