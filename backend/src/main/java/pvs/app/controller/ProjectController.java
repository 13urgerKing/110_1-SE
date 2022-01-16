package pvs.app.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pvs.app.dto.AddGithubRepositoryDTO;
import pvs.app.dto.AddSonarRepositoryDTO;
import pvs.app.dto.AddTrelloRepositoryDTO;
import pvs.app.dto.CreateProjectDTO;
import pvs.app.dto.DeleteGithubRepositoryDTO;
import pvs.app.dto.DeleteProjectDTO;
import pvs.app.dto.DeleteSonarRepositoryDTO;
import pvs.app.dto.DeleteTrelloRepositoryDTO;
import pvs.app.dto.ResponseProjectDTO;
import pvs.app.service.ProjectService;
import pvs.app.service.RepositoryService;
import pvs.app.service.SonarApiService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class ProjectController {
    static final Logger logger = LogManager.getLogger(ProjectController.class.getName());

    @Value("${message.exception}")
    private String exceptionMessage;

    @Value("${message.invalid.url}")
    private String urlInvalidMessage;

    @Value("${message.success}")
    private String successMessage;

    @Value("${message.fail}")
    private String failMessage;

    private final ProjectService projectService;
    private final RepositoryService repositoryService;
    private final SonarApiService sonarApiService;

    public ProjectController(ProjectService projectService, RepositoryService repositoryService,
            SonarApiService sonarApiService) {
        this.projectService = projectService;
        this.repositoryService = repositoryService;
        this.sonarApiService = sonarApiService;
    }

    @GetMapping("/repository/github/check")
    public ResponseEntity<String> checkGithubURL(@RequestParam("url") String url, @RequestParam("token") String token) {
        if (repositoryService.checkGithubURL(url, token)) {
            return ResponseEntity.status(HttpStatus.OK).body(successMessage);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(urlInvalidMessage);
        }
    }

    @GetMapping("/repository/sonar/check")
    public ResponseEntity<String> checkSonarURL(@RequestParam("url") String url, @RequestParam("token") String token) {
        if (sonarApiService.checkSonarURL(url, token)) {
            return ResponseEntity.status(HttpStatus.OK).body(successMessage);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(urlInvalidMessage);
        }
    }

    @PostMapping("/project")
    public ResponseEntity<String> createProject(@RequestBody CreateProjectDTO projectDTO) {
        try {
            projectService.create(projectDTO);
            return ResponseEntity.status(HttpStatus.OK).body(successMessage);
        } catch (HibernateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionMessage);
        }
    }

    @PostMapping("/project/delete")
    public ResponseEntity<String> deleteProject(@RequestBody DeleteProjectDTO deleteProjectDTO) {
        try {
            projectService.delete(deleteProjectDTO);
            return ResponseEntity.status(HttpStatus.OK).body(successMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionMessage);
        }
    }

    @PostMapping("/project/{projectId}/repository/sonar")
    public ResponseEntity<String> addSonarRepository(@RequestBody AddSonarRepositoryDTO addSonarRepositoryDTO) {
        try {
            if (sonarApiService.checkSonarURL(addSonarRepositoryDTO.getRepositoryURL(),
                    addSonarRepositoryDTO.getToken())) {
                if (projectService.addSonarRepo(addSonarRepositoryDTO)) {
                    return ResponseEntity.status(HttpStatus.OK).body(successMessage);
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(failMessage);
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(urlInvalidMessage);
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.debug(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionMessage);
        }
    }

    @PostMapping("/project/{projectId}/repository/github")
    public ResponseEntity<String> addGithubRepository(@RequestBody AddGithubRepositoryDTO addGithubRepositoryDTO) {
        try {
            if (repositoryService.checkGithubURL(addGithubRepositoryDTO.getRepositoryURL(),
                    addGithubRepositoryDTO.getToken())) {
                if (projectService.addGithubRepo(addGithubRepositoryDTO)) {
                    return ResponseEntity.status(HttpStatus.OK).body(successMessage);
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(failMessage);
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(urlInvalidMessage);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionMessage);
        }
    }

    @PostMapping("/project/{projectId}/repository/trello")
    public ResponseEntity<String> addTrelloRepository(@RequestBody AddTrelloRepositoryDTO addTrelloRepositoryDTO) {
        try {  
            if (projectService.addTrelloRepo(addTrelloRepositoryDTO)) {
                return ResponseEntity.status(HttpStatus.OK).body(successMessage);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(failMessage);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionMessage);
        }
    }

    @PostMapping("/project/delete/repository/sonar")
    public ResponseEntity<String> deleteSonarRepository(
            @RequestBody DeleteSonarRepositoryDTO deleteSonarRepositoryDTO) {
        try {
            if (projectService.deleteSonarRepo(deleteSonarRepositoryDTO)) {
                return ResponseEntity.status(HttpStatus.OK).body(successMessage);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(failMessage);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionMessage);
        }
    }

    @PostMapping("/project/delete/repository/github")
    public ResponseEntity<String> deleteGithubRepository(
            @RequestBody DeleteGithubRepositoryDTO deleteGithubRepositoryDTO) {
        try {
            if (projectService.deleteGithubRepo(deleteGithubRepositoryDTO)) {
                return ResponseEntity.status(HttpStatus.OK).body(successMessage);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(failMessage);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionMessage);
        }
    }

    @PostMapping("/project/delete/repository/trello")
    public ResponseEntity<String> deleteTrelloRepository(
            @RequestBody DeleteTrelloRepositoryDTO deleteTrelloRepositoryDTO) {
        try {
            if (projectService.deleteTrelloRepo(deleteTrelloRepositoryDTO)) {
                return ResponseEntity.status(HttpStatus.OK).body(successMessage);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(failMessage);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionMessage);
        }
    }

    @GetMapping("/project/{memberId}")
    public ResponseEntity<List<ResponseProjectDTO>> readMemberAllProjects(@PathVariable Long memberId) {
        List<ResponseProjectDTO> projectList = projectService.getMemberProjects(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(projectList);
    }

    @GetMapping("/project/{memberId}/{projectId}")
    public ResponseEntity<ResponseProjectDTO> readSelectedProject(@PathVariable Long memberId,
            @PathVariable Long projectId) {
        List<ResponseProjectDTO> projectList = projectService.getMemberProjects(memberId);
        Optional<ResponseProjectDTO> selectedProject = projectList.stream()
                .filter(project -> project.getProjectId().equals(projectId))
                .findFirst();

        return selectedProject.map(responseProjectDTO -> ResponseEntity.status(HttpStatus.OK).body(responseProjectDTO))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null));
    }
}
