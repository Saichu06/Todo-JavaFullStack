package spring.sai.HelloWorld.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import spring.sai.HelloWorld.models.User;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
}
