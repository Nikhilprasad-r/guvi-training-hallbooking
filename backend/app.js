import fs from "fs";

let sampleText =
  "Adani stocks today: Share prices of Adani Group companies crashed sharply by up to 20% on Thursday following charges against Gautam Adani and seven others in the United States regarding a multibillion-dollar bribery and fraud scheme. The US authorities revealed on Wednesday that the group allegedly bribed Indian officials for securing solar energy contracts.";

const buffer = Buffer.from(sampleText);

fs.writeFile("file.txt", buffer, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("file created");
  }
});
