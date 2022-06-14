package SoulCode.AlocacaoDeProfessores.Repositories;

import SoulCode.AlocacaoDeProfessores.Models.HabilidadeTecnica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HabilidadeTecnicaRepository extends JpaRepository<HabilidadeTecnica, Integer> {

    Optional<HabilidadeTecnica> findByNome(String nome);
}
