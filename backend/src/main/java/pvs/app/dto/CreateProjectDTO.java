package pvs.app.dto;

import lombok.Data;

@Data
public class CreateProjectDTO {
    private String projectName;
    private String githubRepositoryURL;
    private String sonarRepositoryURL;
    private String githubToken;
    private String sonarToken;
}
