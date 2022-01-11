package pvs.app.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import pvs.app.dao.ProjectDAO;
import pvs.app.dto.*;
import pvs.app.entity.Project;
import pvs.app.entity.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectDAO projectDAO;

    private final GithubApiService githubApiService;

    static final Logger logger = LogManager.getLogger(ProjectService.class.getName());

    public ProjectService(ProjectDAO projectDAO, GithubApiService githubApiService) {
        this.projectDAO = projectDAO;
        this.githubApiService = githubApiService;
    }

    public void create(CreateProjectDTO projectDTO) throws IOException {
        Project savedProject;
        Project project = new Project();
        project.setMemberId(1L);
        project.setName(projectDTO.getProjectName());
        projectDAO.save(project);
    }

    public void delete(DeleteProjectDTO deleteProjectDTO) throws IOException {
        projectDAO.deleteById(Long.parseLong(deleteProjectDTO.getProjectId()));
    }

    public List<ResponseProjectDTO> getMemberProjects(Long memberId) {
        List<Project> projectList = projectDAO.findByMemberId(memberId);
        List<ResponseProjectDTO> projectDTOList = new ArrayList<>();

        for (Project project:projectList) {
            ResponseProjectDTO projectDTO = new ResponseProjectDTO();
            projectDTO.setProjectId(project.getProjectId());
            projectDTO.setProjectName(project.getName());
            projectDTO.setAvatarURL(project.getAvatarURL());
            for(Repository repository: project.getRepositorySet()) {
                RepositoryDTO repositoryDTO = new RepositoryDTO();
                repositoryDTO.setUrl(repository.getUrl());
                repositoryDTO.setType(repository.getType());
                repositoryDTO.setToken(repository.getToken());
                projectDTO.getRepositoryDTOList().add(repositoryDTO);
            }
            projectDTOList.add(projectDTO);
        }
        return projectDTOList;
    }

    public boolean addSonarRepo(AddSonarRepositoryDTO addSonarRepositoryDTO) {
        Optional<Project> projectOptional = projectDAO.findById(addSonarRepositoryDTO.getProjectId());
        if(projectOptional.isPresent()) {
            Project project = projectOptional.get();
            Repository repository = new Repository();
            repository.setUrl(addSonarRepositoryDTO.getRepositoryURL());
            repository.setType("sonar");
            repository.setToken(addSonarRepositoryDTO.getToken());
            project.getRepositorySet().add(repository);
            projectDAO.save(project);
            return true;
        } else {
            return false;
        }
    }

    public boolean addGithubRepo(AddGithubRepositoryDTO addGithubRepositoryDTO) throws IOException {
        Optional<Project> projectOptional = projectDAO.findById(addGithubRepositoryDTO.getProjectId());
        if(projectOptional.isPresent()) {
            Project project = projectOptional.get();
            String url = addGithubRepositoryDTO.getRepositoryURL();
            Repository repository = new Repository();
            repository.setUrl(url);
            repository.setType("github");
            repository.setToken(addGithubRepositoryDTO.getToken());
            project.getRepositorySet().add(repository);
            String owner = url.split("/")[3];

            githubApiService.setHeader(addGithubRepositoryDTO.getToken());
            JsonNode responseJson = githubApiService.getAvatarURL(owner);
            if(null != responseJson) {
                String json = responseJson.textValue();
                project.setAvatarURL(json);
            }
            projectDAO.save(project);
            return true;
        } else {
            return false;
        }
    }

    public boolean deleteSonarRepo(DeleteSonarRepositoryDTO deleteSonarRepositoryDTO) {
        Optional<Project> projectOptional = projectDAO.findById(deleteSonarRepositoryDTO.getProjectId());
        if(projectOptional.isPresent()) {
            Project project = projectOptional.get();
            project.getRepositorySet().remove(project.findRepositoryByType("sonar"));
            projectDAO.save(project);
            return true;
        } else {
            return false;
        }
    }

    public boolean deleteGithubRepo(DeleteGithubRepositoryDTO deleteGithubRepositoryDTO) {
        Optional<Project> projectOptional = projectDAO.findById(deleteGithubRepositoryDTO.getProjectId());
        if(projectOptional.isPresent()) {
            Project project = projectOptional.get();
            project.getRepositorySet().remove(project.findRepositoryByType("github"));
            projectDAO.save(project);
            return true;
        } else {
            return false;
        }
    }
}
