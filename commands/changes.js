const fs = require("fs");
const allowedTypes = ["patch", "minor", "major"];
const nextReleaseDir = ".changes/next-release";

const getTimeStamp = () => {
  const newDate = new Date();
  const now = newDate.toISOString();
  const [date, timeWithUtc] = now.split("T");
  const parsedDate = date.split("-").join("");
  const [time] = timeWithUtc.split(".");
  const parsedTime = time.split(":").join("");
  const milliseconds = Math.round(new Date().getMilliseconds());

  return `${parsedDate}${parsedTime}${milliseconds}`;
};

const getContent = (type, description) => {
  return `{\n\t"type": "${type}",\n\t"description": "${description}"\n}`;
};

const checkReleaseDir = () => {
  if (!fs.existsSync(nextReleaseDir)) {
    fs.mkdirSync(nextReleaseDir, {
      recursive: true,
    });
  }
};

const generateChangesFile = (type, description) => {
  const timestamp = getTimeStamp();
  const fileName = `${nextReleaseDir}/${type}-${timestamp}.json`;

  const content = getContent(type, description);
  checkReleaseDir();
  if (!fs.existsSync(fileName)) {
    fs.appendFileSync(fileName, "");
  }

  fs.writeFileSync(fileName, content);
};

const showUsage = () => {
  console.error(`Allowed types: ${allowedTypes.join(", ")}`);
  console.error(`Usage: npm run <type> <description>`);
  console.error(`Example: npm run patch "Fixed layout bug."`);
  process.exit(1);
};

const executeCommand = () => {
  if (process.argv.length < 3) {
    process.exit();
    return;
  }

  const [, , type, description] = process.argv;

  if (!type) {
    showUsage();
    process.exit(1);
  }

  if (!description) {
    showUsage();
    process.exit(1);
  }

  if (!allowedTypes.some((item) => item === type)) {
    showUsage();
    process.exit(1);
  }

  generateChangesFile(type, description);
};

executeCommand();
