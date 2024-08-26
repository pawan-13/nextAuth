import mongoose from 'mongoose';

const Connection = () => {
    try {
            mongoose.connect(process.env.MONGO_URL);
            const connection = mongoose.connection
            
            connection.on('connected',()=>{
                console.log('Mongodb is connected');
            });

            connection.on('error',(err)=>{
                console.log('Error in connecting to MongoDB :' + err);
                process.exit();
            });
          
    } catch (error) {
        console.log('error',error.message);
    }
};

export default Connection;