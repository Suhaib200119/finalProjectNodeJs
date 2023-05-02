const http=require("http");
const express=require("express");
const app=express();
const auth_routes=require("./routes/auth_routes");
const users_routes=require("./routes/users_routes");
const expenses_routes=require("./routes/expenses_routes");
app.use(express.json());
app.use("/api/auth",auth_routes);
app.use("/api/users",users_routes);
app.use("/api/expenses",expenses_routes);

const connectWithDataBase=require("./databaseConnection");
connectWithDataBase();

const server=http.createServer(app);
server.listen(3000,()=>{
    console.log("Server Run On Port 3000");
});

