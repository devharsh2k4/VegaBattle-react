import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
// import { ethers } from 'ethers'; 
import fetch from 'node-fetch';

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from './controllers/auth.js';
import { createPost } from "./controllers/posts.js";
import { verifyToken } from './middlewares/auth.js';
import Question from './models/QuestionSchema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

// Middleware configuration
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Routes with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/post", verifyToken, upload.single("picture"), createPost);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.get('/api/questions/random', async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(random);
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question' });
  }
});

// Server setup
const PORT = process.env.PORT || 6001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Failed to connect to MongoDB', err));
});

const wss = new WebSocketServer({ server });

// Ethereum setup
// const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL); // Replace with your provider
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Replace with your wallet private key
// const tokenContractAddress = process.env.TOKEN_CONTRACT_ADDRESS; // Replace with your token contract address
// const tokenAbi = [ // Replace with the ABI of your token contract
//   "function transfer(address to, uint amount) public returns (bool)",
//   "function balanceOf(address owner) public view returns (uint)"
// ];
// const tokenContract = new ethers.Contract(tokenContractAddress, tokenAbi, wallet);

let clients = new Map();
let activeBattles = new Map(); // Store ongoing battles

wss.on('connection', (ws) => {
  const clientId = generateUniqueId(); // Replace with your method to generate unique IDs
  clients.set(clientId, ws);
  console.log('New client connected with ID:', clientId);

  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    console.log('Message received:', data);

    switch (data.type) {
      case 'JOIN_BATTLE':
        await handleJoinBattle(data, ws, clientId);
        break;
      case 'SUBMIT_SOLUTION':
        await handleSubmitSolution(data);
        break;
      default:
        console.log('Unknown message type:', data.type);
        break;
    }
  });

  ws.on('close', () => {
    clients.delete(clientId);
    console.log('Client disconnected with ID:', clientId);
  });
});

const handleJoinBattle = async (data, ws, clientId) => {
  const opponentId = findOpponent(clientId);
  if (opponentId) {
    const stakeAmount = ethers.utils.parseUnits(data.stakeAmount.toString(), 'ether'); // Convert stake amount to wei
    const battleInfo = { type: 'BATTLE_STARTED', timer: 60 }; // Example timer value

    clients.get(clientId).send(JSON.stringify(battleInfo));
    clients.get(opponentId).send(JSON.stringify(battleInfo));

    // Fetch a random question and send it to both clients
    const question = await fetchRandomQuestion();
    const questionMessage = { type: 'QUESTION', question };
    clients.get(clientId).send(JSON.stringify(questionMessage));
    clients.get(opponentId).send(JSON.stringify(questionMessage));

    // Store the battle information and stakes
    activeBattles.set(clientId, { opponentId, stakeAmount });
    activeBattles.set(opponentId, { opponentId: clientId, stakeAmount });
  } else {
    ws.send(JSON.stringify({ type: 'ERROR', message: 'No opponent found' }));
  }
};

const handleSubmitSolution = async (data) => {
  const { clientId, solution } = data;
  const battle = activeBattles.get(clientId);

  if (battle) {
    const opponentSocket = clients.get(battle.opponentId);
    if (solution === 'CORRECT') { // Replace 'CORRECT' with actual solution checking logic
      const stakeAmount = battle.stakeAmount;
      // Transfer the stake amount to the winner
      await transferTokens(clientId, stakeAmount);
      await transferTokens(battle.opponentId, stakeAmount);

      clients.get(clientId).send(JSON.stringify({ type: 'YOU_WIN', stakeAmount: ethers.utils.formatUnits(stakeAmount, 'ether') }));
      opponentSocket.send(JSON.stringify({ type: 'YOU_LOSE' }));
    } else {
      clients.get(clientId).send(JSON.stringify({ type: 'INCORRECT', message: 'Incorrect, please try again.' }));
    }

    // End the battle
    activeBattles.delete(clientId);
    activeBattles.delete(battle.opponentId);
  } else {
    console.log(`No active battle found for user ${clientId}`);
  }
};

const transferTokens = async (toClientId, amount) => {
  const toAddress = clients.get(toClientId)?.address; // Replace with actual logic to get the address
  if (toAddress) {
    try {
      const tx = await tokenContract.transfer(toAddress, amount);
      await tx.wait();
      console.log(`Transferred ${ethers.utils.formatUnits(amount, 'ether')} tokens to ${toAddress}`);
    } catch (error) {
      console.error('Error transferring tokens:', error);
    }
  }
};

const findOpponent = (clientId) => {
  // Implement your logic to find and return an opponent's clientId
  return null; // Placeholder
};

const generateUniqueId = () => {
  // Implement your logic to generate unique IDs
  return 'unique-id'; // Placeholder
};
