package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionsRepository  extends JpaRepository<Questions, Integer> {
    Questions getById(int random);
    List<Questions> getAllByLevel(String level);
    List<Questions> getAllByCategory(String category);
    List<Questions> getAllByLanguage(String language);
    List<Questions> getAllByCategoryAndLevelAndLanguage(String category,String level, String language);
    List<Questions> getAllByCategoryAndAndLanguage(String category, String language);
    List<Questions> getAllByLevelAndLanguage(String level, String language);
    List <Questions> getAllByLevelAndCategory(String levek, String category);
}
