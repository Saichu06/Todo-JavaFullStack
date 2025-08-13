package spring.sai.HelloWorld.Repository;

//CRUD - Create , read , update , delete

import org.springframework.data.jpa.repository.JpaRepository;
import spring.sai.HelloWorld.models.Todo;
import spring.sai.HelloWorld.models.User;

import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
