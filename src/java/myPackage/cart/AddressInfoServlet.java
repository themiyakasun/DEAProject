package myPackage.cart;

import com.google.gson.Gson;
import java.io.IOException;
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

public class AddressInfoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        int userId = getUserIdFromSession(request);
        if (userId == -1) {
            response.getWriter().write("Error: User ID not found in the session");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        
        ArrayList<AddressItem> address = getAddressInfoDb(userId);
        String json = new Gson().toJson(address);
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");       
        response.getWriter().write(json);
    }
    
    private ArrayList<AddressItem> getAddressInfoDb(int userId){
        ArrayList<AddressItem> address = new ArrayList<>();
        
        try (Connection conn = DbUtil.getConnection();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM addresses WHERE user_id = ?")){
            stmt.setInt(1, userId);
            try(ResultSet result = stmt.executeQuery()){
                while(result.next()){
                    String addressType = result.getString("address_type");
                    String streetAddress = result.getString("street_address");
                    String city = result.getString("city");
                    String state = result.getString("state");
                    String postalCode = result.getString("postal_code");
                    String country = result.getString("country");
                        
                    address.add(new AddressItem(addressType, streetAddress, city, state, postalCode, country));
                }
            }
        }catch(SQLException e){
            e.getMessage();
        }
        return address;
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
