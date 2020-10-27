import * as core from "express-serve-static-core";
import { appConf } from "../../config/appConf";
import { EErrCode } from "../../config/errCode";
import { logger } from "../../utils/logger";
import { formatDate } from "../../utils/common";
import path from "path";
import fs from "fs";

class CUpload {
  public uploadChunk(req: core.Request, res: core.Response) {
    const { name, total, index, size, hash } = req.body;
    const chunkPath = path.join(appConf.rootPath, "/upload", hash, "/");
    if (!fs.existsSync(chunkPath)) {
      fs.mkdirSync(chunkPath)
    }
    fs.renameSync(req.file.path, chunkPath + hash + "-" + index);
    res.json({ code: EErrCode.OK, msg: { index, total } })
  }

  public mergeChunks(req: core.Request, res: core.Response) {
    try {
      const { name, total, index, size, hash } = req.body;
      const chunkPath = path.join(appConf.rootPath, "/upload", hash, "/");
      const ml = formatDate();
      const relativePath = path.join("/upload", ml, name)
      const filePath = path.join(appConf.rootPath, relativePath);
      if (!fs.existsSync(path.join(appConf.rootPath, "/upload", ml))) {
        fs.mkdirSync(path.join(appConf.rootPath, "/upload", ml))
      }
      const chunks = fs.readdirSync(chunkPath);
      fs.writeFileSync(filePath, "");
      if (chunks.length !== total || chunks.length === 0) {
        res.json({ code: EErrCode.UnKnown, msg: "切片数量不符合" });
        return;
      }
      for (let i = 0; i < total; i++) {
        fs.appendFileSync(filePath, fs.readFileSync(chunkPath + hash + "-" + i));
        fs.unlinkSync(chunkPath + hash + "-" + i)
      }
      fs.rmdirSync(chunkPath);
      res.json({ code: EErrCode.OK, msg: { url: relativePath } })
    } catch (error) {
      logger.error(req.path, error)
      res.json({ code: EErrCode.UnKnown, msg: "服务器内部错误" })
    }
  }
}

export const upload = new CUpload()