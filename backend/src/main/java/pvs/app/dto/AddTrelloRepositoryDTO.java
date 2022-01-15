package pvs.app.dto;

import lombok.Data;

@Data
public class AddTrelloRepositoryDTO {
    private Long projectId;
    private String repositoryURL;
    private String token;
    private String key;
}
