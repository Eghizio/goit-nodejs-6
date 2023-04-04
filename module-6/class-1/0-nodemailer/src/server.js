import { join } from "path";
import express from "express";
import { sendMail } from "./sender.js";


const app = express();

app.use("/", express.static(join("src", "public")));

app.use(express.json());

app.post("/emails/send", async (req, res) => {
  // validate body
  console.log({ body: req.body })
  const info = await sendMail(req.body);

  res.json({ msg: "Gituwa", info });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});