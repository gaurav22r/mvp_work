// import express from "express";
// import dotenv from "dotenv";
// import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
// import { unmarshall } from "@aws-sdk/util-dynamodb";
// import bodyParser from "body-parser";

// dotenv.config();

// if (!process.env.AWS_REGION) {
//     console.error("❌ AWS_REGION is not defined in .env file!");
//     process.exit(1);
// }

// const app = express();
// const PORT = 5000;

// app.set("view engine", "ejs");
// app.use(bodyParser.json());

// const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });

// app.get("/", async (req, res) => {
//     try {
//         // Fetch Machine Data
//         const machineDataCommand = new ScanCommand({ TableName: "Monitoring_Data" });
//         const machineDataResponse = await dynamoDB.send(machineDataCommand);
//         const machineData = (machineDataResponse.Items ?? []).map(item => unmarshall(item));

//         // Fetch Food Data
//         const foodDataCommand = new ScanCommand({ TableName: "FoodData" });
//         const foodDataResponse = await dynamoDB.send(foodDataCommand);
//         const foodData = (foodDataResponse.Items ?? []).map(item => unmarshall(item));

//         res.render("index", { machineData, foodData });

//     } catch (error) {
//         console.error("Error fetching data:", error);
//         res.status(500).send("Error fetching data");
//     }
// });

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });






// import express from "express";
// import dotenv from "dotenv";
// import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
// import { unmarshall } from "@aws-sdk/util-dynamodb";
// import bodyParser from "body-parser";

// dotenv.config();

// // Check if AWS credentials and region are set
// if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
//     console.error("❌ AWS credentials or region are not defined in .env file!");
//     process.exit(1);
// }

// const app = express();
// const PORT = 5000;

// app.set("view engine", "ejs");
// app.use(bodyParser.json());

// // Initialize DynamoDB Client
// const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });

// app.get("/", async (req, res) => {
//     try {
//         console.log("🔍 Fetching data from DynamoDB...");

//         // Fetch Machine Data
//         const machineDataCommand = new ScanCommand({ TableName: "Monitoring_Data" });
//         const machineDataResponse = await dynamoDB.send(machineDataCommand);
//         const machineData = (machineDataResponse.Items ?? []).map(item => unmarshall(item));

//         console.log("✅ Machine Data:", JSON.stringify(machineData, null, 2));  // Print in console

//         // Fetch Food Data
//         const foodDataCommand = new ScanCommand({ TableName: "FoodData" });
//         const foodDataResponse = await dynamoDB.send(foodDataCommand);
//         const foodData = (foodDataResponse.Items ?? []).map(item => unmarshall(item));

//         console.log("✅ Food Data:", JSON.stringify(foodData, null, 2));  // Print in console

//         // res.render("index", { machineData, foodData });

//     } catch (error) {
//         console.error("❌ Error fetching data:", error);
//         res.status(500).send("Error fetching data");
//     }
// });

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });




import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const client = new DynamoDBClient({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

async function fetchData() {
    const command = new ScanCommand({ TableName: "MachineData" });
    try {
        const data = await client.send(command);
        console.log("Fetched Data:", JSON.stringify(data.Items, null, 2));
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();
