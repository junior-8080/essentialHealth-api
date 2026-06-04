// PM2 process definition for the Health Essentials backend.
// Named *.cjs on purpose: package.json sets "type": "module", and PM2
// requires a CommonJS config file.
//
// `-r dotenv/config` loads the .env file from the process working directory,
// because the production `start` script (node src/app.js) does NOT load dotenv
// on its own. The deploy step cd's into the app directory before starting PM2,
// so dotenv reads <app-dir>/.env.
module.exports = {
  apps: [
    {
      name: "wellnesskasa-api",
      script: "src/app.js",
      node_args: "-r dotenv/config",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
      out_file: "logs/out.log",
      error_file: "logs/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
