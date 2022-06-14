package SoulCode.AlocacaoDeProfessores.Repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import SoulCode.AlocacaoDeProfessores.Models.Extensao;
import SoulCode.AlocacaoDeProfessores.Models.Professor;

public interface ExtensaoRepository extends JpaRepository<Extensao, Integer>{
	Optional<Extensao> findByNome(String nome);
	Optional<Extensao> findByProfessores(Professor prof);

	@Query(value = "SELECT * FROM extensao WHERE status = :status",nativeQuery = true)
	List<Extensao> findByStatus(String status);
	
}

