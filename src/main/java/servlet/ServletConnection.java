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
        // if(inputData.get("Key") == System.getenv("KEYMD5")){
            // https://consultinghouse.my.salesforce.com/secur/frontdoor.jsp?sid=00Dj0000000I9Kp!AQsAQAPEOEOHhNQOl__LVv8CdzHZmwV1P9C8_DPT27pfo27OnYAczde6lvWZ2fYzi9ZUOOOFRQ0Chy8LFOmYlNNJjvzDTFT4&retURL=apex%2Fpage%3Fpageid=a0a5b00000USNm5AAH
            JSONObject returnInternalData = new JSONObject();
            String urlVar = System.getenv("URL")+
                            "&retURL="+System.getenv("startURL");
            
            returnInternalData.put("urlLogin", urlVar);            
            returnData.put("objectData", returnInternalData);
        // }
        returnData.put("statusCode", "200");
        return returnData;
    }
}