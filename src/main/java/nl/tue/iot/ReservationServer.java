package nl.tue.iot;

import static spark.Spark.*;

/**
 * Created by rparra on 13/1/16.
 */
public class ReservationServer {
    public static void main(String[] args) {
        staticFileLocation("/public"); // Static files
        AvahiBrowser browser = new AvahiBrowser("parking-service");

        get("/resolve", (req, res) -> {
            String key = req.queryParams("name");
            if(key.equals("parking-service"))
                return "http://" + browser.getHostName() + ":" + browser.getPort();
            else{
                res.status(404);
                return "service not found";
            }
        });
    }
}
