package com.example.demo;

import javax.persistence.*;
import java.util.HashMap;

//by Gustaf Matsson
//2018-09-03
@Entity
@Table(name ="questions")
public class Questions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="songlink")
    private String songLink;

    @Column(name="question")
    private String question;

    @Column(name="correctanswer")
    private String correctAnswer;

    @Column(name="wronganswer1")
    private String wrongAnswer1;

    @Column(name="wronganswer2")
    private String wrongAnswer2;

    @Column(name="wronganswer3")
    private String wrongAnswer3;

    @Column(name="level")
    private String level;

    @Column(name="category")
    private String category;

    @Column(name="language")
    private String language;


    public Questions() {
    }

    public Questions(String songLink, String question, String correctAnswer, String wrongAnswer1, String wrongAnswer2, String wrongAnswer3, String level, String category, String language) {
        this.songLink = songLink;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.wrongAnswer1 = wrongAnswer1;
        this.wrongAnswer2 = wrongAnswer2;
        this.wrongAnswer3 = wrongAnswer3;
        this.level = level;
        this.category = category;
        this.language = language;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSongLink() {
        return songLink;
    }

    public void setSongLink(String songLink) {
        this.songLink = songLink;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getWrongAnswer1() {
        return wrongAnswer1;
    }

    public void setWrongAnswer1(String wrongAnswer1) {
        this.wrongAnswer1 = wrongAnswer1;
    }

    public String getWrongAnswer2() {
        return wrongAnswer2;
    }

    public void setWrongAnswer2(String wrongAnswer2) {
        this.wrongAnswer2 = wrongAnswer2;
    }

    public String getWrongAnswer3() {
        return wrongAnswer3;
    }

    public void setWrongAnswer3(String wrongAnswer3) {
        this.wrongAnswer3 = wrongAnswer3;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}


