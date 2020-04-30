const { exec } = require('child_process')



export async function cli(args) {
	switch (args[2]) {
		case 'commitpush': commitpush(args); break;
		case 'commit': commit(args); break;
		case 'push': push(args); break;
	}
}

async function commitpush(args) {
	let c = await exec(`git submodule "git add --all && git commit -m '${args[3]}' && git push"`)
	console.log(c.stderr);

	c = await exec(`git add --all`)
	console.log(c.stderr)
	await exec(`git commit -m "${args[3]}"`)
	console.log(c.stderr)

	await exec(`git push`)
}

async function commit(args) {
	//await exec(`git submodule "git add --all && git commit -m '${args[3]}'"`)
	

	exec(`git add --all`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
	});
	//await exec(`git commit -m "${args[3]}"`)
}

async function push(args) {
	await exec(`git submodule "git push"`)

	await exec(`git push`)
}