import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai-api';


dotenv.config();

const router = express.Router()