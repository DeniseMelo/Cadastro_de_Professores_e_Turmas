package SoulCode.AlocacaoDeProfessores.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Bootcamp{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idBootcamp;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false)
    private Integer duracao;

    @Column(nullable = false)
    private Integer duracaoProjetoFinal;
    

    @JsonIgnore
    @OneToMany(mappedBy = "bootcamp")
    private List<Professor> professor = new ArrayList<>();

    public Integer getIdBootcamp() {
        return idBootcamp;
    }

    public void setIdBootcamp(Integer idBootcamp) {
        this.idBootcamp = idBootcamp;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getDuracao() {
        return duracao;
    }

    public void setDuracao(Integer duracao) {
        this.duracao = duracao;
    }

    public Integer getDuracaoProjetoFinal() {
        return duracaoProjetoFinal;
    }

    public void setDuracaoProjetoFinal(Integer duracaoProjetoFinal) {
        this.duracaoProjetoFinal = duracaoProjetoFinal;
    }

    public List<Professor> getProfessor() {
        return professor;
    }

    public void setProfessor(List<Professor> professor) {
        this.professor = professor;
    }

}
