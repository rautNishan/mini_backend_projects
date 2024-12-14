import { exec } from 'child_process';

const execSqlDump = () => {
  const command =
    'set PGPASSWORD=root && psql -h localhost -p 5432 -U postgres -d migration-test -f ./dump/country.sql -w';

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  });
};

execSqlDump();
