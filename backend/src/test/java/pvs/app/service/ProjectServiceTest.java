package pvs.app.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.parameters.P;
import org.springframework.test.context.junit4.SpringRunner;
import pvs.app.Application;
import pvs.app.dao.ProjectDAO;
import pvs.app.dto.CreateProjectDTO;
import pvs.app.dto.DeleteGithubRepositoryDTO;
import pvs.app.dto.DeleteSonarRepositoryDTO;
import pvs.app.dto.ResponseProjectDTO;
import pvs.app.entity.Project;
import pvs.app.entity.Repository;

import java.io.IOException;
import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class ProjectServiceTest {
    @Autowired
    private ProjectService projectService;

    @MockBean
    private GithubApiService githubApiService;

    @MockBean
    private ProjectDAO projectDAO;

    CreateProjectDTO projectDTO;

    Project project;
    Repository githubRepository;
    Repository sonarRepository;
    Set<Repository> repositorySet;

    final String responseJson = "{\"avatarUrl\":\"https://avatars3.githubusercontent.com/u/17744001?u=038d9e068c4205d94c670d7d89fb921ec5b29782&v=4\"}";
    Optional<JsonNode> mockAvatar;

    @Before
    public void setup() throws IOException {
        projectDTO = new CreateProjectDTO();
        projectDTO.setProjectName("react");
        projectDTO.setGithubRepositoryURL("https://github.com/facebook/react");
        projectDTO.setSonarRepositoryURL("http://localhost:9000/dashboard?id=pvs-springboot");

        project = new Project();
        project.setProjectId(1L);
        project.setMemberId(1L);
        project.setName(projectDTO.getProjectName());

        githubRepository = new Repository();
        githubRepository.setType("github");
        githubRepository.setUrl("https://github.com/facebook/react");
        githubRepository.setRepositoryId(1L);

        sonarRepository = new Repository();
        sonarRepository.setType("sonar");
        sonarRepository.setUrl("https://sonar.com/facebook/react");
        sonarRepository.setRepositoryId(2L);

        repositorySet = new HashSet<>();
        repositorySet.add(githubRepository);
        repositorySet.add(sonarRepository);
        project.setRepositorySet(repositorySet);


        ObjectMapper mapper = new ObjectMapper();
        mockAvatar = Optional.ofNullable(mapper.readTree(responseJson));
    }

    @Test
    public void create() throws IOException {
        when(projectDAO.save(any(Project.class)))
                .thenReturn(project);
        when(projectDAO.findById(1L))
                .thenReturn(Optional.of(project));

        projectService.create(projectDTO);

        verify(projectDAO, times(1)).save(any(Project.class));
    }

    @Test
    public void getMemberProjects() {
        //given
        project.setAvatarURL("https://avatars3.githubusercontent.com/u/17744001?u=038d9e068c4205d94c670d7d89fb921ec5b29782&v=4");
        
        List<ResponseProjectDTO> projectDTOList = new ArrayList<>();
        ResponseProjectDTO projectDTO = new ResponseProjectDTO();
        projectDTO.setProjectId(project.getProjectId());
        projectDTO.setProjectName(project.getName());
        projectDTO.setAvatarURL(project.getAvatarURL());

        projectDTOList.add(projectDTO);

        //when
        when(projectDAO.findByMemberId(1L))
                .thenReturn(List.of(project));
        //then
        assertEquals(1, projectService.getMemberProjects(1L).size());
//        assertTrue(projectDTOList.equals(projectService.getMemberProjects(1L)));
    }

    @Test
    public void deleteSonarRepoFail(){
        when(projectDAO.findById(any(Long.class)))
                .thenReturn(Optional.empty());
        DeleteSonarRepositoryDTO deleteSonarRepositoryDTO = new DeleteSonarRepositoryDTO();
        deleteSonarRepositoryDTO.setProjectId(1L);
        assertFalse(projectService.deleteSonarRepo(deleteSonarRepositoryDTO));
        assertEquals(sonarRepository, project.findRepositoryByType("sonar"));
    }

    @Test
    public void deleteSonarRepoSuccess(){
        when(projectDAO.findById(any(Long.class)))
                .thenReturn(Optional.of(project));
        DeleteSonarRepositoryDTO deleteSonarRepositoryDTO = new DeleteSonarRepositoryDTO();
        deleteSonarRepositoryDTO.setProjectId(1L);
        assertTrue(projectService.deleteSonarRepo(deleteSonarRepositoryDTO));
        assertEquals(null, project.findRepositoryByType("sonar"));
    }

    @Test
    public void deleteGithubRepoFail(){
        when(projectDAO.findById(any(Long.class)))
                .thenReturn(Optional.empty());
        DeleteGithubRepositoryDTO deleteGithubRepositoryDTO = new DeleteGithubRepositoryDTO();
        deleteGithubRepositoryDTO.setProjectId(1L);
        assertFalse(projectService.deleteGithubRepo(deleteGithubRepositoryDTO));
        assertEquals(githubRepository, project.findRepositoryByType("github"));
    }

    @Test
    public void deleteGithubRepoSuccess(){
        when(projectDAO.findById(any(Long.class)))
                .thenReturn(Optional.of(project));
                DeleteGithubRepositoryDTO deleteGithubRepositoryDTO = new DeleteGithubRepositoryDTO();
        deleteGithubRepositoryDTO.setProjectId(1L);
        assertTrue(projectService.deleteGithubRepo(deleteGithubRepositoryDTO));
        assertEquals(null, project.findRepositoryByType("github"));
    }
}
