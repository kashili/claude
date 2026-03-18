package com.imf.voting.service;

import com.imf.voting.model.VoteSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class VoteService {

    private static final Logger log = LoggerFactory.getLogger(VoteService.class);
    private final Map<String, VoteSession> sessions = new HashMap<>();

    public String createSession() {
        String sessionId = UUID.randomUUID().toString();
        VoteSession session = new VoteSession();
        session.setSessionId(sessionId);
        session.setTitle("Fiscal Responsibility-2026");
        session.setDescription("The IMF is advising countries to implement growth-friendly fiscal adjustments to reduce high public debt, which is expected to rise further");
        session.setDeadline("October 25th 2026");
        session.setVotingType("RESOLUTION VOTE");
        sessions.put(sessionId, session);
        log.info("Created session: {}", sessionId);
        return sessionId;
    }

    public VoteSession getSession(String sessionId) {
        return sessions.get(sessionId);
    }

    public void saveVoteNumber(String sessionId, String voteNumber) {
        VoteSession session = getOrCreate(sessionId);
        session.setVoteNumber(voteNumber);
        sessions.put(sessionId, session);
    }

    public void saveMetaData(String sessionId, String title, String description, String deadline) {
        VoteSession session = getOrCreate(sessionId);
        session.setTitle(title);
        session.setDescription(description);
        session.setDeadline(deadline);
        sessions.put(sessionId, session);
    }

    public void saveVotingType(String sessionId, String votingType) {
        VoteSession session = getOrCreate(sessionId);
        session.setVotingType(votingType);
        sessions.put(sessionId, session);
    }

    public void saveDetails(String sessionId, String resolutionText, String pdfFileName, byte[] pdfContent) {
        VoteSession session = getOrCreate(sessionId);
        session.setResolutionText(resolutionText);
        session.setPdfFileName(pdfFileName);
        session.setPdfContent(pdfContent);
        sessions.put(sessionId, session);
    }

    public void markSubmitted(String sessionId) {
        VoteSession session = getOrCreate(sessionId);
        session.setSubmitted(true);
        sessions.put(sessionId, session);
    }

    public void removeSession(String sessionId) {
        sessions.remove(sessionId);
    }

    private VoteSession getOrCreate(String sessionId) {
        VoteSession s = sessions.get(sessionId);
        if (s == null) {
            s = new VoteSession();
            s.setSessionId(sessionId);
        }
        return s;
    }
}
