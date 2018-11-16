const colors = require('colors');
const exec = require('../../util/exec');
const config = require('../../util/config');
const cache = require('../../util/cache');
const reporter = require('../../util/reporter');

const makeComposeProject = version => `d2-backend-${version}`;

const run = async function ({ args, options } = {}) {
  const { tag = config.backend.tag, port = config.backend.port } = options;
  if (!await cache.exists("backend/dhis2-backend-master")) {
    reporter.error(`No cached ${"dhis2-backend".bold} found, please run ${"d2 backend init".bold.blue} and try again.`);
    process.exit(1);
  }
  console.log(`Spinning up backend version ${colors.cyan(tag)}`);
  try {
    await exec({
      cmd: 'docker-compose',
      args: ["-p", makeComposeProject(tag), "-f", cache.getCacheLocation("backend/dhis2-backend-master/docker-compose.yml"), "up", '-d'],
      env: {
        'DHIS2_CORE_TAG': tag,
        'DHIS2_CORE_PORT': port,
      },
    });
  } catch (e) {
    process.exit(1);
  }
}

module.exports = {
  name: "up",
  alias: "u",
  options: [
    [
      "--tag [t]",
      "Specify the DHIS2 Core version to use (a tag of hub.docker.com/u/amcgee/dhis2-backend)",
      "dev"
    ],
    [
      "--port [p]",
      "Specify the port on which to expose the DHIS2 instance",
      "8080"
    ]
  ],
  run
};