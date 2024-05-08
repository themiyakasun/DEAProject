package myPackage.contact;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import myPackage.db.DbUtil;

public class SendMessageServlet extends HttpServlet {


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String fullName = request.getParameter("name");
        String email = request.getParameter("email");
        String subject = request.getParameter("subject");
        String messageTxt = request.getParameter("message");
        
        sendMessageToDb(fullName, email, subject, messageTxt);
        response.getWriter().write("Message Send Successfully");
        
    }
    
    private void sendMessageToDb(String fullName, String email, String subject, String message){
        try(Connection conn = DbUtil.getConnection()){
            String query = "INSERT INTO messages(name, email, subject, message) VALUES(?, ?, ?, ?)";
            
            try(PreparedStatement stmt = conn.prepareStatement(query)){
                stmt.setString(1, fullName);
                stmt.setString(2, email);
                stmt.setString(3, subject);
                stmt.setString(4, message);
                stmt.executeUpdate();
            }
        }catch(SQLException e){
            e.getMessage();
        }
    }


}
