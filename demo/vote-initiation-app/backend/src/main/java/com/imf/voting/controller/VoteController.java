package com.imf.voting.controller;

import com.imf.voting.model.VoteSession;
import com.imf.voting.service.EmailService;
import com.imf.voting.service.VoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/vote")
public class VoteController {

    private static final Logger log = LoggerFactory.getLogger(VoteController.class);
    private final VoteService voteService;
    private final EmailService emailService;

    public VoteController(VoteService voteService, EmailService emailService) {
        this.voteService = voteService;
        this.emailService = emailService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        if ("admin".equals(username) && "admin".equals(password)) {
            String sessionId = voteService.createSession();
            return ResponseEntity.ok(Map.of("sessionId", sessionId, "message", "Login successful"));
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }

    @PostMapping("/vote-number")
    public ResponseEntity<?> saveVoteNumber(@RequestBody Map<String, String> body) {
        String sessionId = body.get("sessionId");
        String voteNumber = body.get("voteNumber");
        if (voteNumber == null || !voteNumber.matches("[a-zA-Z0-9]{6}")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Vote number must be 6 alphanumeric characters"));
        }
        voteService.saveVoteNumber(sessionId, voteNumber);
        return ResponseEntity.ok(Map.of("message", "Vote number saved"));
    }

    @PostMapping("/metadata")
    public ResponseEntity<?> saveMetadata(@RequestBody Map<String, String> body) {
        String sessionId = body.get("sessionId");
        voteService.saveMetaData(sessionId, body.get("title"), body.get("description"), body.get("deadline"));
        return ResponseEntity.ok(Map.of("message", "Metadata saved"));
    }

    @PostMapping("/voting-type")
    public ResponseEntity<?> saveVotingType(@RequestBody Map<String, String> body) {
        String sessionId = body.get("sessionId");
        voteService.saveVotingType(sessionId, body.get("votingType"));
        return ResponseEntity.ok(Map.of("message", "Voting type saved"));
    }

    @PostMapping("/details")
    public ResponseEntity<?> saveDetails(
            @RequestParam("sessionId") String sessionId,
            @RequestParam("resolutionText") String resolutionText,
            @RequestParam(value = "pdfFile", required = false) MultipartFile pdfFile) throws IOException {

        byte[] pdfContent = null;
        String pdfFileName = null;
        if (pdfFile != null && !pdfFile.isEmpty()) {
            pdfContent = pdfFile.getBytes();
            pdfFileName = pdfFile.getOriginalFilename();
        }
        voteService.saveDetails(sessionId, resolutionText, pdfFileName, pdfContent);
        return ResponseEntity.ok(Map.of("message", "Details saved"));
    }

    @PostMapping("/summary")
    public ResponseEntity<?> submitSummary(@RequestBody Map<String, String> body) {
        String sessionId = body.get("sessionId");
        VoteSession session = voteService.getSession(sessionId);
        if (session == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Session not found"));
        }
        voteService.markSubmitted(sessionId);
        try {
            emailService.sendVoteEmail(session);
            return ResponseEntity.ok(Map.of("message", "Vote submitted and email sent successfully"));
        } catch (Exception e) {
            log.error("Email sending failed", e);
            return ResponseEntity.ok(Map.of("message", "Vote submitted. Email notification encountered an issue: " + e.getMessage()));
        }
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<?> getSession(@PathVariable String sessionId) {
        VoteSession session = voteService.getSession(sessionId);
        if (session == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Map.of(
            "sessionId", session.getSessionId(),
            "voteNumber", session.getVoteNumber() != null ? session.getVoteNumber() : "",
            "title", session.getTitle() != null ? session.getTitle() : "",
            "description", session.getDescription() != null ? session.getDescription() : "",
            "deadline", session.getDeadline() != null ? session.getDeadline() : "",
            "votingType", session.getVotingType() != null ? session.getVotingType() : "",
            "resolutionText", session.getResolutionText() != null ? session.getResolutionText() : "",
            "pdfFileName", session.getPdfFileName() != null ? session.getPdfFileName() : ""
        ));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> signOut(@RequestBody Map<String, String> body) {
        String sessionId = body.get("sessionId");
        voteService.removeSession(sessionId);
        return ResponseEntity.ok(Map.of("message", "Signed out"));
    }
}
