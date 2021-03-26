package servlet;

import javax.servlet.annotation.WebServlet;

import servlet.system.APIHandler;
import servlet.core.AppException;
import servlet.core.AppUtils;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
@WebServlet(
        name = "ServletConnection", 
        urlPatterns = {"/connection"}
    )
public class ServletConnection extends APIHandler {


    @Override
    public JSONObject executeGET(JSONObject inputData) throws AppException, SQLException {
        
        JSONObject returnData = new JSONObject();
        System.out.println(inputData.get("Key"));
        System.out.println( System.getenv("KEYMD5"));
        if(inputData.get("Key") == System.getenv("KEYMD5")){
            JSONObject returnInternalData = new JSONObject();
            String urlVar = System.getenv("URL")+
                            "?un="+System.getenv("Username")+
                            "&pw="+System.getenv("Password")+
                            "&startURL="+System.getenv("startURL");
            
            returnInternalData.put("urlLogin", urlVar);            
            returnData.put("objectData", returnInternalData);
        }
        returnData.put("statusCode", "200");
        return returnData;
    }
}
