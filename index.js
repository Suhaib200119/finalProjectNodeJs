const http=require("http");
const express=require("express");
const {createError} =require("http-errors");
const app=express();
const auth_routes=require("./routes/auth_routes");
const users_routes=require("./routes/users_routes");
const expenses_routes=require("./routes/expenses_routes");
app.use(express.json());
const connectWithDataBase=require("./databaseConnection");

// const createHttpError = require("http-errors");
connectWithDataBase();

const server=http.createServer(app);
server.listen(3000,()=>{
    console.log("Server Run On Port 3000 ");
});
process.on("unhandledRejection",(reason)=>{
    console.log(reason);
    process.exit(-1);
});

app.use("/api/auth",auth_routes);
app.use("/api/users",users_routes);
app.use("/api/expenses",expenses_routes);

