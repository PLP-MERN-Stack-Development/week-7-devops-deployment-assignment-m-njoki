module.exports = {
  apps: [{
    name: 'mern-backend',
    script: 'src/index.js',
    instances: process.env.NODE_ENV === 'production' ? 'max' : 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 5000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'tests'],
    watch_options: {
      followSymlinks: false
    },
    min_uptime: '10s',
    max_restarts: 10,
    autorestart: true,
    cron_restart: '0 0 * * *', // Restart every day at midnight
    kill_timeout: 5000,
    listen_timeout: 8000,
    shutdown_with_message: true,
    force: true,
    exec_interpreter: 'node',
    exec_interpreter_args: '--harmony',
    source_map_support: true,
    disable_source_map_support: false,
    instance_var: 'INSTANCE_ID',
    pmx: true,
    automation: false,
    vizion: false,
    post_update: ['npm install', 'echo launching the app'],
    restart_delay: 4000
  }]
};
