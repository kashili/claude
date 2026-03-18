package com.imf.voting.model;

public class VoteSession {
    private String sessionId;
    private String voteNumber;
    private String title;
    private String description;
    private String deadline;
    private String votingType;
    private String resolutionText;
    private String pdfFileName;
    private byte[] pdfContent;
    private boolean submitted;

    public VoteSession() {}

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getVoteNumber() { return voteNumber; }
    public void setVoteNumber(String voteNumber) { this.voteNumber = voteNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public String getVotingType() { return votingType; }
    public void setVotingType(String votingType) { this.votingType = votingType; }

    public String getResolutionText() { return resolutionText; }
    public void setResolutionText(String resolutionText) { this.resolutionText = resolutionText; }

    public String getPdfFileName() { return pdfFileName; }
    public void setPdfFileName(String pdfFileName) { this.pdfFileName = pdfFileName; }

    public byte[] getPdfContent() { return pdfContent; }
    public void setPdfContent(byte[] pdfContent) { this.pdfContent = pdfContent; }

    public boolean isSubmitted() { return submitted; }
    public void setSubmitted(boolean submitted) { this.submitted = submitted; }
}
