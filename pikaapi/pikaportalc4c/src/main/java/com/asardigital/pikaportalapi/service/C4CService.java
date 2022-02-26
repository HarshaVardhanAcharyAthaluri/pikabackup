package com.asardigital.pikaportalapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.asardigital.pikaportalapi.security.payloads.C4cResponse;

@Service
public class C4CService {

	@Autowired
	RestTemplate restTemplate;
	
	@Value("${c4c.url}")
	private String c4curl;
	
	@Value("${c4c.username}")
	private String username;
	@Value("${c4c.password}")
	private String password;
	
	public Object getCustomerDetails(String accountID) {
		HttpHeaders headers = new HttpHeaders();
		headers.setBasicAuth(username,password);
		HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
		ResponseEntity<Object> response = restTemplate.exchange(c4curl+"/cust/v1/test/CustomerCollection?$filter=AccountID eq "+"'"+accountID+"'"+"&$format=json", HttpMethod.GET,requestEntity, Object.class);
		return response.getBody();
	}
	
	public Object getAllCustomerDetails(String accountID) {
		HttpHeaders headers = new HttpHeaders();
		headers.setBasicAuth(username,password);
		HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
		ResponseEntity<Object> response = restTemplate.exchange(c4curl+"/v1/c4codataapi/ContactCollection?$filter=AccountID eq "+"'"+accountID+"'"+"&$format=json", HttpMethod.GET,requestEntity, Object.class);
		return response.getBody();
	}
	
	public Object getAllServiceContracts(String buyerPartyID) {
		HttpHeaders headers = new HttpHeaders();
		headers.setBasicAuth(username,password);
		HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
		ResponseEntity<Object> response = restTemplate.exchange(c4curl+"/v1/c4codataapi/ContractCollection?$filter=BuyerPartyID eq "+"'"+buyerPartyID+"'"+"&$format=json", HttpMethod.GET,requestEntity, Object.class);
		return response.getBody();
	}
	
	public Object getModulesInScope(String contractID) {
		HttpHeaders headers = new HttpHeaders();
		headers.setBasicAuth(username,password);
		HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
		ResponseEntity<Object> response = restTemplate.exchange(c4curl+"/v1/c4codataapi/ContractItemCollection?$filter=ContractID eq "+"'"+contractID+"'"+"&$format=json", HttpMethod.GET,requestEntity, Object.class);
		return response.getBody();
	}
	
	public Object getContractHoursSummary(String contractID) {
		HttpHeaders headers = new HttpHeaders();
		headers.setBasicAuth(username,password);
		HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
		ResponseEntity<Object> response = restTemplate.exchange(c4curl+"/v1/c4codataapi/ContractItemCollection?$filter=ContractID eq "+"'"+contractID+"'"+"&$format=json", HttpMethod.GET,requestEntity, Object.class);
		return response.getBody();
	}
	
	public Object getHoursUtilizedDetails(String contractID) {
		HttpHeaders headers = new HttpHeaders();
		headers.setBasicAuth(username,password);
		HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
		ResponseEntity<Object> response = restTemplate.exchange(c4curl+"/v1/c4codataapi/ServiceRequestCollection?$filter=ContractID eq "+"'"+contractID+"'"+"&$format=json", HttpMethod.GET,requestEntity, Object.class);
		return response.getBody();
	}
	
	public Object getReports(String buyerPartyID) {
		HttpHeaders headers = new HttpHeaders();
		headers.setBasicAuth(username,password);
		HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
		ResponseEntity<Object> response = restTemplate.exchange(c4curl+"/v1/c4codataapi/ServiceRequestCollection?$filter=BuyerPartyID eq "+"'"+buyerPartyID+"'"+"&$format=json", HttpMethod.GET,requestEntity, Object.class);
		return response.getBody();
	}
	
	public Object getServiceRequests(String buyerPartyID) {
		HttpHeaders headers = new HttpHeaders();
		headers.setBasicAuth(username,password);
		HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
		ResponseEntity<Object> response = restTemplate.exchange(c4curl+"/v1/c4codataapi/ServiceRequestCollection?$filter=BuyerPartyID eq "+"'"+buyerPartyID+"'"+"&$format=json", HttpMethod.GET,requestEntity, Object.class);
		return response.getBody();
	}
	
	public Object getServiceRequestsInteractions(String serviceRequestID) {
		HttpHeaders headers = new HttpHeaders();
		headers.setBasicAuth(username,password);
		HttpEntity<String> requestEntity = new HttpEntity<String>(headers);
		ResponseEntity<Object> response = restTemplate.exchange(c4curl+"/v1/c4codataapi/ServiceRequestTextCollectionCollection?$filter=ServiceRequestID eq "+"'"+serviceRequestID+"'"+"&&$top=2&$orderby=CreatedOn&?$format=json", HttpMethod.GET,requestEntity, Object.class);
		return response.getBody();
	}
	
}
