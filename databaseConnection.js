const mongoose=require("mongoose");
const dbUrl="mongodb+srv://sis:ZPSiS2001@cluster0.t74ksuc.mongodb.net/finalProjectDataBase?retryWrites=true&w=majority";
const connectWithDataBase=async()=>{
    try {
    const connectionVar=await mongoose.connect(dbUrl);
        const host=connectionVar.connection.host;
        console.log(`host : ${host}`);
    } catch (error) {
        console.error(`error : ${error}`);
    }

}

module.exports=connectWithDataBase;