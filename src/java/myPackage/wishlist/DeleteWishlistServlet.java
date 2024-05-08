package myPackage.wishlist;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import myPackage.db.DbUtil;

public class DeleteWishlistServlet extends HttpServlet {


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        int wishlistId = Integer.parseInt(request.getParameter("wishlistId"));
        
        removeItemFromWishlist(wishlistId);
        response.getWriter().write("Item removed successfully");
    }
    
    private void removeItemFromWishlist(int wishlistId){
        try (Connection conn = DbUtil.getConnection();
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM wishlist WHERE wishlist_id = ?")) {
            stmt.setInt(1, wishlistId);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.getMessage();
        }
    }


}
