package SoulCode.AlocacaoDeProfessores.Repositories;


import SoulCode.AlocacaoDeProfessores.Models.TurmaBootcamp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface TurmaBootcampRepository extends JpaRepository<TurmaBootcamp, Integer> {


	@Query(value = "SELECT turma.id_turma_bootcamp, turma.data_inicio, turma.data_termino, turma.nome, turma.id_bootcamp"
			+ " FROM turma_bootcamp turma"
			+ " INNER JOIN prof_x_turma pxt on turma.id_bootcamp = pxt.id_turma_bootcamp"
			+ " INNER JOIN professor prof on pxt.id_professor = prof.id_professor"
			+ " WHERE prof.id_professor = :idProfessor", nativeQuery = true)
	List<TurmaBootcamp> findByProfessor(Integer idProfessor);

	@Query(value = "SELECT * FROM bootcamp WHERE status = :status", nativeQuery = true)

	List<TurmaBootcamp> findByStatus(String status);
}
