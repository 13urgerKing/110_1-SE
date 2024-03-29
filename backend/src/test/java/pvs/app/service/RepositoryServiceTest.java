package pvs.app.service;

import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.reactive.function.client.WebClient;
import pvs.app.Application;

import java.io.IOException;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
public class RepositoryServiceTest {

    @Autowired
    private RepositoryService repositoryService;

    private MockWebServer mockWebServer;

    @Before
    public void setup() throws IOException {
        this.mockWebServer = new MockWebServer();
        this.repositoryService = new RepositoryService(WebClient.builder());

        mockWebServer.enqueue(new MockResponse()
                .setResponseCode(200)
                .setBody("{}")
                .addHeader("Content-Type", "application/json"));
    }

    @Test
    public void checkGithubURL_thenReturnFalse() throws InterruptedException {
        boolean exist = repositoryService.checkGithubURL("pvs-springboot", "1");
        Assert.assertFalse(exist);
    }

    @Test
    public void checkGithubURL_thenReturnTrue() throws InterruptedException {
        boolean exist = repositoryService.checkGithubURL("https://github.com/imper0502/pvs-spring-boot", "");
        Assert.assertTrue(true);
    }

}
