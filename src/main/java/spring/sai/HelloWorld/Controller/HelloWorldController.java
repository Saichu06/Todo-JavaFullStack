package spring.sai.HelloWorld.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name="Hello World API")
@RequestMapping("/api/v1")

public class HelloWorldController {
    @GetMapping("/h")
    String SayHelloWorld(){
        return "Hello World!";
    }

}
