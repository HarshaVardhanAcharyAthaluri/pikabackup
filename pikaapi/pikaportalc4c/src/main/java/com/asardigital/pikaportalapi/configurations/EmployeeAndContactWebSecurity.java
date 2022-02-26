package com.asardigital.pikaportalapi.configurations;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.asardigital.pikaportalapi.security.AuthEntryPointJwt;
import com.asardigital.pikaportalapi.security.AuthTokenFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class EmployeeAndContactWebSecurity extends WebSecurityConfigurerAdapter{
	//EmployeeWebSecurity Filter if it fails then go to ContactWebSecurity Filter. 
	
	@Configuration
	@Order(1)
	public class EmployeeWebSecurityConfiguration extends WebSecurityConfigurerAdapter{
		
		@Autowired
		private AuthEntryPointJwt unauthorizedHandler;
		
		 @Resource(name = "employeeDetailsServiceImpl")
		 UserDetailsService employeeDetailsServiceImpl;

		@Bean
		public AuthTokenFilter authenticationJwtTokenFilter() {
			return new AuthTokenFilter();
		}

		@Override
		public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
			authenticationManagerBuilder.userDetailsService(employeeDetailsServiceImpl).passwordEncoder(passwordEncoder());
		}

		@Bean(name = "employeeAuthenticationManager")
		@Primary
		@Override
		public AuthenticationManager authenticationManagerBean() throws Exception {
			return super.authenticationManagerBean();
		}

		@Bean
		public PasswordEncoder passwordEncoder() {
			return new BCryptPasswordEncoder();
		}

		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.headers().frameOptions().sameOrigin().and().cors().and().csrf().disable()
				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authorizeRequests().antMatchers("/api/auth/**","/h2-console/**","/actuator/**").permitAll()
				.antMatchers("/employee/**").permitAll()
				.anyRequest().authenticated();

			http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
		}

	}
	
	@Configuration
	@Order(2)
	public class ContactWebSecurityConfiguration extends WebSecurityConfigurerAdapter{

		@Resource(name = "contactDetailsServiceImpl")
		UserDetailsService contactDetailsServiceImpl;
		
		@Autowired
		private AuthEntryPointJwt unauthorizedHandler;


		@Autowired
		public AuthTokenFilter authenticationJwtTokenFilter;

		@Autowired
		public PasswordEncoder passwordEncoder;
		
		@Bean(name = "contactAuthenticationManager")
		@Override
		public AuthenticationManager authenticationManagerBean() throws Exception {
			return super.authenticationManagerBean();
		}
		
		@Override
		public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
			authenticationManagerBuilder.userDetailsService(contactDetailsServiceImpl).passwordEncoder(passwordEncoder);
		}
		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http.headers().frameOptions().sameOrigin().and().cors().and().csrf().disable()
				.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authorizeRequests().antMatchers("/api/auth/**","/h2-console/**","/actuator/**").permitAll()
				.antMatchers("/contact/**").permitAll()
				.anyRequest().authenticated();

			http.addFilterBefore(authenticationJwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
		}
	}
}
