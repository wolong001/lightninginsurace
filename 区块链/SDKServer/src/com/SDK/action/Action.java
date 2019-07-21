package com.SDK.action;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.fisco.bcos.web3j.precompile.crud.CRUDService;
import org.fisco.bcos.web3j.precompile.crud.Condition;
import org.fisco.bcos.web3j.precompile.crud.Entry;
import org.fisco.bcos.web3j.precompile.crud.Table;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

public class Action extends TestBase{
	HttpServletResponse response = ServletActionContext.getResponse();
	HttpServletRequest request = ServletActionContext.getRequest();
	private CRUDService crudSerivce = new CRUDService(web3j, credentials);
	public void initial() throws Exception{
		setUpBeforeClass();
		String tableName = "lightninginsurance";
	  	String key = "insuranceid";
	  	String valueFields  = "result, status";
	  	Table table = new Table(tableName, key, valueFields);
	  	int resultCreate = crudSerivce.createTable(table);
	  	String result = "{'result':" + String.valueOf(resultCreate) + "}";
	  	response.setContentType("text/html; charset=utf-8");
		PrintWriter out = response.getWriter();
		out.write(result);
		out.flush();
		out.close();
	}
	public void insert() throws Exception{
		Table table = crudSerivce.desc("lightninginsurance");
		Entry insertEntry = table.getEntry();
	    insertEntry.put("result", "-1");
    	insertEntry.put("status", "isinsuring");
    	String insuranceid = request.getParameter("insuranceid");
    	table.setKey(insuranceid);
    	int insertResult = crudSerivce.insert(table, insertEntry);
    	String result = "{'result':" + String.valueOf(insertResult) + "}";
	  	response.setContentType("text/html; charset=utf-8");
		PrintWriter out = response.getWriter();
		out.write(result);
		out.flush();
		out.close();
	}
	public void updateresult() throws Exception{
		Table table = crudSerivce.desc("lightninginsurance");
		String insuranceid = request.getParameter("insuranceid");
		table.setKey(insuranceid);
		Entry updateEntry = table.getEntry();
		String re = request.getParameter("result");
	  	updateEntry.put("result", re);
	  	Condition updateCondition = table.getCondition();
	  	int updateResult = crudSerivce.update(table, updateEntry, updateCondition);
	  	String result = "{'result':" + String.valueOf(updateResult) + "}";
	  	response.setContentType("text/html; charset=utf-8");
		PrintWriter out = response.getWriter();
		out.write(result);
		out.flush();
		out.close();
	}
	public void updatestatus() throws Exception{
		String insuranceid = request.getParameter("insuranceid");
		Table table = crudSerivce.desc("lightninginsurance");
		table.setKey(insuranceid);
		Entry updateEntry = table.getEntry();
		String s = request.getParameter("result");
	  	updateEntry.put("status", s);
	  	Condition updateCondition = table.getCondition();
	  	int updateResult = crudSerivce.update(table, updateEntry, updateCondition);
	  	String result = "{'result':" + String.valueOf(updateResult) + "}";
	  	response.setContentType("text/html; charset=utf-8");
		PrintWriter out = response.getWriter();
		out.write(result);
		out.flush();
		out.close();
	}
	public void search() throws Exception{
		String insuranceid = request.getParameter("insuranceid");
		Table table = crudSerivce.desc("lightninginsurance");
		table.setKey(insuranceid);
		Condition condition = table.getCondition();
		List<Map<String, String>> resultSelect1 = crudSerivce.select(table, condition);
		String result = "{'result':" + resultSelect1.get(0).get("result") + ", 'status':" + resultSelect1.get(0).get("status") + "}";
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = response.getWriter();
		out.write(result);
		out.flush();
		out.close();
	}
}
