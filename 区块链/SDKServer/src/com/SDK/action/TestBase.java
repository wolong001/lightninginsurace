package com.SDK.action;
import org.fisco.bcos.web3j.crypto.Credentials;
import org.fisco.bcos.web3j.precompile.crud.*;
import org.fisco.bcos.web3j.protocol.Web3j;
import org.fisco.bcos.web3j.protocol.channel.ChannelEthereumService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import org.fisco.bcos.channel.client.Service;
public class TestBase {
	public static ApplicationContext context = null;
	public static Credentials credentials =
		      Credentials.create("81RkoziRYaig4umEMBw7P0qhRANCAASbALyeSfyw033i/AYKXSXevtRjDQP28rKV");
	protected static Web3j web3j;
	
	 public static void setUpBeforeClass() throws Exception {

		  	context = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
		    Service service = context.getBean(Service.class);
		    service.run();

		    ChannelEthereumService channelEthereumService = new ChannelEthereumService();
		    channelEthereumService.setChannelService(service);

		    web3j = Web3j.build(channelEthereumService, service.getGroupId());
	 }
}
