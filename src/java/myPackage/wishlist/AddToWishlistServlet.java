package myPackage.wishlist;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import myPackage.db.DbUtil;

public class AddToWishlistServlet extends HttpServlet {


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String productIdStr = request.getParameter("pro_id");
        String subTotalStr = request.getParameter("sub_total");
        
        int userId = getUserIdFromSession(request);
        
        if (userId == -1) {
            response.getWriter().write("User Not Authenticated");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        
        int productId = Integer.parseInt(productIdStr);
        double subTotal = Double.parseDouble(subTotalStr);
        
        int productExists = checkProductExists(userId, productId);
        
        if(productExists > 0){
            response.getWriter().write("Product already Exists");
        }else {
            insertToWishlist(userId, productId, subTotal, response);
        }
        
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
    }
    
    private int getUserIdFromSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            Object userIdObj = session.getAttribute("userId");
            if (userIdObj instanceof Integer) {
                return (Integer) userIdObj;
            }
        }
        return -1;
    }
    
    private int checkProductExists(int userId, int productId){
        try(Connection conn = DbUtil.getConnection()){
            String query = "SELECT COUNT(*) FROM wishlist WHERE pro_id = ? AND user_id = ?";
            
            try(PreparedStatement statement = conn.prepareStatement(query)){
                statement.setInt(1, productId);
                statement.setInt(2, userId);
                
                try(ResultSet result = statement.executeQuery()){
                    if(result.next()){
                        int count = result.getInt(1);
                        return count;
                    }
                }
            }
        } catch (SQLException e) {
            e.getMessage();
        }
         return -1;
    }
    
    private void insertToWishlist(int userId, int productId, double subTotal, HttpServletResponse response) throws IOException{
        try(Connection conn = DbUtil.getConnection()){
            String query = "INSERT INTO wishlist (pro_id, user_id, price, date) VALUES (?, ?, ?, ?)";
            
            try(PreparedStatement statement = conn.prepareStatement(query)){
                statement.setInt(1, productId);
                statement.setInt(2, userId);
                statement.setDouble(3, subTotal);
                statement.setTimestamp(4, new java.sql.Timestamp(System.currentTimeMillis()));
                statement.executeUpdate();
                response.getWriter().write("Product added to wishlist successfully");                    
            }  
        } catch (SQLException e) {
            e.getMessage();
        }
    }


}
