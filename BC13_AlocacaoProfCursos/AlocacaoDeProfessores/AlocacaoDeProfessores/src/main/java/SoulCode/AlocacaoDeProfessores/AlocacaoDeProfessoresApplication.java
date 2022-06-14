package SoulCode.AlocacaoDeProfessores;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AlocacaoDeProfessoresApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlocacaoDeProfessoresApplication.class, args);



		System.out.println(new BCryptPasswordEncoder().encode("1234"));
		System.out.println(" <<-- OK! -->>");

	}

	@Bean
	public PasswordEncoder getPAsswordEncoder() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
	}

}
