package myPackage.cart;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import myPackage.db.DbUtil;

public class OrderSummaryServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        int userId = getUserIdFromSession(request);
        if (userId == -1) {
            response.getWriter().write("Error: User ID not found in the session");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        ArrayList<OrderItem> orderItems = getOrderItemsFromDb(userId);
        String json = new Gson().toJson(orderItems);
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        response.getWriter().write(json);
    }
        
    private ArrayList<OrderItem> getOrderItemsFromDb(int userId){
        ArrayList<OrderItem> orderItems = new ArrayList<>();
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "SELECT o.order_id, o.order_code, o.total, o.shipping_method, o.status, o.payment_method, o.ordered_date, "
                 + "oi.pro_id, oi.quantity, p.pro_name, p.pro_img, p.pro_price "
                 + "FROM orders o "
                 + "INNER JOIN order_items oi ON o.order_id = oi.order_id "
                 + "INNER JOIN products p ON oi.pro_id = p.pro_id "
                 + "WHERE o.user_id = ?")) {
            
            stmt.setInt(1, userId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    int orderId = rs.getInt("order_id");
                    String orderCode = rs.getString("order_code");
                    double total = rs.getDouble("total");
                    String shippingMethod = rs.getString("shipping_method");
                    String status = rs.getString("status");
                    String paymentMethod = rs.getString("payment_method");
                    String orderedDate = rs.getString("ordered_date");
                    int proId = rs.getInt("pro_id");
                    int quantity = rs.getInt("quantity");
                    String productName = rs.getString("pro_name");
                    String productImg = rs.getString("pro_img");
                    double productPrice = rs.getDouble("pro_price");
                    
                    orderItems.add(new OrderItem(orderId, orderCode, total, shippingMethod, status, paymentMethod, orderedDate, proId, quantity, productName, productImg, productPrice));
                }
            }
        }catch(SQLException e){
            e.getMessage();
        }
        return orderItems;
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


}
