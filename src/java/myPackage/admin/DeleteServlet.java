package myPackage.admin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import myPackage.db.DbUtil;

public class DeleteServlet extends HttpServlet {


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        int catId = Integer.parseInt(request.getParameter("catId"));
        removeItemFromCategory(catId);
        response.getWriter().write("Item removed successfully");
    }
    
    private void removeItemFromCategory(int catId){
        try (Connection conn = DbUtil.getConnection();
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM categories WHERE cat_id = ?")) {
            stmt.setInt(1, catId);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.getMessage();
        }
    }


}
