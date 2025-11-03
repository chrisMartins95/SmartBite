import { Router } from "express";
import { getChannels, getStores } from "../controllers/metaController";

export const router = Router();

// Lista de canais reais
router.get("/channels", getChannels);

// Lista de lojas reais
router.get("/stores", getStores);
