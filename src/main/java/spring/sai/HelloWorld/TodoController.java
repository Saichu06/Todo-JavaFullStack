package spring.sai.HelloWorld;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/todo")
public class TodoController {
    @Autowired
    private TodoService todoService;
    @GetMapping("/get")
    String getTodo(){
        todoService.printTodos();
        return "Todo";
    }
//path variable


    @GetMapping("/{id}")
    String getTodoById(@PathVariable int id){
        return "Todo with Id "+id;
    }

    @GetMapping("")
    String getTodoByIdParam(@RequestParam("todoId") int id){
        return "Todo with Id "+id;
    }

    @PostMapping("/create")
    String createUser(@RequestBody String body){
        return body;
    }

    @PutMapping("/{id}")
    String UpdateTodoById(@PathVariable int id){
        return "Update Todo with Id "+id;
    }


    @DeleteMapping("/{id}")
    String DeleteTodoById(@PathVariable int id){
        return "Delete Todo with Id "+id;
    }
}
