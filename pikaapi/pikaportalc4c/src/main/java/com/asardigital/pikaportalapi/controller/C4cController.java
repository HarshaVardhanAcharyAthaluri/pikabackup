package com.asardigital.pikaportalapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.asardigital.pikaportalapi.security.payloads.C4cResponse;
import com.asardigital.pikaportalapi.service.C4CService;

@RestController
public class C4cController {

	@Autowired
	private C4CService c4cservice;
	
	@GetMapping("/c4c/customer/{accountid}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Object getCustomerDetails(@PathVariable String accountid){
		return c4cservice.getCustomerDetails(accountid);
	}
	
	@GetMapping("/c4c/allcustomers/{accountid}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Object getAllCustomerDetails(@PathVariable String accountid){
		return c4cservice.getAllCustomerDetails(accountid);
	}
	
	@GetMapping("/c4c/allservicecontracts/{buyerpartyid}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Object getAllServiceContracts(@PathVariable String buyerpartyid){
		return c4cservice.getAllServiceContracts(buyerpartyid);
	}
	
	@GetMapping("/c4c/modulesinscope/{contractid}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Object getModulesInScope(@PathVariable String contractid){
		return c4cservice.getModulesInScope(contractid);
	}
	
	@GetMapping("/c4c/contracthourssummary/{contractid}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Object getContractHoursSummary(@PathVariable String contractid){
		return c4cservice.getContractHoursSummary(contractid);
	}
	
	@GetMapping("/c4c/hoursutilizeddetails/{contractid}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Object getHoursUtilizedDetails(@PathVariable String contractid){
		return c4cservice.getHoursUtilizedDetails(contractid);
	}
	
	@GetMapping("/c4c/reports/{buyerPartyID}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Object getReports(@PathVariable String buyerPartyID){
		return c4cservice.getReports(buyerPartyID);
	}
	
	@GetMapping("/c4c/servicerequests/{buyerPartyID}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Object getServiceRequests(@PathVariable String buyerPartyID){
		return c4cservice.getServiceRequests(buyerPartyID);
	}
	
	@GetMapping("/c4c/interactions/{serviceRequestId}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Object getServiceRequestInteractions(@PathVariable String serviceRequestId){
		return c4cservice.getServiceRequestsInteractions(serviceRequestId);
	}
}
