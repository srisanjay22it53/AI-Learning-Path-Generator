package com.learningpath.service;

import com.learningpath.model.UserInput;
import org.springframework.stereotype.Service;

@Service
public class LearningPathService {

    public String generatePath(UserInput input) {
        if ("AI".equalsIgnoreCase(input.getGoal())) {
            return "Week 1-2: Python Basics\nWeek 3: Math for AI\nWeek 4: ML\nWeek 5: Project";
        }
        if ("Java".equalsIgnoreCase(input.getGoal())) {
            return "Core Java\nOOP\nSpring Boot\nREST APIs\nProject";
        }
        return "No learning path available.";
    }
}