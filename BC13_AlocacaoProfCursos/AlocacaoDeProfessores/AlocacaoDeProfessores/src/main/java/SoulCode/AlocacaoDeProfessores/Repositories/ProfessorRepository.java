package SoulCode.AlocacaoDeProfessores.Repositories;


import SoulCode.AlocacaoDeProfessores.Models.Professor;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository <Professor, Integer>{

    Optional<Professor> findByEmail(String email);
    Optional<Professor> findByNome(String nome);

    @Query
    (value = "SELECT p.id_professor, p.email, p.nome, p.id_extensao, p.id_bootcamp\r\n"
    		+ "FROM habilidade_tecnica ht\r\n"
    		+ "INNER JOIN prof_x_habilidade pht on ht.id_habilidade_tecnica = pht.id_habilidade_tecnica\r\n"
    		+ "INNER JOIN professor p on pht.id_professor = p.id_professor \r\n"
    		+ "WHERE ht.id_habilidade_tecnica = :idHabilidade", nativeQuery = true)
    List<Professor> findByHabilidade(Integer idHabilidade);

    @Query
    (value = "SELECT * FROM professor\n" +
            "INNER JOIN prof_x_turma ON prof_x_turma.id_professor = professor.id_professor\n" +
            "INNER JOIN turma_bootcamp ON prof_x_turma.id_turma_bootcamp = turma_bootcamp.id_turma_bootcamp\n" +
            "WHERE prof_x_turma.id_turma_bootcamp = :idTurmaBootcamp", nativeQuery = true)
    List<Professor> findByTurma(Integer idTurmaBootcamp);

    @Query
    (value = "SELECT * FROM professor\n" +
            "INNER JOIN extensao ON extensao.id_extensao = professor.id_extensao\n" +
            "WHERE professor.id_extensao = :idExtensao", nativeQuery = true)
    List<Professor> findByExtensao (Integer idExtensao);

}
