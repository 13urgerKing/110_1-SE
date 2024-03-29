package pvs.app.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.concurrent.atomic.AtomicBoolean;

@Service
@SuppressWarnings("squid:S1192")
public class RepositoryService {
    private WebClient webClient;

    static final Logger logger = LogManager.getLogger(RepositoryService.class.getName());

    public RepositoryService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public boolean checkGithubURL(String url, String token) {
        if (!url.contains("github.com")) {
            return false;
        }
        String targetURL = url.replace("github.com", "api.github.com/repos");
        AtomicBoolean result = new AtomicBoolean(false);

        this.webClient
                .get()
                .uri(targetURL)
                .header("Authorization", "Bearer " + token)
                .exchange()
                .doOnSuccess(clientResponse -> result.set(clientResponse.statusCode().equals(HttpStatus.OK)))
                .block();
        return result.get();
    }
}
