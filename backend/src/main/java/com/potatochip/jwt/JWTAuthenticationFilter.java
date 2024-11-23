package com.potatochip.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {
    
    private final JWTUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JWTAuthenticationFilter(JWTUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if( authHeader == null || !authHeader.startsWith("Bearer ")){
//            if there is no authorization or starts with Bearer then we move onto the next request/filer in the chain
//            Bearer is the owner of the token. So if someone else had access to the token they could impersonate owner
            filterChain.doFilter(request, response);
            return;
        }

//       we then extract the token, we start at position 7 since anything after Bearer is where the jwt token starts
        String jwt = authHeader.substring(7);
        String subject = jwtUtil.getSubject(jwt);

//        if subject is not null and if user is not authenticated then we will authenticate user
        if (subject != null &&
                SecurityContextHolder.getContext().getAuthentication() == null){
//            this line below is how we load the user details based of their "username" (in our case we used user's email)
            UserDetails userDetails = userDetailsService.loadUserByUsername(subject);

//            here we are checking if token is valid(validating token)
            if(jwtUtil.isTokenValid(jwt, userDetails.getUsername())){

//                if token is valid then we create the UsernamePasswordAuthToken (basically create token)
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );

//                then we set Authentication on lines 62-65
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
//                then we create our Security context golder where it stores the security context of the current user
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
//        then we move on to the next filter
        filterChain.doFilter(request, response);
    }
}
