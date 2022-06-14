package SoulCode.AlocacaoDeProfessores.Repositories;

import SoulCode.AlocacaoDeProfessores.Models.Bootcamp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;



public interface BootcampRepository extends JpaRepository<Bootcamp, Integer> {

}
