package myPackage.admin;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import static java.lang.Integer.parseInt;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import myPackage.db.DbUtil;

public class getpro {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        int proId = parseInt(request.getParameter("proId"));
        
        ArrayList<ProductItem> product = getProductFromDb(proId);
        String json = new Gson().toJson(product);
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        response.getWriter().write(json);
    }

    private ArrayList<ProductItem> getProductFromDb(int proId){
        ArrayList<ProductItem> product = new ArrayList<>();
        
        try(Connection conn = DbUtil.getConnection()){
          
        }catch (SQLException e){
            e.getMessage();
        }
        
        return product;
    }
}
