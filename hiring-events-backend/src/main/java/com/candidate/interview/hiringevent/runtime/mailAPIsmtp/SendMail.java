package com.candidate.interview.hiringevent.runtime.mailAPIsmtp;

import com.candidate.interview.hiringevent.runtime.model.Interview;
import com.candidate.interview.hiringevent.runtime.model.InterviewRound;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class SendMail {

    public static void main(String[] args) {

        // Recipient's email ID needs to be mentioned.
        String to = "alimurabbas8658402111@gmail.com";

        // Sender's email ID needs to be mentioned
        final String from = "photo3bablu@gmail.com";

        // Assuming you are sending email from through gmails smtp
        String host = "smtp.gmail.com";

        // Get system properties
        Properties properties = System.getProperties();

        // Setup mail server
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        // Get the Session object.// and pass username and password
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {

                return new PasswordAuthentication(from, "hkwagaoyjgswzluq");

            }

        });

        // Used to debug SMTP issues
        session.setDebug(true);

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            // Set Subject: header field
            message.setSubject("This is the Subject Line!");

            // Now set the actual message
            message.setContent(
                    "<h1>Hey Bablu Here, This is actual message embedded in HTML tags</h1> \n <i>This is the Subject " +
                            "Line!</i>",
                    "text/html");
            System.out.println("sending...");
            // Send message
            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }

    }

    // mail specific to InterviewRound
    public void sendMail(String from, String to, InterviewRound interviewRound) {
        String host = "smtp.gmail.com";

        // Get system properties
        Properties properties = System.getProperties();

        // Setup mail server
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        // Get the Session object.// and pass username and password
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {

                return new PasswordAuthentication(from, "hkwagaoyjgswzluq");

            }

        });

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            // Set Subject: header field
            message.setSubject("Your Interview Details");

            // Now set the actual message
            message.setContent(
                    "<h2>Dear " + interviewRound.getCandidateEmailId() + "</h2>" +

                            "<p>We thank you for applying to Hiring Service 2.0.</p>" +

                            "<p>We want to invite you for an interview for the role of <b>" + "Java Developer Junior" + "</b> at our " +
                            "office premises<p>" +

                            "<p>The manager <b>" + interviewRound.getInterviewerEmailId() + "</b>  will conduct your interview. The " +
                            "interview will be for <b>" + 40 + " minutes</b>.</p>" +

                            "<p>Kindly let us know if you would be available on <b>" + interviewRound.getInterviewDate() + "</b>  for " +
                            "the " +
                            "interview.</p>" +

                            "<p>Do let us know in case of any queries.</p>" +

                            "<p>Thanks,</p>" +
                            "<p>Saroj Kumar Barik</p> ",
                    "text/html");
            System.out.println("sending...");
            // Send message
            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }

    }

}
