const fs = require("fs");
const { execSync } = require("child_process");
const changelogFile = "CHANGELOG.md";
const fileUrl = `${process.cwd()}/${changelogFile}`;
const { version } = require("../package.json");

const changesDir = ".changes";
const nextReleaseDir = `${changesDir}/next-release`;

const MAJOR_TYPE = "major";
const MINOR_TYPE = "minor";
const PATCH_TYPE = "patch";

if (!fs.existsSync(changesDir) || !fs.existsSync(nextReleaseDir)) {
  console.log("Nothing to release.");
  process.exit();
}

const getVersion = () => {
  return `\n\n## ${version}\n\n`;
};

const getLine = (item) => {
  return `- type: ${item.type}: ${item.description}`;
};

const writeChanges = (changes) => {
  fs.appendFileSync(fileUrl, changes);
};

const removeFiles = (files) => {
  files.forEach((filename) => {
    fs.unlinkSync(`${nextReleaseDir}/${filename}`);
  });
  fs.rmdirSync(nextReleaseDir);
};

const getChanges = (changes) => {
  let output = getVersion();

  changes.forEach((item) => {
    output += `${getLine(item)}\n`;
  });

  return output;
};

const getReleaseType = (changes) => {
  const isMajor = changes.some((item) => item.type === MAJOR_TYPE);
  if (isMajor) {
    return MAJOR_TYPE;
  }

  const isMinor = changes.some((item) => item.type === MINOR_TYPE);

  if (isMinor) {
    return MINOR_TYPE;
  }

  return PATCH_TYPE;
};

const commitChanges = (changes) => {
  execSync("git add .");
  execSync(
    `git commit -m "Update files for new version '${version}' [skip ci]"`
  );
  const type = getReleaseType(changes);
  const command = `npm version ${type} -m "v${version} [skip ci]"`;
  execSync(command);
  execSync(`export RELEASE_TYPE=${type}`);
};

const writeReleaseFile = (changes) => {
  fs.appendFileSync(`${changesDir}/${version}.json`, "[");
  let content = "[";
  changes.forEach((item, index) => {
    let sep = "\n";

    if (index) {
      sep = ",\n";
    }

    content += `${sep}\t{\n\t\t"type": "${item.type}",\n\t\t"description": "${item.description}"\n\t}`;
  });

  content += "\n]";
  fs.writeFileSync(`.changes/${version}.json`, content);
};

const fileNames = fs.readdirSync(nextReleaseDir);
const changes = fileNames.map((item) => {
  const stringContent = fs.readFileSync(`${nextReleaseDir}/${item}`).toString();

  if (!stringContent) {
    return "";
  }

  return JSON.parse(stringContent);
});
const releaseChanges = getChanges(changes);

writeChanges(releaseChanges);
writeReleaseFile(changes);
removeFiles(fileNames);
commitChanges(changes);
