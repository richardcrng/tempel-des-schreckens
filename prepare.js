// so husky doesn't get installed
// https://typicode.github.io/husky/#/?id=with-a-custom-script

const isCi = process.env.CI !== undefined;
const isProduction = process.env.NODE_ENV === "production";

if (!(isCi || isProduction)) {
  require("husky").install();
}
