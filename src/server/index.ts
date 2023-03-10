import express,{Request, Response} from "express";
import path from "path"
import {PORT} from "../config/config"
import cors from "cors"
import RouterUser from "../router/router";
import fileUpload from "express-fileupload";
const AppServer: express.Application = express();
const startServer = () => {
    try {
        const urlConnectionAcceso:string = "http://localhost:3000/*"
        const statusCors:number = 200;
        const port: Number = 8080;
        AppServer.use(cors({
            origin: [urlConnectionAcceso, 'http://localhost:3000'],
            methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
            optionsSuccessStatus:statusCors
        }));
        AppServer.use( express.static( path.join( __dirname, "public" ) ) );
        AppServer.use( express.json() );
        AppServer.use( express.urlencoded( { extended: true } ) )
       
    
        AppServer.listen( PORT || port, () => {
        
            console.log( "connection in the port: :", PORT );
        
        } )
       
        AppServer.use(new RouterUser().registerAdmin()); 
        AppServer.use(new RouterUser().registerUser()); 
        AppServer.use(new RouterUser().Login());  
        AppServer.use(new RouterUser().recoveryPass())
        AppServer.use(new RouterUser().newPassword())
        AppServer.use(new RouterUser().veryfiCod())
        AppServer.use(new RouterUser().authGoogle())
        AppServer.use(new RouterUser().getDataAdmin())
        AppServer.use(new RouterUser().uploadCsvUsers())
        AppServer.use(new RouterUser().getUsersAdmin())
        AppServer.use(new RouterUser().UsersDelete())
        AppServer.use(new RouterUser().GetCountUsers())
        // Here go the Roustes of sydtem control users
        AppServer.use(new RouterUser().GetModuleUsers())
        AppServer.use(new RouterUser().GetPermisions())
        AppServer.use(new RouterUser().UpdateAdmin())
        AppServer.use(new RouterUser().DeleteModuleUser())
        AppServer.use(new RouterUser().SetModuleUsers())
        AppServer.use(new RouterUser().SetPermisionModule())
        AppServer.use(new RouterUser().DeletePermisionModule())
        AppServer.use(new RouterUser().GetMod())
        AppServer.use(new RouterUser().getAdminDataALL())
        AppServer.use(new RouterUser().uploadImageAdmin())
        AppServer.use(new RouterUser().UpdateAdminALL())

    } catch ( error:any ) {
        
        throw new Error( error );
    }

}
startServer()
