package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomQuestionRepository extends JpaRepository<CustomQuestion, Integer> {
    List<CustomQuestion> getAllByPin(int pin);
}
