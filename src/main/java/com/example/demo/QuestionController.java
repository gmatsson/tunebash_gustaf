package com.example.demo;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
public class QuestionController {

    @Autowired
    private QuestionsRepository repository;
    @Autowired
    private CustomQuestionRepository cqrepo;

    @GetMapping("/")
    public String hello() {
        return "app is running";
    }

    @GetMapping(value = "/questions/{level}/{category}/{language}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Questions> getUsers(HttpServletResponse response, @PathVariable String level, @PathVariable String category, @PathVariable String language) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        List<Questions> questions = repository.getAllByCategoryAndLevelAndLanguage(category, level, language);
        return questions;
    }

    @GetMapping(value = "/getquestions/{numberOfQuestions}/{level}/{category}/{language}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Questions> getquestions(@PathVariable String numberOfQuestions, @PathVariable String level, @PathVariable String category, @PathVariable String language, HttpServletResponse response) {
        int num = Integer.parseInt(numberOfQuestions);
        response.setHeader("Access-Control-Allow-Origin", "*");
        List<Questions> firstfilter = new ArrayList<>();
        if (level.equals("mix")) {
            firstfilter = repository.getAllByCategoryAndAndLanguage(category, language);
        } else if (category.equals("mix")) {
            firstfilter = repository.getAllByLevelAndLanguage(level, language);
        } else if (language.equals("mix")) {
            firstfilter = repository.getAllByLevelAndCategory(level, category);
        } else if (level.equals("mix") && category.equals("mix")) {
            firstfilter = repository.getAllByLanguage(language);
        } else if ((level.equals("mix") && language.equals("mix"))) {
            firstfilter = repository.getAllByCategory(category);
        } else if (category.equals("mix") && language.equals("mix")) {
            firstfilter = repository.getAllByLevel(level);
        } else if (level.equals("mix") && category.equals("mix") && language.equals("mix")) {
            firstfilter = repository.findAll();
        } else {
            firstfilter = repository.getAllByCategoryAndLevelAndLanguage(category, level, language);
        }
        int numbers = Math.min(num, firstfilter.size());
        List<Questions> questions = new ArrayList<>();
        Collections.shuffle(firstfilter);
        for (int i = 0; i < numbers; i++) {
            questions.add(firstfilter.get(i));
        }
        return questions;
    }

    // @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/addcustomquestion", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void customquestion(@RequestBody CustomQuestion question, HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        cqrepo.save(question);
    }

    @GetMapping(value = "/getcustomquiz/{pin}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CustomQuestion> customquiz(@PathVariable String  pin, HttpServletResponse response) {
        int pincode = Integer.parseInt(pin);
        response.setHeader("Access-Control-Allow-Origin", "*");
        List<CustomQuestion> questions = cqrepo.getAllByPin(pincode);
        return questions;
    }

}

//    @GetMapping("/addfromexcelfile")
//    public String addFromExcel() throws IOException, InvalidFormatException {
//        ExcelReader er = new ExcelReader();
//        List<Questions> questions = er.questAdder();
//        for (Questions q: questions) {
//            repository.save(q);
//        }
//        return "ok";
//    }


//    @GetMapping("/delete/{id}")
//    public Iterable<Admin> delete(@PathVariable long id) {
//        repository.deleteById(id);
//        return repository.findAll();
//    }


