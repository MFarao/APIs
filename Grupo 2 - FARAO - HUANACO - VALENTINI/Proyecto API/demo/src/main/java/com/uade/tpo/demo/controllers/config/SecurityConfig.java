package com.uade.tpo.demo.controllers.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import com.uade.tpo.demo.entity.Role;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthFilter;
        private final AuthenticationProvider authenticationProvider;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(req -> req
                                .requestMatchers(HttpMethod.GET,"/categories","/categories/**").hasAnyAuthority(Role.USER.name(),Role.ADMIN.name()) // Los usuarios no bloqueados podran ver las categorias
                                .requestMatchers(HttpMethod.POST, "/categories").hasAuthority(Role.ADMIN.name())// SOLO LOS ADMINS CREARAN LAS CATEGORIAS
                                .requestMatchers(HttpMethod.DELETE, "/categories/**").hasAuthority(Role.ADMIN.name())// SOLO LOS ADMINS ELIMINARAN LAS CATEGORIAS
                                .requestMatchers(HttpMethod.PUT, "/categories/**").hasAuthority(Role.ADMIN.name())// SOLO LOS ADMINS MODIFCARAN LAS CATEGORIAS
 
                                .requestMatchers(HttpMethod.GET,"/discounts", "/discounts/**").hasAuthority(Role.ADMIN.name())// SOLO LOS ADMINS PODRAN VER LOS DESCUENTOS
                                .requestMatchers(HttpMethod.POST,"/discounts").hasAuthority(Role.ADMIN.name())// SOLO LOS ADMINS PODRAN CREAR DESCUENTOS
                                .requestMatchers(HttpMethod.PUT,"/discounts/**").hasAuthority(Role.ADMIN.name())// SOLO LOS ADMINS PODRAN MODIFICAR DESCUENTOS
 
                                .requestMatchers(HttpMethod.GET,"/products","/products/**").hasAnyAuthority(Role.USER.name(),Role.ADMIN.name())// LOS GETS GENERALES DEL PRODUCTO SE PUEDEN HACER POR TODOS LOS USUARIOS NO BLOQUEADOS        
                                .requestMatchers(HttpMethod.POST, "/products").hasAuthority(Role.ADMIN.name()) // SOLO LOS ADMINS CREAN PRODUCTOS
                                .requestMatchers(HttpMethod.PUT,"/products/**").hasAuthority(Role.ADMIN.name()) // SOLO LOS ADMIN PUEDEN MODIFICAR LOS PRODUCTOS
                               
                                .requestMatchers(HttpMethod.GET, "/users/**").hasAuthority(Role.ADMIN.name()) //SOLO LOS ADMINS MANEJAN USUARIOS
                                .requestMatchers(HttpMethod.PUT, "/users/**").hasAuthority(Role.ADMIN.name()) //SOLO LOS ADMINS MANEJAN USUARIOS
       
                                .requestMatchers(HttpMethod.GET, "/order").hasAuthority(Role.ADMIN.name()) // TODAS LAS ORDENES SOLO LAS PUEDEN VER LOS ADMINS
                                .requestMatchers(HttpMethod.GET, "/order/**").hasAnyAuthority(Role.USER.name(),Role.ADMIN.name()) // LAS ORDENES LOS PUEDEN VER TODOS
                                .requestMatchers(HttpMethod.POST, "/order").hasAnyAuthority(Role.USER.name(),Role.ADMIN.name()) // LAS ORDENES LOS PUEDEN VER TODOS
                                .requestMatchers(HttpMethod.PUT, "/order/**").hasAuthority(Role.ADMIN.name()) // LAS ORDENES PUEDEN SER PASADAS DE ESTADO UNICAMENTE POR ADMIN
                                .requestMatchers("/api/v1/auth/**").permitAll()                
                                                .anyRequest()
                                                .authenticated())
                                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}
