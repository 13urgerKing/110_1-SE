package pvs.app.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
@Entity
public class Repository {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long repositoryId;

    @NotNull
    private String url;

    @NotNull
    private String type;

    @NotNull
    private String token;

    private String key;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "repository")
    private Set<GithubCommit> githubCommitSet;
}
