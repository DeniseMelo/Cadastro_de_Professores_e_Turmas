package SoulCode.AlocacaoDeProfessores.Security;

import SoulCode.AlocacaoDeProfessores.Data.DetalheUsuarioData;
import SoulCode.AlocacaoDeProfessores.Models.UsuarioJWT;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

public class JWTAutenticarFilter extends UsernamePasswordAuthenticationFilter {

    // Expiração do TOKEN em pouco mais de 2 horas
    public static final int TOKEN_EXPIRACAO = 800_000;

    // soulcode - https://www.geradordesenha.com/gerador-online-de-senhas-hash-sha512/
    public static final String TOKEN_SENHA = "47c38636419f66662aaf1ad5639da90f0636f51d2ecc45465d5b9e3337b9a18f9002daf25ab17419eec9d21c7a92db7d3a8870a58e0ae0bc23d25c4b3084750a";

    private final AuthenticationManager authenticationManager;

    public JWTAutenticarFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException{
        try {
            UsuarioJWT usuario = new ObjectMapper()
                    .readValue(request.getInputStream(), UsuarioJWT.class);
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    usuario.getLogin(),
                    usuario.getPassword(),
                    new ArrayList<>()));
        }
        catch(IOException e) {
            throw new RuntimeException("Falha ao tentar autenticar o Usuário", e);
        }
    }

    @Override
    protected void successfulAuthentication (HttpServletRequest request,
                                             HttpServletResponse response,
                                             FilterChain chai,
                                             Authentication authResult) throws IOException{
        DetalheUsuarioData usuarioData = (DetalheUsuarioData) authResult.getPrincipal();

        String token = JWT.create()
                .withSubject(usuarioData.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+ TOKEN_EXPIRACAO))
                .sign(Algorithm.HMAC512(TOKEN_SENHA));

        response.setHeader("Access-Control-Allow-Origin","*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        response.getWriter().write("{\"Authorization\": \"" + token + "\"}");
        response.getWriter().flush();
    }
}
