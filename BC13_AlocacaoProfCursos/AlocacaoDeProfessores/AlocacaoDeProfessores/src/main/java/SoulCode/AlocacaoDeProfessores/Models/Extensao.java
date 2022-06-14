package SoulCode.AlocacaoDeProfessores.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Extensao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idExtensao;

    @Column(nullable = false, length = 30)
    private String nome;

    @Column(nullable = false, length = 50)
    private String especialidade;

    @DateTimeFormat(pattern="dd-MM-yyyy")
    @Column(columnDefinition = "date", nullable = false)
    private Date dataInicio;

    @DateTimeFormat(pattern="dd-MM-yyyy")
    @Column(columnDefinition = "date", nullable = false)
    private Date dataTermino;
    
    @Enumerated(EnumType.STRING)
    @Column
    private StatusExtensao status;

	@JsonIgnore
    @OneToMany(mappedBy = "extensao")
    private List<Professor> professores = new ArrayList<>();	

    public List<Professor> getProfessores() {
		return professores;
	}

	public void setProfessores(List<Professor> professores) {
		this.professores = professores;
	}

    public Integer getIdExtensao() {
        return idExtensao;
    }

    public void setIdExtensao(Integer idExtensao) {
        this.idExtensao = idExtensao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public Date getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(Date dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Date getDataTermino() {
        return dataTermino;
    }

    public void setDataTermino(Date dataTermino) {
        this.dataTermino = dataTermino;
    }

    public StatusExtensao getStatus() {
        return status;
    }
}