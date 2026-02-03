package com.learningpath.controller;

import com.learningpath.model.UserInput;
import com.learningpath.service.LearningPathService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class LearningPathController {

    private final LearningPathService service;

    public LearningPathController(LearningPathService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public String generate(@RequestBody UserInput input) {
        return service.generatePath(input);
    }
}
