package SoulCode.AlocacaoDeProfessores.Models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class HabilidadeTecnica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idHabilidadeTecnica;

    @Column(nullable = false, length = 100)
    private String nome;

    @JsonIgnore
    @ManyToMany
    @JoinTable( name = "Prof_X_Habilidade", joinColumns = @JoinColumn(
                name = "idHabilidadeTecnica", referencedColumnName = "idHabilidadeTecnica"),
                inverseJoinColumns = @JoinColumn(
                name = "idProfessor", referencedColumnName = "idProfessor"))
    private List<Professor> professores = new ArrayList<>();

    public Integer getIdHabilidadeTecnica() {
        return idHabilidadeTecnica;
    }

    public void setIdHabilidadeTecnica(Integer idHabilidadeTecnica) {
        this.idHabilidadeTecnica = idHabilidadeTecnica;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
    
	public List<Professor> getProfessores() {
		return professores;
	}

	public void setProfessores(List<Professor> professores) {
		this.professores = professores;
	}
}
