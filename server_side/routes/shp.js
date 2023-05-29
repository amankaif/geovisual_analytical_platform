import { Router } from "express";
import { sendStateWiseJson, shpUpload } from "../controllers/shp.js";
import { sendFeaturesArray } from "../controllers/shp.js";
import multer from "multer";

const router = Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "shp_files/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // cb(null, file.fieldname + "-" + Date.now());
  },
});

const shp_upload_multer = multer({ storage: storage });

router.post("/upload", shp_upload_multer.single("shp_file"), shpUpload);
router.get("/features", sendFeaturesArray);
router.get("/state_wise", sendStateWiseJson);

export default router;
