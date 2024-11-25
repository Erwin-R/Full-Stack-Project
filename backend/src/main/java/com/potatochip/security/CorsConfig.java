package com.potatochip.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
//public class WebMvcConfig implements WebMvcConfigurer (old way before adding spring security){
public class CorsConfig {

//   this is referencing inside the application.yml file
    @Value("#{'${cors.allowed-origins}'.split(',')}")
    private List<String> allowedOrigins;
    @Value("#{'${cors.allowed-methods}'.split(',')}")
    private List<String> allowedMethods;
    @Value("#{'${cors.allowed-headers}'.split(',')}")
    private List<String> allowedHeaders;
    @Value("#{'${cors.exposed-headers}'.split(',')}")
    private List<String> expectedHeaders;
//    need to expose additional headers otherwise you will not get the authorization header by default


//    stopped using this when we created the method below to handle CORS after adding spring security
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        // this allows the api to be accessed
//        CorsRegistration corsRegistration = registry.addMapping("/api/**");
//
////        allowedOrigins.forEach(origin -> corsRegistration.allowedOrigins(origin))
//        allowedOrigins.forEach(corsRegistration::allowedOrigins);
//        allowedMethods.forEach(corsRegistration::allowedOrigins);
//
//    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(allowedOrigins);
        configuration.setAllowedMethods(allowedMethods);
        configuration.setAllowedHeaders(allowedHeaders);
        configuration.setExposedHeaders(expectedHeaders);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
