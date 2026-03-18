package com.imf.voting.service;

import com.imf.voting.model.VoteSession;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    private static final String[] RECIPIENTS = {
        "krishna.ashili@wipro.com",
        "36kashili@gmail.com"
    };

    private static final String[] ELIGIBLE_COUNTRIES = {
        "USA", "Canada", "UK", "Netherlands", "UAE", "Australia"
    };

    public void sendVoteEmail(VoteSession session) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("36kashili@gmail.com");
            helper.setTo(RECIPIENTS);
            helper.setSubject("IMF Vote Initiation - " + session.getTitle());

            String body = buildEmailBody(session);
            helper.setText(body, true);

            if (session.getPdfContent() != null && session.getPdfFileName() != null) {
                helper.addAttachment(session.getPdfFileName(),
                        new ByteArrayResource(session.getPdfContent()));
            }

            mailSender.send(message);
            log.info("Email sent successfully for vote: {}", session.getVoteNumber());
        } catch (MessagingException e) {
            log.error("Failed to send email", e);
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }

    private String buildEmailBody(VoteSession session) {
        StringBuilder sb = new StringBuilder();
        sb.append("<html><body style='font-family: Arial, sans-serif; color: #333;'>");
        sb.append("<div style='background-color: #003A5C; padding: 20px; text-align: center;'>");
        sb.append("<h1 style='color: white; margin: 0;'>INTERNATIONAL MONETARY FUND</h1>");
        sb.append("<p style='color: #cce0f0; margin: 5px 0;'>Vote Initiation Notification</p>");
        sb.append("</div>");
        sb.append("<div style='padding: 30px;'>");
        sb.append("<h2 style='color: #003A5C;'>Vote Summary</h2>");
        sb.append("<table style='width:100%; border-collapse: collapse;'>");
        appendRow(sb, "Vote Number", session.getVoteNumber());
        appendRow(sb, "Title", session.getTitle());
        appendRow(sb, "Description", session.getDescription());
        appendRow(sb, "Deadline", session.getDeadline());
        appendRow(sb, "Voting Type", session.getVotingType());
        appendRow(sb, "Resolution Text", session.getResolutionText());
        sb.append("</table>");
        sb.append("<h3 style='color: #003A5C; margin-top: 30px;'>Eligible Voting Countries</h3>");
        sb.append("<table style='width:100%; border-collapse: collapse; border: 1px solid #ddd;'>");
        sb.append("<tr style='background-color: #003A5C; color: white;'>");
        sb.append("<th style='padding: 10px; text-align: left;'>#</th>");
        sb.append("<th style='padding: 10px; text-align: left;'>Country</th>");
        sb.append("</tr>");
        for (int i = 0; i < ELIGIBLE_COUNTRIES.length; i++) {
            String bg = i % 2 == 0 ? "#f9f9f9" : "#ffffff";
            sb.append("<tr style='background-color: ").append(bg).append(";'>");
            sb.append("<td style='padding: 10px; border-bottom: 1px solid #ddd;'>").append(i + 1).append("</td>");
            sb.append("<td style='padding: 10px; border-bottom: 1px solid #ddd;'>").append(ELIGIBLE_COUNTRIES[i]).append("</td>");
            sb.append("</tr>");
        }
        sb.append("</table>");
        if (session.getPdfFileName() != null) {
            sb.append("<p style='margin-top: 20px; color: #666;'>Resolution document attached: <strong>")
              .append(session.getPdfFileName()).append("</strong></p>");
        }
        sb.append("</div>");
        sb.append("<div style='background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;'>");
        sb.append("This is an automated message from the IMF Vote Initiation System.");
        sb.append("</div>");
        sb.append("</body></html>");
        return sb.toString();
    }

    private void appendRow(StringBuilder sb, String label, String value) {
        sb.append("<tr>");
        sb.append("<td style='padding: 10px; font-weight: bold; color: #003A5C; width: 200px; border-bottom: 1px solid #eee;'>")
          .append(label).append("</td>");
        sb.append("<td style='padding: 10px; border-bottom: 1px solid #eee;'>")
          .append(value != null ? value : "-").append("</td>");
        sb.append("</tr>");
    }
}
