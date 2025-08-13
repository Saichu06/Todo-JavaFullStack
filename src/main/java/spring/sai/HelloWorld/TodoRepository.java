package spring.sai.HelloWorld;

import lombok.extern.apachecommons.CommonsLog;
import org.springframework.stereotype.Component;

@Component
public class TodoRepository {
    String getAllTodos(){
        return "Todos";
    }
}
