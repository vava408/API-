const os = require("os");
const { uptime } = require("process");

function getCpuUsage() {
	return new Promise((resolve) => {

		const debut = os.cpus();

		setTimeout(() => {
			const fin = os.cpus();

			let diffInactif = 0;
			let diffTotal = 0;

			for (let i = 0; i < debut.length; i++) {
				const tempsDebut = debut[i].times;
				const tempsFin = fin[i].times;

				const totalDebut = Object.values(tempsDebut).reduce((a, b) => a + b, 0);
				const totalFin = Object.values(tempsFin).reduce((a, b) => a + b, 0);

				diffTotal += totalFin - totalDebut;
				diffInactif += tempsFin.idle - tempsDebut.idle;
			}

			const utilisation = 100 - (diffInactif / diffTotal) * 100;

			resolve(utilisation.toFixed(2));
		}, 100);
	});
}

function getUptime()
{
	let seconde = os.uptime
	const heures   = Math.floor(seconde / 3600);
	const minutes = Math.floor((seconde % 3600) / 60);
	seconde = Math.floor(seconde % 60).toFixed(2);
	
	console.log(`${heures}h ${minutes}m ${seconde}s`)
	let uptime = {
		heure : heures,
		minutes : minutes,
		secondes : seconde
	}
	return  uptime;
}

function getRamUsage()
{
	return (1 - os.freemem() / os.totalmem())*100
}


async function envoerAPI() 
{
	// Appel de la fonction
	console.log(await getCpuUsage());
}

getUptime()
envoerAPI()

//console.log(os.loadavg()[0])
